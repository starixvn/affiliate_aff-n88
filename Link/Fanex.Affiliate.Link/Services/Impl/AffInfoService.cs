namespace Fanex.Affiliate.Link.Services.Impl
{
    using Fanex.Affiliate.Link.Constants;
    using Fanex.Affiliate.Link.Criterias;
    using Fanex.Affiliate.Link.DTOs;
    using Fanex.Affiliate.Link.Services.Interface;
    using Fanex.Data.Repository;

    /// <summary>
    /// Tracking system statistics.
    /// </summary>
    public class AffInfoService : IAffInfoService
    {
        private readonly IDynamicRepository _dynamicRepository;
        private readonly IMemoryCacheService _memoryCacheService;

        public AffInfoService()
            : this(null, null)
        {
        }

        public AffInfoService(IDynamicRepository dynamicRepository, IMemoryCacheService memoryCacheService)
        {
            _dynamicRepository = dynamicRepository ?? new DynamicRepository();
            _memoryCacheService = memoryCacheService ?? new MemoryCacheService();
        }

        public AffInfo GetAffInfoByAffCode(string affCode)
        {
            var cacheKey = $"{CacheKey.AFF_INFO_BY_AFF_CODE_CACHE_KEY}_{affCode}";
            var affInfo = _memoryCacheService.Get<AffInfo>(cacheKey);
            if (affInfo is null)
            {
                var criteria = new GeneralAffInfoCriteria
                {
                    AffCode = affCode,
                };

                affInfo = _dynamicRepository.Get<AffInfo>(criteria);

                _memoryCacheService.Set(cacheKey, affInfo);
            }

            return affInfo ?? new AffInfo();
        }
    }
}
