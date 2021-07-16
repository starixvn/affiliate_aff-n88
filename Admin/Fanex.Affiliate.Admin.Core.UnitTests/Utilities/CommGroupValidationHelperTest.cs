using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.MetaModels.CommissionGroup;
using Fanex.Affiliate.Admin.Core.Repository;
using Fanex.Affiliate.Admin.Core.Utilities.CommGroup;
using Moq;
using System.Collections.Generic;
using Xunit;

namespace Fanex.Affiliate.Admin.Core.UnitTests.Utilities
{
    public class CommGroupValidationHelperTest
    {
        [Fact]
        public void ValidateCommGroup_WhenCall_ExcuteSucceed()
        {
            // Arrange
            var param = CreateValidCommGroupSettingParam();

            var helper = CreateCommGroupValidationHelper();

            // Action
            var result = helper.ValidateCommGroup(param);

            // Assert
            Assert.True(result.IsSuccessful);
        }

        [Fact]
        public void ValidateCommGroup_ValidatePlatformFeeList_WhenCallWithNull_ReturnError()
        {
            // Arrange
            var param = CreateValidCommGroupSettingParam();
            param.PlatformFeeList = new List<TierDeductionSettingParam>();

            var helper = CreateCommGroupValidationHelper();

            // Action
            var result = helper.ValidateCommGroup(param);

            // Assert
            Assert.False(result.IsSuccessful);
        }

        [Fact]
        public void ValidateCommGroup_ValidatePlatformFeeList_WhenCallWithInvalidProductIds_ReturnError()
        {
            // Arrange
            var param = CreateValidCommGroupSettingParam();
            param.PlatformFeeList = new List<TierDeductionSettingParam>
            {
                new TierDeductionSettingParam
                {
                    DeductedPercentage = 0.17m,
                    DeductionId = 10,
                    ProductIds = "1,2,4",
                    IsDeductedPercent = true,
                    DeductedAmount = ""
                }
            };

            var helper = CreateCommGroupValidationHelper();

            // Action
            var result = helper.ValidateCommGroup(param);

            // Assert
            Assert.False(result.IsSuccessful);
        }

        [Fact]
        public void ValidateCommGroup_ValidateDeductedFee_WhenCallWithInvalidAmount_ReturnError()
        {
            // Arrange
            var param = CreateValidCommGroupSettingParam();
            param.OperationalFee = new TierDeductionSettingParam
            {
                DeductedPercentage = 0.07m,
                DeductionId = 11,
                ProductIds = "0",
                IsDeductedPercent = false,
                DeductedAmount = "-1"
            };

            param.WithdrawalFee = new TierDeductionSettingParam
            {
                DeductedPercentage = 0.07m,
                DeductionId = 14,
                ProductIds = "0",
                IsDeductedPercent = false,
                DeductedAmount = "-1"
            };

            var helper = CreateCommGroupValidationHelper();

            // Action
            var result = helper.ValidateCommGroup(param);

            // Assert
            Assert.False(result.IsSuccessful);
        }

        [Fact]
        public void ValidateCommGroup_ValidateDeductedFee_WhenCallWithHasException_ReturnError()
        {
            // Arrange
            var param = CreateValidCommGroupSettingParam();
            param.DepositFee = new TierDeductionSettingParam
            {
                DeductedPercentage = 0.07m,
                DeductionId = 13,
                ProductIds = "0",
                IsDeductedPercent = false,
                DeductedAmount = "abc"
            };

            var helper = CreateCommGroupValidationHelper();

            // Action
            var result = helper.ValidateCommGroup(param);

            // Assert
            Assert.False(result.IsSuccessful);
        }

        [Fact]
        public void ValidateCommGroup_ValidateTierSettingList_WhenCallWithNull_ReturnError()
        {
            // Arrange
            var param = CreateValidCommGroupSettingParam();
            param.TierSettingList = new List<TierSettingParam>();

            var helper = CreateCommGroupValidationHelper();

            // Action
            var result = helper.ValidateCommGroup(param);

            // Assert
            Assert.False(result.IsSuccessful);
        }

        [Fact]
        public void ValidateCommGroup_ValidateTierSettingList_WhenCallWithLastTierIsNotMaximum_ReturnError()
        {
            // Arrange
            var param = CreateValidCommGroupSettingParam();
            param.TierSettingList = new List<TierSettingParam>
            {
                new TierSettingParam
                {
                    Commission = 0.01m,
                    MaxAmount = 100,
                    MaxAp = 100,
                    MinAmount = 0,
                    MinAp = 0,
                    TierId = 1
                },
                new TierSettingParam
                {
                    Commission = 0.10m,
                    MaxAmount = 100000000,
                    MaxAp = 100000,
                    MinAmount = 101,
                    MinAp = 101,
                    TierId = 2
                }
            };

            var helper = CreateCommGroupValidationHelper();

            // Action
            var result = helper.ValidateCommGroup(param);

            // Assert
            Assert.False(result.IsSuccessful);
        }

        [Fact]
        public void ValidateCommGroup_ValidateTierSettingList_WhenCallWithMinAmountGreaterThanMaxAmount_ReturnError()
        {
            // Arrange
            var param = CreateValidCommGroupSettingParam();
            param.TierSettingList = new List<TierSettingParam>
            {
                new TierSettingParam
                {
                    Commission = 0.01m,
                    MaxAmount = 100,
                    MaxAp = 100,
                    MinAmount = 101,
                    MinAp = 0,
                    TierId = 1
                },
                new TierSettingParam
                {
                    Commission = 0.10m,
                    MaxAmount = 100000000000,
                    MaxAp = 1000000000,
                    MinAmount = 101,
                    MinAp = 101,
                    TierId = 2
                }
            };

            var helper = CreateCommGroupValidationHelper();

            // Action
            var result = helper.ValidateCommGroup(param);

            // Assert
            Assert.False(result.IsSuccessful);
        }

        [Fact]
        public void ValidateCommGroup_ValidateTierSettingList_WhenCallWithMinApGreaterThanMaxAp_ReturnError()
        {
            // Arrange
            var param = CreateValidCommGroupSettingParam();
            param.TierSettingList = new List<TierSettingParam>
            {
                new TierSettingParam
                {
                    Commission = 0.01m,
                    MaxAmount = 100,
                    MaxAp = 100,
                    MinAmount = 0,
                    MinAp = 101,
                    TierId = 1
                },
                new TierSettingParam
                {
                    Commission = 0.10m,
                    MaxAmount = 100000000000,
                    MaxAp = 1000000000,
                    MinAmount = 101,
                    MinAp = 101,
                    TierId = 2
                }
            };

            var helper = CreateCommGroupValidationHelper();

            // Action
            var result = helper.ValidateCommGroup(param);

            // Assert
            Assert.False(result.IsSuccessful);
        }

        private static CommGroupValidationHelper CreateCommGroupValidationHelper()
        {
            var productRepository = new Mock<IProductRepository>();
            productRepository.Setup(p => p.GetProductList()).Returns(new List<Product>
            {
                new Product { ProductId = 1 },
                new Product { ProductId = 2 },
                new Product { ProductId = 3 }
            });

            return new CommGroupValidationHelper(productRepository.Object);
        }
        private static CommGroupSettingParam CreateValidCommGroupSettingParam()
        {
            return new CommGroupSettingParam
            {
                DepositFee = new TierDeductionSettingParam
                {
                    DeductedPercentage = 0.02m,
                    DeductionId = 13,
                    ProductIds = "0",
                    IsDeductedPercent = true,
                    DeductedAmount = ""
                },
                WithdrawalFee = new TierDeductionSettingParam
                {
                    DeductedPercentage = 0.02m,
                    DeductionId = 14,
                    ProductIds = "0",
                    IsDeductedPercent = true,
                    DeductedAmount = ""
                },
                OperationalFee = new TierDeductionSettingParam
                {
                    DeductedPercentage = 0.07m,
                    DeductionId = 11,
                    ProductIds = "0",
                    IsDeductedPercent = false,
                    DeductedAmount = "123"
                },
                PlatformFeeList = new List<TierDeductionSettingParam>
                {
                    new TierDeductionSettingParam
                    {
                        DeductedPercentage = 0.17m,
                        DeductionId = 10,
                        ProductIds = "1,2,3",
                        IsDeductedPercent = true,
                        DeductedAmount = ""
                    }
                },
                TierSettingList = new List<TierSettingParam>
                {
                    new TierSettingParam
                    {
                        Commission = 0.01m,
                        MaxAmount = 100,
                        MaxAp = 100,
                        MinAmount = 0,
                        MinAp = 0,
                        TierId = 1
                    },
                    new TierSettingParam
                    {
                        Commission = 0.10m,
                        MaxAmount = 100000000000,
                        MaxAp = 1000000000,
                        MinAmount = 101,
                        MinAp = 101,
                        TierId = 2
                    }
                }
            };
        }
    }
}
