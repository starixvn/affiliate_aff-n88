using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Affiliate.Admin.Core.Attributes;
using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Email;
using Fanex.Affiliate.Admin.Core.Extensions;
using Fanex.Affiliate.Admin.Core.MetaModels.CommissionGroup;
using Fanex.Affiliate.Admin.Core.Repository;
using Fanex.Affiliate.Admin.Core.Services;
using Fanex.Affiliate.Admin.Core.Services.CommGroup;
using Fanex.Affiliate.Admin.Core.Services.Common;
using Fanex.Affiliate.Admin.Core.Utilities;
using Fanex.Affiliate.Admin.Core.Utilities.CommGroup;
using Fanex.Affiliate.Admin.Core.ViewModels;

namespace Fanex.Affiliate.Admin.Core.Controllers.Affiliate
{
    [FunctionAuthorize(FunctionName = Function.RevenueGroup)]
    public class CommGroupAssignmentController : BaseController
    {
        private const string PrivateGroupName = "[None]";

        private readonly ICommGroupCommonService _commGroupCommonService;

        private readonly ICommGroupAssignmentService _commGroupAssignmentService;

        private readonly IAffiliateService _affiliateService;

        private readonly IProductRepository _productRepository;

        private readonly ICommGroupValidation _commGroupValidation;

        public CommGroupAssignmentController(
            ISessionService sessionService,
            IProductRepository productRepository,
            IAffiliateService affiliateService,
            ICommGroupAssignmentService commGroupAssignmentService,
            ICommGroupCommonService commGroupCommonService,
            ICommGroupValidation commGroupValidation) : base(sessionService)
        {
            _affiliateService = affiliateService;
            _commGroupAssignmentService = commGroupAssignmentService;
            _productRepository = productRepository;
            _commGroupCommonService = commGroupCommonService;
            _commGroupValidation = commGroupValidation;
        }

        [HttpGet]
        public ActionResult AssignGroup(int affId, int groupTypeId)
        {
            var viewModel = new AssignNormalGroupViewModel();

            if (affId >= Validation.MinId)
            {
                var selectedGroupType = groupTypeId == 0 ? 1 : groupTypeId;
                var param = new GetGroupListParam { AffId = affId, GroupTypeId = -1 };
                var commGroupList = _commGroupAssignmentService.GetNormalCommGroupList(param);
                var commGroupTypeList = _commGroupCommonService.GetCommGroupTypes();

                viewModel = new AssignNormalGroupViewModel
                {
                    CommGroupList = commGroupList,
                    CommGroupTypes = commGroupTypeList,
                    SelectedGroupType = selectedGroupType,
                    SelectedGroup = param.GroupId,
                    AffInfo = _affiliateService.GetAffiliateBasicInfo(affId)
                };
            }

            return View("~/Areas/Portal/Views/Affiliate/AssignGroup.cshtml", viewModel);
        }

        [FunctionAuthorize(FunctionName = Function.RevenueGroup, IsHost = true)]
        [HttpPost]
        [ValidateAntiForgeryHeader]
        public async Task<ActionResult> AssignGroup(AssignGroupParam assignParam, AffInfoParam affInfo)
        {
            if (!ModelState.IsValid || assignParam.GroupId < Validation.MinId)
            {
                return CreateErrorResult();
            }

            assignParam.UserId = SessionService.UserId;
            assignParam.Ip = Request.UserHostAddress;
            assignParam.AffId = affInfo.AffId;

            var emailParam = new AffInformationEmail
            {
                RootUrl = SiteDomainHelper.GetRootUrl(this)
            };

            return new JsonNetResult
            {
                Data = await _commGroupAssignmentService.AssignGroup(assignParam, affInfo, emailParam)
            };
        }

        [HttpGet]
        public ActionResult AssignPrivateGroup(int affId, int groupTypeId)
        {
            var viewModel = new AssignPrivateGroupViewModel();
            if (affId >= Validation.MinId)
            {
                var productList = _productRepository.GetProductList();
                var affInfo = _affiliateService.GetAffiliateBasicInfo(affId);

                viewModel = new AssignPrivateGroupViewModel
                {
                    ProductList = productList,
                    P2pProductList = productList.Where(p => p.IsP2P),
                    DeductionList = _commGroupCommonService.GetDeductionList(),
                    AffInfo = affInfo,
                    SelectedGroupType = groupTypeId
                };
            }

            return View("~/Areas/Portal/Views/Affiliate/AssignPrivateGroup.cshtml", viewModel);
        }

        [FunctionAuthorize(FunctionName = Function.RevenueGroup, IsHost = true)]
        [HttpPost]
        [ValidateAntiForgeryHeader]
        public async Task<ActionResult> AssignPrivateGroup(CommGroupSettingParam commGroup, AffInfoParam affInfo)
        {
            if (!ModelState.IsValid)
            {
                return CreateErrorResult();
            }

            var result = _commGroupValidation.ValidateCommGroup(commGroup);
            if (result.IsSuccessful)
            {
                var assignParam = new CreateUpdateCommissionGroupParam
                {
                    UserId = SessionService.UserId,
                    GroupId = commGroup.GroupId,
                    GroupName = affInfo.UserName,
                    GroupTypeId = commGroup.GroupTypeId,
                    Description = PrivateGroupName,
                    TierSettingList = commGroup.TierSettingList,
                    P2pDeductionList = commGroup.P2pDeductionList,
                    PlatformFeeList = commGroup.PlatformFeeList,
                    KillRateFeeList = commGroup.KillRateFeeList,
                    DepositFee = commGroup.DepositFee,
                    WithdrawalFee = commGroup.WithdrawalFee,
                    SubAffCommRate = commGroup.SubAffCommRate,
                    IsActivePlayerSum = commGroup.IsActivePlayerSum,
                    Ip = Request.UserHostAddress
                };

                var emailParam = new AffInformationEmail
                {
                    RootUrl = SiteDomainHelper.GetRootUrl(this)
                };

                return new JsonNetResult
                {
                    Data = await _commGroupAssignmentService.AssignPrivateGroup(assignParam, affInfo, emailParam)
                };
            }

            return new JsonNetResult
            {
                Data = new ResultInfo
                {
                    Code = ErrCode.GeneralErrorCode,
                    Message = result.Message
                }
            };
        }

        private ActionResult CreateErrorResult()
        {
            return new JsonNetResult
            {
                Data = new ResultInfo
                {
                    Code = ErrCode.GeneralErrorCode,
                    Message = string.Join("<br />", ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage))
                }
            };
        }
    }
}