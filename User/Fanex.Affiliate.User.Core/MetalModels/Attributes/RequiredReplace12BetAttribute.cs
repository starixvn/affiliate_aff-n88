using Fanex.Affiliate.User.Core.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Fanex.Affiliate.User.Core.MetalModels.Attributes
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
    public class RequiredReplace12BetAttribute: RequiredAttribute, IClientValidatable
    {
        public IEnumerable<ModelClientValidationRule> GetClientValidationRules(ModelMetadata metadata, ControllerContext context)
        {
            var rule = new ModelClientValidationRule();
            rule.ValidationType = "required";
            rule.ErrorMessage = SiteFriendlyNameHelper.Replace12Bet(FormatErrorMessage(metadata.GetDisplayName()));
            yield return rule;
        }
    }
}
