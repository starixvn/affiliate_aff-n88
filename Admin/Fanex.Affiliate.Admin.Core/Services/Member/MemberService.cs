using Fanex.Affiliate.Admin.Core.Constants;
using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.Member;
using Fanex.Affiliate.Admin.Core.MetaModels.Member;
using Fanex.Affiliate.Admin.Core.Repository.Member;
using Fanex.Affiliate.Admin.Core.Utilities;
using System;

namespace Fanex.Affiliate.Admin.Core.Services.Member
{
    public class MemberService : IMemberService
    {
        private readonly IMemberRepository _memberRepository;

        public MemberService(IMemberRepository memberRepository)
        {
            _memberRepository = memberRepository;
        }

        public EntityResult<MemberInfo> GetMemberList(MemberParam param)
        {
            return _memberRepository.GetMemberList(param);
        }

        public PlayerActionInfo GetMemberDetail(int memberId)
        {
            return _memberRepository.GetMemberDetail(memberId);
        }

        public ResultInfo UpdateMember(UpdateMemberParam param)
        {
            var latestBillingDate = GetLatestBillingDate();
            var now = DateTimeHelper.DateTimeGMT8;
            var nextMonth = new DateTime(now.Year, now.Month + 2, 1);

            if (param.FromDate > latestBillingDate && param.FromDate < nextMonth)
            {
                return _memberRepository.UpdateMember(param);
            }

            return new ResultInfo
            {
                Code = ErrCode.GeneralErrorCode,
                Message = "The selected date cannot be earlier than the latest billing date or greater than next month."
            };
        }

        public DateTime GetLatestBillingDate()
        {
            return _memberRepository.GetLatestBillingDate();
        }
    }
}
