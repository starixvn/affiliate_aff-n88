import { selectedAllProduct, defaultBaseCurrency, shortedMonthNames, minMonthDate, maxWidth } from '../../../../modules/constants';
import { globalResource } from '../../../../modules/globalResource';

export { globalResource, maxWidth, selectedAllProduct, shortedMonthNames, minMonthDate, defaultBaseCurrency };

export const headerText = {
    Index: '#',
    UserName: 'User Name',
    IbcUserName: globalResource.SystemUserName,
    RegisteredDateText: 'Registered Date',
    Turnover: 'Turnover',
    Winloss: 'Winlost',
    Deposit: 'Deposit',
    Withdrawal: 'Withdrawal',
    Bonus: 'Bonus',
    DepositFee: 'Deposit Fee',
    WithdrawalFee: 'Withdrawal Fee'
}

export const resource = {
    Month: 'Month'
}

export const SortByIdList = {
    Username: 1,
    RegisteredDate: 2,
    Deposit: 3,
    Withdrawal: 4,
    Turnover: 5,
    Winloss: 6,
    Bonus: 7,
    BankingFee: 8,
    IbcUsername: 9
};

export const SortingColumnDefault = {
    IsSortAsc: false,
    ColumnName: 'Turnover'
}