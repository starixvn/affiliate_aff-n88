using Affiliate.N88.Core;
using Affiliate.N88.Exceptions;
using Affiliate.N88.Jobs.Configurations;
using Affiliate.N88.Jobs.Constants;
using Affiliate.N88.Repository;
using Affiliate.N88.Services;
using Affiliate.N88.SpParams.Commands;
using Affiliate.N88.SpParams.Criteria;
using Fanex.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.Services
{
    public class TimeTrackerService : ITimeTrackerService
    {
        private readonly ITimeTrackerRepository _timeTrackerRepository;
        private readonly ILogger _logger;

        private readonly TimeTrackerSetting Setting;
        public TimeTrackerService(ITimeTrackerRepository timeTrackerRepository
            , IOptionsSnapshot<TimeTrackerSetting> optionsSnapshot
            , ILogger logger)
        {
            _timeTrackerRepository = timeTrackerRepository ?? throw new ArgumentNullException(nameof(timeTrackerRepository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            Setting = optionsSnapshot?.Value ?? throw new ArgumentNullException($"{nameof(optionsSnapshot)}.Value");

        }

        public async Task<DateTime> GetTimeAsync(string source)
        {
            var lstTime = new List<DateTime>();
            var supportedPrefix = Setting.SourcePrefix;
            foreach (var prefix in supportedPrefix)
            {
                var param = new GetLastedImportTimeCriteria(new PrefixProvider(prefix))
                {
                    DataSource = source
                };
                try
                {
                    var time = await _timeTrackerRepository.GetLastedTimeAsync(param);
                    if (time == default(DateTime))
                    {
                        time = Setting.DefaultTime;
                    }
                    lstTime.Add(time);
                }
                catch (Exception ex)
                {
                    await _logger.WarnAsync(ex.Message);
                }
            }
            if (lstTime.Count == 0)
                throw new InvalidOperationException("List lasted date is zero");
            return lstTime.OrderBy(p => p).FirstOrDefault();
        }

        public async Task SaveTimeAsync(string source, DateTime date)
        {
            var supportedPrefix = Setting.SourcePrefix;
            Parallel.ForEach(supportedPrefix, async p =>
            {
                var param = new InsertImportTimeTrackerCommand(new PrefixProvider(p))
                {
                    CalledTime = date,
                    DataSource = source,
                    ErrCode = SqlResponseCode.Success,
                    ErrMsg = String.Empty
                };
                await _timeTrackerRepository.ImportTimeTrackerAsync(param);
                if (param.ErrCode != SqlResponseCode.Success)
                {
                    throw new ImporterException(param.ErrCode, param.ErrMsg);
                }
            });
        }
    }
}
