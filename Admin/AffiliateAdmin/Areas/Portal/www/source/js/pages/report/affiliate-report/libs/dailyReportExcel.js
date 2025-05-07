import Excel from '../../../../modules/excel';
import { titleCellStyle, headerCellStyle, bodyCellStyle } from '../../../../modules/excelStyleConstant';
import { headerText, reportKey, resource } from './constants';

const TITLE_ROW_INDEX = 0;
const HEADER_ROW_INDEX = 1;
const DATA_ROW_INDEX = 2;

const MAIN_SECTION_STYLE = 'mainSectionStyle';
const COL_WIDTH = 'wpx';

const detailColConfig = {
    ['Affiliate']: {
        [MAIN_SECTION_STYLE]: bodyCellStyle.left,
        [COL_WIDTH]: 150
    },
    [reportKey.PaymentCurrency]: {
        [MAIN_SECTION_STYLE]: bodyCellStyle.center,
        [COL_WIDTH]: 120
    },
    [reportKey.TotalClick]: {
        [MAIN_SECTION_STYLE]: bodyCellStyle.number,
        [COL_WIDTH]: 120
    },
    [reportKey.UniqueClick]: {
        [MAIN_SECTION_STYLE]: bodyCellStyle.number,
        [COL_WIDTH]: 120
    },
    [reportKey.Signup]: {
        [MAIN_SECTION_STYLE]: bodyCellStyle.number,
        [COL_WIDTH]: 120
    },
    [reportKey.Fdm]: {
        [MAIN_SECTION_STYLE]: bodyCellStyle.number,
        [COL_WIDTH]: 120
    },
    [reportKey.ActiveMember]: {
        [MAIN_SECTION_STYLE]: bodyCellStyle.number,
        [COL_WIDTH]: 120
    },
    [reportKey.NoOfSubAff]: {
        [MAIN_SECTION_STYLE]: bodyCellStyle.number,
        [COL_WIDTH]: 120
    },
    [reportKey.Deposit]: {
        [MAIN_SECTION_STYLE]: bodyCellStyle.decimal,
        [COL_WIDTH]: 120
    },
    ['DepositAmount']: {
        [MAIN_SECTION_STYLE]: bodyCellStyle.decimal,
        [COL_WIDTH]: 120
    }
};

const detailHeaderConfig = {
    ['Affiliate']: headerText[reportKey.UserName],
    [reportKey.PaymentCurrency]: headerText[reportKey.PaymentCurrency],
    [reportKey.TotalClick]: headerText[reportKey.TotalClick],
    [reportKey.UniqueClick]: headerText[reportKey.UniqueClick],
    [reportKey.Signup]: headerText[reportKey.Signup],
    [reportKey.Fdm]: headerText[reportKey.Fdm],
    [reportKey.ActiveMember]: headerText[reportKey.ActiveMember],
    [reportKey.NoOfSubAff]: headerText[reportKey.NoOfSubAff],
    [reportKey.Deposit]: headerText[reportKey.Deposit],
    ['DepositAmount']: 'Deposit Amount'
};

export default class DailyReportExcel {
    constructor(data, title) {
        this.detailWorksheet = {};
        this.title = this._buildTitle(title);
        this.data = this._handleAffReportDaily(data);
        this.columnConfigs = this._getColumnConfigs();
        this.totalColumn = this.columnConfigs.length;
        this.detailMergeConfig = [];
    }

    createWorksheet() {
        this._createTitle();
        this._createHeader();
        this._createBodyData();
        this._createExcelConfig();
        return this.detailWorksheet;
    }

    _handleAffReportDaily(data) {
        if (!Array.isArray(data) || data.length === 0) {
            return [];
        }

        const totals = [];

        data.forEach(item => {
            const key = item.UserName;

            let total = totals.find(t => t.UserName === key);

            if (!total) {
                total = {
                    DateText: null,
                    UserName: key,
                    AffId: item.AffId,
                    PaymentCurrency: item.PaymentCurrency,

                    TotalClick: 0,
                    UniqueClick: 0,
                    Signup: 0,
                    Fdm: 0,
                    ActiveMember: 0,
                    NoOfSubAff: 0,
                    Deposit: 0,
                    DepositAmount: 0
                };
                totals.push(total);
            }

            total.TotalClick += item.TotalClick;
            total.UniqueClick += item.UniqueClick;
            total.Signup += item.Signup;
            total.Fdm += item.Fdm;
            total.ActiveMember += item.ActiveMember;
            total.NoOfSubAff += item.NoOfSubAff;
            total.Deposit += item.Deposit;
            total.DepositAmount += item.DepositAmount;
        });

        for (let i = data.length - 1; i >= 0; i--) {
            const key = data[i].UserName;

            if (!data.slice(0, i).some(item => item.UserName === key)) {
                const total = totals.find(t => t.UserName === key);
                data.splice(i, 0, total);
            }
        }

        return data;
    }

    _buildTitle(title) {
        const lastDashIndex = title.lastIndexOf('-');
        if (lastDashIndex === -1) {
            return null;
        }

        return `${resource.reportName} - Details - ${title.substring(lastDashIndex + 1).trim()}`;
    }

    _getColumnConfigs() {
        return Object.keys(detailHeaderConfig).map(key => ({
            field: key,
            [MAIN_SECTION_STYLE]: detailColConfig[key][MAIN_SECTION_STYLE],
            [COL_WIDTH]: detailColConfig[key][COL_WIDTH]
        }));
    }

    _createTitle() {
        this.detailMergeConfig.push({
            s: { r: TITLE_ROW_INDEX, c: 0 },
            e: { r: TITLE_ROW_INDEX, c: this.totalColumn - 1 }
        });
        const address = Excel.getCellAddress({
            c: 0,
            r: TITLE_ROW_INDEX
        });
        this.detailWorksheet[address] = {
            t: "s",
            v: this.title,
            s: titleCellStyle
        };
    }

    _createHeader() {
        Object.values(detailHeaderConfig).forEach((text, idx) => {
            const address = Excel.getCellAddress({
                c: idx,
                r: HEADER_ROW_INDEX
            });
            this.detailWorksheet[address] = {
                t: "s",
                v: text,
                s: headerCellStyle
            };
        });
    }

    _createBodyData() {
        let currentRow = DATA_ROW_INDEX;

        for (const item of this.data) {
            for (let j = 0; j < this.totalColumn; j++) {
                const address = Excel.getCellAddress({ c: j, r: currentRow });
                this.detailWorksheet[address] = this._buildDataRow(item, j);
            }
            currentRow++;
        }
    }

    _buildDataRow(item, colIndex) {
        const columnConfig = this.columnConfigs[colIndex];
        let value;
        let style = columnConfig[MAIN_SECTION_STYLE];

        if (columnConfig.field === 'Affiliate') {
            value = item.DateText || item.UserName;
            style = item.DateText ? bodyCellStyle.right : bodyCellStyle.left;
        } else {
            value = item[columnConfig.field];
        }

        return {
            t: Excel.getCellType(value),
            v: value,
            s: style
        };
    }

    _createExcelConfig() {
        const cellStart = Excel.getCellAddress({
            r: 0,
            c: 0
        });
        const cellEnd = Excel.getCellAddress({
            r: this.data.length + DATA_ROW_INDEX,
            c: this.totalColumn
        });

        this.detailWorksheet['!merges'] = this.detailMergeConfig;
        this.detailWorksheet["!ref"] = `${cellStart}:${cellEnd}`;
        this.detailWorksheet['!cols'] = this.columnConfigs.map(item => ({
            [COL_WIDTH]: item[COL_WIDTH]
        }));
    }
} 