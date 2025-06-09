using Fanex.Athena.CronJobs.App.Helpers;
using Microsoft.AspNetCore.Http;
using System.Net;
using System.Threading.Tasks;
using System;
using Fanex.Logging;

namespace Affiliate.N88.Jobs.Middlewares
{
    public class ErrorHandler
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;

        public ErrorHandler(RequestDelegate next, ILogger logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next.Invoke(context);
            }
            catch (Exception exception)
            {
                HandleError(context, exception);
            }
        }

        private void HandleError(HttpContext context, Exception exception)
        {
            var errorMsg = ErrorMessageHelper.GenerateMessage(exception, context);
            _logger.Critical(errorMsg);
            context.Response.Clear();
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        }

    }
}
