using Affiliate.N88.WebApi.Health;
using Affiliate.N88.WebApi.Infastructure.Enums;
using Affiliate.N88.WebApi.Models.HelthCheck;
using Fanex.Data.Repository;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Affiliate.N88.WebApi.Controllers
{
    [Route("api/health")]
    public class HealthController : ApiController
    {
        private IEnumerable<IHealthCheckProvider> HealthCheckProviders { get; }

        public HealthController(IEnumerable<IHealthCheckProvider> healthCheckProviders)
        {
            HealthCheckProviders = healthCheckProviders;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IHttpActionResult> Index()
        {
            var result = new HealthCheckResult 
            {
                MachineName = Environment.MachineName
            };
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            foreach (var provider in HealthCheckProviders)
            {
                result.HealthChecks.Add(await provider.GetHealthCheckAsync());
            }
            stopwatch.Stop();

            result.TimeTakenInSeconds = stopwatch.Elapsed.TotalSeconds;
            return Ok(result);
        }
    }
}