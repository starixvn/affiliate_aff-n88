import { defaultBaseCurrency } from '../../../modules/constants';

export { defaultBaseCurrency };

const sortByCommon = {
    Turnover: 2,
    Winloss: 3,
    Earning: 4
}

export const defaultSortBy = 1;
export const sortByMainView = Object.assign({}, {
    Affiliate: 1
}, sortByCommon);
export const sortByMonthOnMonthView = Object.assign({}, {
    Month: 1
}, sortByCommon);

export const allProduct = '0';

export const viewLevel = {
    main: 1,
    monthOnMonth: 2
}

export const sortDirectionType = {
    ascending: 0,
    descending: 1
}

export const totalText = 'Total (all pages)';

export const allCommGroups = {
    Id: 0,
    Name: 'All Revenue Groups'
};

export const headerText = {
    UserName: 'Affiliate',
    MonthDateString: 'Month',
    TotalClick: 'Total Click',
    UniqueClick: 'Unique Click',
    Signup: 'Signup',
    Fdm: 'FDM',
    ActiveMember: 'Active Player',
    NoOfSubAff: 'Sub-Affiliate',
    Deposit: 'Deposit',
    Withdrawal: 'Withdrawal',
    Turnover: 'Turnover',
    Winlost: 'Winloss',
    Bonus: 'Bonus',
    Rebate: 'Rebate',
    PlatformFee: 'Royalty Fee',
    OperationalFee: 'Operational Fee',
    DepositFee: 'Deposit Fee',
    WithdrawalFee: 'Withdrawal Fee',
    TotalFee: 'Total Fee',
    CommissionRate: 'Share%',
    Earning: 'Earning',
    P2pEarning: 'P2P Earning',
    SubAffEarning: 'Sub-Affiliate Earning',
    TotalEarning: 'Total Earning',
    AffWithdrawal: 'Withdrawal',
    AffAdjustment: 'Adjustment',
    BalanceBf: 'Balance B/F',
    MemberStatistics: 'Player Statistics',
    AffiliateStatistics: 'Affiliate Statistics',
    MonthOnMonth: 'Month on Month'
}