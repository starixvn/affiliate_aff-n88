using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Globalization;
using System.Net.Sockets;
using System.Net;
using System.Threading.Tasks;
using System.Threading;
using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace Affiliate.N88.Jobs.Middlewares
{
    public class WhoAmIHealthCheck : IHealthCheck
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IHostingEnvironment _env;

        public WhoAmIHealthCheck(IHttpContextAccessor httpContextAccessor, IHostingEnvironment env)
        {
            _httpContextAccessor = httpContextAccessor;
            _env = env;
        }

        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            IDictionary<string, object> result = new Dictionary<string, object>
            {
                { "Env", _env.EnvironmentName }
            };
            await AddServerIPInfo(result);
            AddExtraServerInfo(result);

            return HealthCheckResult.Healthy("Server Info", new ReadOnlyDictionary<string, object>(result));
        }

        private static async Task AddServerIPInfo(IDictionary<string, object> result)
        {
            var hostName = Dns.GetHostName();
            result.Add("Host Name", hostName);

            var serverIps = await Dns.GetHostAddressesAsync(hostName).ConfigureAwait(false);
            for (var i = 0; i < serverIps.Length; i++)
            {
                if (serverIps[i].AddressFamily == AddressFamily.InterNetwork)
                {
                    result.Add($"IP{i}", serverIps[i].ToString());
                }
            }
        }

        private void AddExtraServerInfo(IDictionary<string, object> result)
        {
            var context = _httpContextAccessor.HttpContext;
            result.Add("Local Ip", context.Connection.LocalIpAddress.ToString());
            result.Add("Local Port", context.Connection.LocalPort);
            result.Add("Client Ip", context.Connection.RemoteIpAddress.ToString());
            result.Add("Server Time", DateTime.Now.ToString(CultureInfo.InvariantCulture));
            result.Add("Last Updated", File.GetCreationTime(typeof(WhoAmIHealthCheck).Assembly.Location).ToString(CultureInfo.InvariantCulture));
            result.Add("Host", context.Request.Host);
            result.Add("Schema", context.Request.Scheme);
        }
    }
}
