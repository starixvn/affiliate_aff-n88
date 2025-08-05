namespace Fanex.Affiliate.Link.Services.Impl
{
    using System;
    using Fanex.Affiliate.Link.Services.Interface;
    using ONEbook.UM;
    using ONEbook.UM.Models;
    using ONEbook.UM.Services;

    public class UnderMaintenanceService : IUnderMaintenanceService
    {
        private readonly Lazy<IMaintenanceService> _maintenanceService;

        public UnderMaintenanceService()
        {
            _maintenanceService = new Lazy<IMaintenanceService>(CreateMaintenanceService);
        }

        private IMaintenanceService CreateMaintenanceService()
        {
            try
            {
                return new MaintenanceService(
                    UMClientManager.RestClient,
                    UMClientManager.CacheService,
                    UMClientManager.UMClientConfigs,
                    UMClientManager.HttpContext);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Failed to create maintenance service", ex);
            }
        }

        public UnderMaintenanceTime GetUnderMaintenanceTime()
        {
            try
            {
                return _maintenanceService.Value.GetUnderMaintenanceTime();
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Failed to get under maintenance time", ex);
            }
        }

        public bool IsUnderMaintenance()
        {
            try
            {
                return _maintenanceService.Value.IsUnderMaintenance();
            }
            catch (Exception _)
            {
                return false;
            }
        }
    }
}