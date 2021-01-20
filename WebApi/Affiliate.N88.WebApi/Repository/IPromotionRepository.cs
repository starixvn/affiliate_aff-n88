using Affiliate.N88.WebApi.DTO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Affiliate.N88.WebApi.Repository
{
    public interface IPromotionRepository
    {
        Task<IEnumerable<Promotion>> GetPromotionsAsync(DateTime fromDate, DateTime toDate);
    }
}