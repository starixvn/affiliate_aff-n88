using Fanex.Logging;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Threading.Tasks;

namespace Affiliate.N88.Jobs.Filter
{
    public class GlobalExceptionFilter : IAsyncExceptionFilter
    {
        private readonly ILogger _logger;
        public GlobalExceptionFilter(ILogger logger)
        {
            _logger = logger;
        }

        public async Task OnExceptionAsync(ExceptionContext context)
        {
            var exception = context.Exception;
            await _logger.ErrorAsync(exception.Message, exception);
        }
    }
}
