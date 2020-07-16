using System;
using System.Web.Http.Filters;
using Fanex.Logging.Extensions.Web;

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
                
            }
        }
    }
}