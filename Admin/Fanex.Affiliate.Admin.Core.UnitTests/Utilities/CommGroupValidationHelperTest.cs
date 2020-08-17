using Fanex.Affiliate.Admin.Core.DTO;
using Fanex.Affiliate.Admin.Core.DTO.CommissionGroup;
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
            var param = CreateValidCommissionGroupSetting();

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
            var param = CreateValidCommissionGroupSetting();
            param.PlatformFeeList = new List<DeductionSetting>();

            var helper = CreateCommGroupValidationHelper();

            // Action
            var result = helper.ValidateCommGroup(param);

            // Assert
            Assert.False(result.IsSuccessful);
        }

        [Fact]
        public void ValidateCommGroup_ValidatePlatformFeeList_WhenCallWithInvalidProductIdsLenght_ReturnError()
        {
            // Arrange
            var param = CreateValidCommissionGroupSetting();
            param.PlatformFeeList = new List<DeductionSetting>
            {
                new DeductionSetting
                {
                    DeductedPercentage = 0.17m,
                    DeductionId = 10,
                    ProductIds = "1,2",
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
        public void ValidateCommGroup_ValidatePlatformFeeList_WhenCallWithInvalidProductIds_ReturnError()
        {
            // Arrange
            var param = CreateValidCommissionGroupSetting();
            param.PlatformFeeList = new List<DeductionSetting>
            {
                new DeductionSetting
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
            var param = CreateValidCommissionGroupSetting();
            param.OperationalFee = new DeductionSetting
            {
                DeductedPercentage = 0.07m,
                DeductionId = 11,
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
            var param = CreateValidCommissionGroupSetting();
            param.BankingFee = new DeductionSetting
            {
                DeductedPercentage = 0.07m,
                DeductionId = 11,
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
            var param = CreateValidCommissionGroupSetting();
            param.TierSettingList = new List<TierSetting>();

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
            var param = CreateValidCommissionGroupSetting();
            param.TierSettingList = new List<TierSetting>
            {
                new TierSetting
                {
                    Commission = 0.01m,
                    MaxAmount = 100,
                    MaxAp = 100,
                    MinAmount = 0,
                    MinAp = 0,
                    TierId = 1
                },
                new TierSetting
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
            var param = CreateValidCommissionGroupSetting();
            param.TierSettingList = new List<TierSetting>
            {
                new TierSetting
                {
                    Commission = 0.01m,
                    MaxAmount = 100,
                    MaxAp = 100,
                    MinAmount = 101,
                    MinAp = 0,
                    TierId = 1
                },
                new TierSetting
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
            var param = CreateValidCommissionGroupSetting();
            param.TierSettingList = new List<TierSetting>
            {
                new TierSetting
                {
                    Commission = 0.01m,
                    MaxAmount = 100,
                    MaxAp = 100,
                    MinAmount = 0,
                    MinAp = 101,
                    TierId = 1
                },
                new TierSetting
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
        private static CommissionGroupSetting CreateValidCommissionGroupSetting()
        {
            return new CommissionGroupSetting
            {
                BankingFee = new DeductionSetting
                {
                    DeductedPercentage = 0.02m,
                    DeductionId = 12,
                    ProductIds = "0",
                    IsDeductedPercent = true,
                    DeductedAmount = ""
                },
                OperationalFee = new DeductionSetting
                {
                    DeductedPercentage = 0.07m,
                    DeductionId = 11,
                    ProductIds = "0",
                    IsDeductedPercent = false,
                    DeductedAmount = "123"
                },
                PlatformFeeList = new List<DeductionSetting>
                {
                    new DeductionSetting
                    {
                        DeductedPercentage = 0.17m,
                        DeductionId = 10,
                        ProductIds = "1,2,3",
                        IsDeductedPercent = true,
                        DeductedAmount = ""
                    }
                },
                TierSettingList = new List<TierSetting>
                {
                    new TierSetting
                    {
                        Commission = 0.01m,
                        MaxAmount = 100,
                        MaxAp = 100,
                        MinAmount = 0,
                        MinAp = 0,
                        TierId = 1
                    },
                    new TierSetting
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
