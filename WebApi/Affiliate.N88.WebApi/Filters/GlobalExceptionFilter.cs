using Fanex.Logging.Extensions.Web;
using System;
using System.Configuration;
using System.Net.Http;
using System.Web.Http.Filters;

namespace Affiliate.N88.WebApi.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
    public sealed class GlobalExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            if (actionExecutedContext != null)
            {
                ExceptionHandler.Handle(actionExecutedContext.Exception);
                var exception = actionExecutedContext.Exception;
                actionExecutedContext.Response = actionExecutedContext.Request.CreateErrorResponse(System.Net.HttpStatusCode.InternalServerError, exception);
            }
        }
    }
}