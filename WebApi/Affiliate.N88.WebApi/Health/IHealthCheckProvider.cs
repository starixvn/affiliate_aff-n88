using Affiliate.N88.WebApi.Models.HelthCheck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Affiliate.N88.WebApi.Health
{
    public interface IHealthCheckProvider
    {
        /// <summary>
        /// Returns the health heck info.
        /// </summary>
        Task<HealthCheckItemResult> GetHealthCheckAsync();

        /// <summary>
        /// Defines the order of this provider in the results.
        /// </summary>
        int SortOrder { get; }
    }
}
