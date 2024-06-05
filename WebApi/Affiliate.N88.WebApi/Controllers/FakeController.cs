using Affiliate.N88.SpParams.Commands;
using Affiliate.N88.WebApi.Models.Fake;
using Fanex.Data.Repository;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace Affiliate.N88.WebApi.Controllers
{
    public class FakeController : ApiController
    {
        private readonly IDynamicRepository dynamicRepository;

        public FakeController(IDynamicRepository dynamicRepository)
        {
            this.dynamicRepository = dynamicRepository;
        }

        [HttpPost]
        public async Task<SetAccountResult> SetCustActStatus(AccountParam param)
        {
            try
            {
                await dynamicRepository.ExecuteAsync(new SetCustActStatusCommand { CustId = param.CustId });
                return new SetAccountResult
                {
                    Data = true
                };
            }
            catch (Exception ex)
            {
                return new SetAccountResult
                {
                    Data = false,
                    ErrorCode = 99,
                    Message = ex.Message
                };
            }
        }
      
    }
}
