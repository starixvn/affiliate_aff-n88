using Affiliate.N88.Models;
using Affiliate.N88.SpParams.Criteria;
using Affiliate.N88.WebApi.DTO;
using Affiliate.N88.WebApi.Repository;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace Affiliate.N88.WebApi.Controllers
{
    public class PromotionController : ApiController
    {
        private IDynamicRepository DynamicRepo { get; }
        private IPromotionRepository PromotionRepo { get; }
        
        public PromotionController(IDynamicRepository dynamicRepository, IPromotionRepository promotionRepository)
        {
            DynamicRepo = dynamicRepository;
            PromotionRepo = promotionRepository;
        }


        [HttpGet]
        public async Task<IEnumerable<PromotionModel>> GetPromotions(DateTime fromDate, DateTime toDate)
            => await DynamicRepo.FetchAsync<PromotionModel>(new GetPromotionCriteria(fromDate, toDate));
        //{
        //    var promos = await PromotionRepo.GetPromotionsAsync(fromDate, toDate);
        //    return promos.Select(p => new PromotionModel
        //    {
        //        BonusCode = p.BonusCode,
        //        CategoryId= p.CategoryId,
        //        CreateTime = ParseDateTime(p.CreateTime), //Convert from string to DateTime if CreateTime has wrong format datetime
        //        Description = p.Description,
        //        EndDate = p.EndDate,
        //        ExpiryDays =p.ExpiryDays,
        //        IsSpecial = p.IsSpecial,
        //        LastUpdateTime = p.LastUpdateTime,
        //        LastUpdateUser = p.LastUpdateUser,
        //        PeriodDay = p.PeriodDay,
        //        PeriodFrom = p.PeriodFrom,
        //        PeriodTo = p.PeriodTo,
        //        PeriodType = p.PeriodType,
        //        PromotionType = p.PromotionType,
        //        RedeemHours= p.RedeemHours,
        //        SiteId = p.SiteId,
        //        Sort = p.Sort,
        //        SpecialCode = p.SpecialCode,
        //        StartDate = p.StartDate,
        //        Status = p.Status,
        //        TpId = p.TpId,
        //        WalletType = p.WalletType,
                
        //    });
        //}

        [HttpGet]
        public async Task<IEnumerable<PromotionSpecificModel>> GetPromotionSpecifics(DateTime fromDate, DateTime toDate)
            => await DynamicRepo.FetchAsync<PromotionSpecificModel>(new GetPromotionSpecificCriteria(fromDate, toDate));

        private DateTime? ParseDateTime(string str)
        {
            try
            {
                return DateTime.Parse(str);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
