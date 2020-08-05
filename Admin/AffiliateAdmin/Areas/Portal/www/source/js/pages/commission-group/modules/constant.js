import { formatDecimal } from "../../../modules/numberFormat";
import { globalResource } from '../../../modules/globalResource';

export { globalResource };

export const INFINITY_AM = 100000000000000;
export const INFINITY_QM = 1000000000;
export const INFINITY_SYMBOL = '∞';

function generateCommissionValues() {
    let min = 0,
        max = 1;
    const commissionList = ['0.00'];

    while (min < max) {
        min = min + 0.01;
        commissionList.push(formatDecimal(min));
    }

    return commissionList;
}
const _commValueList = generateCommissionValues();

export const commissionValueList = _commValueList;

export const messages = {
    requireGroupName: 'Group Name cannot be empty. Please check!',
    requireOperationalAmount: 'Operational Fee cannot be empty. Please check!',
    invalidOperationalAmount: 'Operational Fee is invalid.',
    requireBankingAmount: 'Banking Fee cannot be empty. Please check!',
    invalidBankingAmount: 'Banking Fee is invalid.',
    requireTier: 'Tier Setting must have at least 1 tier',
    requireInfinity: 'Last Tier Setting must have maximum value=∞',
    qmConstrain: 'Min AP must be lesser than or equal to 1,000,000,000!',
    amountConstrain: 'Max Amount must be greater than or equal to Min Amount',
    requireSelectedProduct: 'At least 1 product must be selected per group',
    confirmChangeGroup: 'Are you sure you want to change the Revenue Group for affiliate: {0}',
    choseAnotherGroup: 'Please choose another group (not old group)!',
    assignGroupSuccessfully: 'Assign affiliate to Revenue Group successfully',
    addGroupSuccessfully: 'Add Revenue Group Successfully',
    updateGroupSuccessfully: 'Update Revenue Group Successfully',
    note: "Note: Change will only affect Monthly Calculation if it make before 1st of next month. (GMT -4)"
}

const _deductionNameList = {
    platformFee: 'Platform Fee',
    operationalFee: 'Operational Fee',
    bankingFee: 'Banking Fee'
}
export const deductionNameList = _deductionNameList;

export const regExp = {
    checkAmount: "^(\\d+\\.?\\d*)?$",
    shouldFormatAmount: "^\\d+$",
    validAmount: "^\\d+(\\.\\d{1,})?$"
}