import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Button } from 'reactstrap';
import { Pager } from '@9softstudio/react-fixed-table-header';

import { format, formatDecimal } from '../../../modules/numberFormat';
import { setPagingOption, setViewLevel, setParam } from '../actions';
import { post } from '../../../modules/ajaxRequest';
import { toggleLoader } from '../../../actions/loaderAction';
import { globalResource } from '../../../modules/globalResource';
import { allProduct, viewLevel, sortByMonthOnMonthView, sortDirectionType, totalText, headerText } from '../modules/constants';

export class GridData extends PureComponent {
    constructor(props) {
        super(props);

        this.cachedMainReport = null;
        this.totalItemMainReport = 0;
        this.count = 0;

        this.state = {
            gridData: null,
            total: null
        }

        this.tableHeight = window.innerHeight - 275;
    }

    componentDidUpdate(prevProps) {
        const { param } = this.props;
        const isMainView = this._isMainView();

        if (param !== prevProps.param && isMainView) {
            if (this.cachedMainReport && this.cachedMainReport.gridData) {
                const { gridData, total, totalItem } = this.cachedMainReport;

                this.setState({ gridData, total }, () => {
                    this.cachedMainReport = null;
                });
                this.props.setPagingOption({ TotalItem: totalItem, PageIndex: param.PageIndex, PageSize: param.PageSize });
            }
            else {
                this.fetchData(param);
            }
        }
        else if (param !== prevProps.param) {
            if (this.cachedMainReport === null) {
                this.cachedMainReport = Object.assign(this.state, { totalItem: prevProps.pagingOption.TotalItem });
            }

            this.fetchData(param);
        }
    }

    _isMainView() {
        return this.props.currentViewLevel === viewLevel.main;
    }

    async fetchData(param) {
        this.props.toggleLoader(true);
        const isMainView = this._isMainView();
        const url = `Portal/Report/${isMainView ? 'GetMainData' : 'GetDetailData'}`;
        const response = await post(url, param);
        if (response && response.status === 200) {
            const { MainData, Total, TotalItem } = response.data;

            this.setState({ gridData: MainData, total: Total });
            this.props.setPagingOption({ TotalItem, PageIndex: param.PageIndex, PageSize: param.PageSize });

            if (isMainView) {
                this.cachedMainReport = null;
            }
        }
        this.props.toggleLoader(false);
    }

    _renderHeader() {
        const isMainView = this._isMainView();
        const firstColName = isMainView ? headerText.UserName : headerText.MonthDateString;

        return [
            <tr className="feeze-row feeze-row-h1" key="thead-1">
                <th className="freeze-column-header" width={100} rowSpan="2" title={firstColName}>{firstColName}</th>
                <th width={50} rowSpan="2" title={headerText.TotalClick}>{headerText.TotalClick}</th>
                <th width={50} rowSpan="2" title={headerText.UniqueClick}>{headerText.UniqueClick}</th>
                <th width={50} rowSpan="2" title={headerText.Signup}>{headerText.Signup}</th>
                <th width={50} rowSpan="2" title={headerText.Fdm}>{headerText.Fdm}</th>
                <th width={50} rowSpan="2" title={headerText.ActiveMember}>{headerText.ActiveMember}</th>
                <th width={50} rowSpan="2" title={headerText.NoOfSubAff}>{headerText.NoOfSubAff}</th>
                <th colSpan="11" title={headerText.MemberStatistics}>{headerText.MemberStatistics}</th>
                <th colSpan={isMainView ? 8 : 7} title={headerText.AffiliateStatistics}>{headerText.AffiliateStatistics}</th>
                {isMainView && (<th width={50} rowSpan="2" title={headerText.MonthOnMonth}>{headerText.MonthOnMonth}</th>)}
            </tr>,
            <tr className="feeze-row feeze-row-h2" key="thead-1">
                <th width={75} title={headerText.Deposit}>{headerText.Deposit}</th>
                <th width={75} title={headerText.Withdrawal}>{headerText.Withdrawal}</th>
                <th width={75} title={headerText.Turnover}>{headerText.Turnover}</th>
                <th width={75} title={headerText.Winlost}>{headerText.Winlost}</th>
                <th width={70} title={headerText.Bonus}>{headerText.Bonus}</th>
                <th width={70} title={headerText.Rebate}>{headerText.Rebate}</th>
                <th width={70} title={headerText.PlatformFee}>{headerText.PlatformFee}</th>
                <th width={75} title={headerText.OperationalFee}>{headerText.OperationalFee}</th>
                <th width={70} title={headerText.DepositFee}>{headerText.DepositFee}</th>
                <th width={70} title={headerText.WithdrawalFee}>{headerText.WithdrawalFee}</th>
                <th width={70} title={headerText.TotalFee}>{headerText.TotalFee}</th>

                <th width={65} title={headerText.CommissionRate}>{headerText.CommissionRate}</th>
                <th width={75} title={headerText.Earning}>{headerText.Earning}</th>
                <th width={75} title={headerText.P2pEarning}>{headerText.P2pEarning}</th>
                <th width={75} title={headerText.SubAffEarning}>{headerText.SubAffEarning}</th>
                <th width={75} title={headerText.TotalEarning}>{headerText.TotalEarning}</th>
                <th width={75} title={headerText.AffWithdrawal}>{headerText.AffWithdrawal}</th>
                {isMainView && (<th width={75} title={headerText.AffAdjustment}>{headerText.AffAdjustment}</th>)}
                <th width={80} title={headerText.BalanceBf}>{headerText.BalanceBf}</th>
            </tr>
        ];
    }

    _renderDataSection(dataList) {
        const dataRows = [];

        if (dataList.length) {
            const { param } = this.props;

            const isSelectedAllProducts = param.ProductIds === allProduct;
            const productColumnClassName = isSelectedAllProducts ? 'text-right' : 'text-right highlight';

            for (let i = 0; i < dataList.length; i++) {
                const dataItem = dataList[i];
                dataRows.push(this._buildDataRow(dataItem, productColumnClassName, i));
            }
        }
        else {
            dataRows.push(<tr>
                <td className="text-center" colSpan={26 + Number(this._isMainView())}>{globalResource.NoInfo}</td>
            </tr>);
        }

        return dataRows;
    }

    _buildDataRow(dataItem, productColumnClassName, index) {
        const isMainView = this._isMainView();
        const isTotalRow = isMainView ? (dataItem.AffId === 0 && dataItem.UserName === "") : (dataItem.MonthDate === null);
        const firstColValue = isTotalRow ?
            totalText :
            (isMainView ? dataItem.UserName : this._buildMonthCell(dataItem.MonthDateString, dataItem.Description));

        return (
            <tr key={`dataRow-${index}`}>
                <td className="freeze-column" title={firstColValue}>{firstColValue}</td>
                {this._buildCommonCell(dataItem, productColumnClassName, isTotalRow)}
                {
                    isMainView && (
                        <td className="text-center">
                            {dataItem.AffId > 0 ? (
                                <Button color="link" className="p-0"
                                    onClick={() => this.handleViewMonthOnMonth(dataItem.UserName)}>View</Button>) : ''}
                        </td>)
                }
            </tr>
        )
    }

    _buildMonthCell(monthDate, description) {
        return description ? `${monthDate} (${description})` : monthDate;
    }

    _buildCommonCell(dataItem, productColumnClassName, isTotalRow) {
        const totalClick = format(dataItem.TotalClick);
        const uniqueClick = format(dataItem.UniqueClick);
        const signup = format(dataItem.Signup);
        const fdm = format(dataItem.Fdm);
        const activeMember = format(dataItem.ActiveMember);
        const noOfSubAff = format(dataItem.NoOfSubAff);
        const deposit = formatDecimal(dataItem.Deposit);
        const withdrawal = formatDecimal(dataItem.Withdrawal);
        const turnover = formatDecimal(dataItem.Turnover);
        const winlost = formatDecimal(dataItem.Winlost);
        const bonus = formatDecimal(dataItem.Bonus);
        const rebate = formatDecimal(dataItem.Rebate);
        const platformFee = formatDecimal(dataItem.PlatformFee);
        const operationalFee = formatDecimal(dataItem.OperationalFee);
        const depositFee = formatDecimal(dataItem.DepositFee);
        const withdrawalFee = formatDecimal(dataItem.WithdrawalFee)
        const totalFee = formatDecimal(dataItem.TotalFee);
        const earning = formatDecimal(dataItem.Earning);
        const p2pEarning = formatDecimal(dataItem.P2pEarning);
        const affWithdrawal = formatDecimal(dataItem.AffWithdrawal);
        const affAdjustment = formatDecimal(dataItem.AffAdjustment);
        const balanceBf = formatDecimal(dataItem.BalanceBf);
        const commRate = this._isMainView() && isTotalRow ? 'N/A' : formatDecimal(dataItem.CommissionRate) + '%';
        const subAffEarning = formatDecimal(dataItem.SubAffEarning);
        const totalEarning = formatDecimal(dataItem.TotalEarning);

        return (
            <React.Fragment>
                <td className="text-right" title={totalClick}>{totalClick}</td>
                <td className="text-right" title={uniqueClick}>{uniqueClick}</td>
                <td className="text-right" title={signup}>{signup}</td>
                <td className="text-right" title={fdm}>{fdm}</td>
                <td className="text-right" title={activeMember}>{activeMember}</td>
                <td className="text-right" title={noOfSubAff}>{noOfSubAff}</td>
                <td className="text-right" title={deposit}>{deposit}</td>
                <td className="text-right" title={withdrawal}>{withdrawal}</td>
                <td className={productColumnClassName} title={turnover}>{turnover}</td>
                <td className={productColumnClassName} title={winlost}>{winlost}</td>
                <td className="text-right" title={bonus}>{bonus}</td>
                <td className="text-right" title={rebate}>{rebate}</td>
                <td className="text-right" title={platformFee}>{platformFee}</td>
                <td className="text-right" title={operationalFee}>{operationalFee}</td>
                <td className="text-right" title={depositFee}>{depositFee}</td>
                <td className="text-right" title={withdrawalFee}>{withdrawalFee}</td>
                <td className="text-right" title={totalFee}>{totalFee}</td>
                <td className="text-right" title={commRate}>{commRate}</td>
                <td className="text-right" title={earning}>{earning}</td>
                <td className="text-right" title={p2pEarning}>{p2pEarning}</td>
                <td className="text-right" title={subAffEarning}>{subAffEarning}</td>
                <td className="text-right" title={totalEarning}>{totalEarning}</td>
                <td className="text-right" title={affWithdrawal}>{affWithdrawal}</td>
                {this._isMainView() && (<td className="text-right" title={affAdjustment}>{affAdjustment}</td>)}
                <td className="text-right" title={balanceBf}>{balanceBf}</td>
            </React.Fragment>
        )
    }

    handleViewMonthOnMonth = (UserName) => {
        const { param, pagingOption } = this.props;

        const postParam = Object.assign({}, param, {
            UserName,
            SortType: sortByMonthOnMonthView.Month,
            SortDirectionType: sortDirectionType.descending,
            PageIndex: 1,
            PageSize: pagingOption.PageSize
        })

        this.props.setViewLevel(viewLevel.monthOnMonth);
        this.props.setParam(postParam);
    }

    handlePaging = (index, size) => {
        const newPaging = {
            PageIndex: index,
            PageSize: size
        };
        this.props.setPagingOption(newPaging);

        const newParam = Object.assign({}, this.props.param, newPaging);
        this.fetchData(newParam);
    }

    render() {
        const { gridData, total } = this.state;

        return gridData && (
            <React.Fragment>
                <div className="table-responsive report-table-container" style={{ 'max-height': this.tableHeight }}>
                    <Table className="freeze-table">
                        <thead>
                            {
                                this._renderHeader()
                            }
                        </thead>
                        <tbody>
                            {
                                this._renderDataSection(gridData)
                            }
                        </tbody>
                        <tfoot>
                            {total && this._renderDataSection([total])}
                        </tfoot>
                    </Table>
                </div>
                <Pager
                    pageOption={this.props.pagingOption}
                    onPaging={this.handlePaging} />
            </React.Fragment>
        );
    }
}

function mapStateToProps({ pagingOption, param, currentViewLevel }) {
    return Object.assign({}, { pagingOption, param, currentViewLevel });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setPagingOption, toggleLoader, setViewLevel, setParam }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GridData);