using Affiliate.N88.Jobs.Apis;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Models;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Affiliate.N88.SpParams.Commands;
using Affiliate.N88.Utitlities;
using Fanex.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;

namespace Affiliate.N88.Jobs.RecurringTasks
{
    public interface IFetchBetRecordDataTask : IFetchDataTask 
    {
        Task FetchLastMonth();

        Task FetchFromAdjusmentDay(int day);

        Task FetchDataAsync(DateTime fromDate, DateTime toDate);
    }
    public class FetchBetRecordDataTask : IFetchBetRecordDataTask
    {
        private const string SAVE_TIME_ELEMENT_NAME = "BetRecordFetchTime";
        private const int API_SERVER_TIME_OFFSET = 0;

        private readonly ILicenseeApi _licenseeApi;
        private readonly ILogger _logger;
        private readonly ITimeTrackerService _timeTrackerService;
        private readonly IThirdPartyImportRepository _repo;

        private readonly FetchServiceSetting Settings = new FetchServiceSetting(); 

        public FetchBetRecordDataTask(ILicenseeApi licenseeApi,
            IThirdPartyImportRepository _thirdPartyRepo,
            ILogger logger, 
            ITimeTrackerService timeTrackerService, 
            IOptionsSnapshot<FetchServiceSetting> configuration)
        {
            _licenseeApi = licenseeApi;
            _logger = logger;
            _timeTrackerService = timeTrackerService;
            _repo = _thirdPartyRepo;

            Settings = configuration.Get(Constants.ServiceConfigName.PULL_BET_RECORD_SETTING);
        }

        public async Task FetchDataAsync()
        {
            try
            {
                var fromDate = await GetLastTimeFetchDateAsync();
                var toDate = GetAdjustmentApiServerDate();
                await FetchDataAndTrackTimeAsync(fromDate, toDate);
            }
            catch (Exception ex)
            {
                _logger.Error($"Exception when fetch BetRecord data: {ex.ToString()}");
            }            
        }

        public async Task FetchLastMonth()
        {
            try
            {
                var now = DateTime.Now;
                var dayLastMonth = now.AddMonths(-1);
                var firstDayLastMonth = new DateTime(dayLastMonth.Year, dayLastMonth.Month, 1);
                var firstDayThisMonth = new DateTime(now.Year, now.Month, 1);
                await FetchDataAsync(firstDayLastMonth, firstDayThisMonth);
            }
            catch (Exception ex)
            {
                _logger.Error($"Exception when fetch BetRecord data: {ex.ToString()}");
            } 
        }

        public async Task FetchFromAdjusmentDay(int day)
        {
            try
            {
                var lastFetchDate = await GetLastTimeFetchDateAsync();
                var fromDate = lastFetchDate.AddDays(-day);
                var toDate = GetAdjustmentApiServerDate();
                await FetchDataAsync(fromDate, toDate);
            }
            catch (Exception ex)
            {
                _logger.Error($"Exception when fetch BetRecord data: {ex.ToString()}");
            }
        }

        public async Task FetchDataAsync(DateTime fromDate, DateTime toDate)
        {
            var intervalTime = GetApiMaxTimeRange();
            var timeRanges = DateTimeHelper.GetProportionTimeRange(fromDate, toDate, intervalTime);
            foreach (var range in timeRanges)
            {
                try
                {
                    await FetchAndInsertDataAsync(range.FromDate, range.ToDate);
                }
                catch (Exception ex)
                {
                    _logger.Error($"Excetion when fetch BetRecord from {range.FromDate} to {range.ToDate}");
                    throw ex;
                }
            }
        }

        private async Task FetchDataAndTrackTimeAsync(DateTime fromDate, DateTime toDate)
        {
            var intervalTime = GetApiMaxTimeRange();
            var timeRanges = DateTimeHelper.GetProportionTimeRange(fromDate, toDate, intervalTime);
            foreach (var range in timeRanges)
            {
                try
                {
                    await FetchAndInsertDataAsync(range.FromDate, range.ToDate);
                    await _timeTrackerService.SaveTimeAsync(SAVE_TIME_ELEMENT_NAME, range.ToDate);
                }
                catch (Exception ex)
                {
                    _logger.Error($"Excetion when fetch BetRecord from {range.FromDate} to {range.ToDate}");
                    throw ex;
                }
            }
        }

        private async Task FetchAndInsertDataAsync(DateTime fromDate, DateTime toDate)
        {
            var data = await _licenseeApi.GetBetRecordAsync(fromDate, toDate);
            if (data == null || data.Count() == 0)
            {
                return;
            }

            var dataPaging = PagingHelper.PagingData(data, Constant.MAX_PAGING_SIZE);
            foreach (var page in dataPaging)
            {
                if (page?.Count() > 0)
                {
                    var xml = BuildXml(page);
                    await InsertBetRecordAsync(fromDate, toDate, xml);
                }
            }
        }

        private string BuildXml(IEnumerable<BetRecordInfo> data)
        {
            var xmlDoc = new XDocument(new XElement("transaction"));
            var root = xmlDoc.Root;
            foreach (var item in data)
            {
                if (item == null)
                { 
                    throw new ArgumentNullException($"Have null item in insert data");
                }
                var elem = new XElement("trans");
                InsertAttribute(elem, item);
                root.Add(elem);
            }
            return xmlDoc.ToString();
        }

        private void InsertAttribute(XElement elem, BetRecordInfo item)
        {
            var type = typeof(BetRecordInfo);
            var props = type.GetProperties();
            foreach (var prop in props)
            {
                var propName = prop.Name;
                var value = type.GetProperty(propName).GetValue(item, null) ?? "";
                elem.Add(new XAttribute(propName.ToLowerInvariant(), value));
            }
        }

        private async Task InsertBetRecordAsync(DateTime fromDate, DateTime toDate, string xml)
        {
            var param = new InsertBetRecodInfoCommand
            {
                StartDate = fromDate,
                EndDate = toDate,
                XmlData = xml
            };
            try
            {
                await _repo.ImportBetRecordAsync(param);
            }
            catch (Exception ex)
            {

                await _logger.ErrorAsync($"Import {xml} error");
                throw ex;
            }

        }

        private TimeSpan GetApiMaxTimeRange()
        {
           return TimeSpan.FromMinutes(Settings.MaxTimeRange);
        }

        private async Task<DateTime> GetLastTimeFetchDateAsync()
        {
            var isUseDefaultDate = false;
            var lastFetchDate = new DateTime();
            try
            {
                lastFetchDate = await _timeTrackerService.GetTimeAsync(SAVE_TIME_ELEMENT_NAME);
            }
            catch (FileNotFoundException)
            {
                isUseDefaultDate = true;
            }
            catch (XmlException)
            {
                isUseDefaultDate = true;
            }

            if (isUseDefaultDate)
            {
                lastFetchDate = Settings.DefaultPullDate;
            }

            return lastFetchDate;
        }

        private DateTime GetAdjustmentApiServerDate()
        {
            var date = DateTimeOffset.Now.ToOffset(TimeSpan.FromHours(API_SERVER_TIME_OFFSET));
            var adjustmentMin = Settings.AdjustmentTime;
            var adjustDate = date.AddMinutes(adjustmentMin);
            return adjustDate.DateTime;
        }
    }
}
