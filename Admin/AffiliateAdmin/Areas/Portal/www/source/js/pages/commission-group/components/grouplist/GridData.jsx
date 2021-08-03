import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Row, Cell } from '@9softstudio/react-fixed-table-header';

import { resolveClientUrl } from '../../../../modules/utils';
import { INFINITY_AM, INFINITY_QM, INFINITY_SYMBOL, globalResource, format, formatDecimal } from '../../modules/constant';
import { deleteCommGroup, getGroupSettingList } from '../../actions';
import { htmlDecode } from '../../../../modules/htmlHelper';
import { NotificationPopup } from '../../../common/components/NotificationPopup';

export class GridData extends Component {
    constructor(props) {
        super(props);

        const { productList } = this.props;
        this.products = {};
        for (let product of productList) {
            this.products[product.ProductId] = product.ProductName;
        }

        this.state = {
            shouldResetScrollPosition: true,
            selectedGroupId: 0,
            messageNotification: '',
            isConfirmPopup: true
        }
    }

    _convertToProductNameText(productIdList) {
        return productIdList.split(',').reduce((accumulator, currentItem) => {
            const productName = this.products[currentItem.trim()];
            if (productName) {
                accumulator.push(productName);
            }

            return accumulator;
        }, []).join(',');
    }

    handleCloseNotificationPopup = (confirmResult) => {
        this.setState({ messageNotification: '' });

        const { selectedGroupId } = this.state;
        if (confirmResult && selectedGroupId) {
            this._deleteCommGroup(selectedGroupId);
        }
    }

    _handleDeleteCommGroup = (selectedGroupId, groupName) => {
        this.setState({ messageNotification: `Are you sure you want to delete the Revenue Group ${groupName} ?`, isConfirmPopup: true, selectedGroupId, shouldResetScrollPosition: false });
    }

    _deleteCommGroup = async (groupId) => {
        const response = await this.props.deleteCommGroup({ groupId });
        if (response && response.status === 200) {
            const result = response.data;

            if (result.IsSuccessful) {
                const { pagingOption } = this.props;
                const gettingParam = Object.assign({}, { PageIndex: pagingOption.PageIndex, PageSize: pagingOption.PageSize, GroupName: this.props.searchedGroupName });
                this.props.getGroupSettingList(gettingParam);

                this.setState({ messageNotification: "Delete Revenue Group Successfully", isConfirmPopup: false, shouldResetScrollPosition: true });
            }
            else {
                this.setState({ messageNotification: result.Message, isConfirmPopup: false, shouldResetScrollPosition: true });
            }
        }
    }

    _renderHeader() {
        return [
            <Row key="theard">
                <Cell header={true} colWidth={40} rowSpan="2"></Cell>
                <Cell header={true} colWidth={150} rowSpan="2">Name</Cell>
                <Cell header={true} colWidth={50} rowSpan="2">No.Aff</Cell>
                <Cell header={true} colWidth={150} rowSpan="2">Description</Cell>
                <Cell header={true} colWidth={80} rowSpan="2">Creation</Cell>
                <Cell header={true} colSpan="10">Policy</Cell>
                <Cell header={true} colWidth={50} rowSpan="2">Action</Cell>
            </Row>,
            <Row key="sub-theard">
                <Cell header={true} colWidth={150}></Cell>
                <Cell header={true} colWidth={50}>Tier</Cell>
                <Cell header={true} colWidth={80} title="Minimum all members' winlost amount">Min Amount</Cell>
                <Cell header={true} colWidth={80} title="Maximum all members' winlost amount">Max Amount</Cell>
                <Cell header={true} colWidth={80} title="Minimum number of active players">Min AP</Cell>
                <Cell header={true} colWidth={80} title="Maximum number of active players">Max AP</Cell>
                <Cell header={true} colWidth={80}>Revenue Rate</Cell>
                <Cell header={true} colWidth={80}>Operational Fee</Cell>
                <Cell header={true} colWidth={80}>Deposit Fee</Cell>
                <Cell header={true} colWidth={80}>Withdrawal Fee</Cell>
            </Row>
        ];
    }

    _renderGroupData() {
        const { gridData } = this.props;
        const rows = [];

        if (gridData && gridData.length) {
            for (let index = 0; index < gridData.length; index++) {
                const item = gridData[index];

                const { TierSettingList, P2pDeductionList, PlatformFeeList, OperationalFee, DepositFee, WithdrawalFee, ...group } = item;
                const tierSettingRowSpan = TierSettingList.length;
                const platformFeeRowSpan = PlatformFeeList.length;
                const p2pDeductionRowSpan = P2pDeductionList.length;
                const operationalFeeRowSpan = tierSettingRowSpan + platformFeeRowSpan;
                const rowSpan = tierSettingRowSpan + platformFeeRowSpan + p2pDeductionRowSpan;

                const operationalFee = OperationalFee && (OperationalFee.IsDeductedPercent ? `${format(OperationalFee.DeductedPercentage * 100, 1)}%` : formatDecimal(Number(OperationalFee.DeductedAmount)))
                const depositFee = DepositFee && (DepositFee.IsDeductedPercent ? `${format(DepositFee.DeductedPercentage * 100, 1)}%` : formatDecimal(Number(DepositFee.DeductedAmount)))
                const withdrawalFee = WithdrawalFee && (WithdrawalFee.IsDeductedPercent ? `${format(WithdrawalFee.DeductedPercentage * 100, 1)}%` : formatDecimal(Number(WithdrawalFee.DeductedAmount)))

                for (let iTier = 0; iTier < TierSettingList.length; iTier++) {
                    const tierSetting = TierSettingList[iTier];
                    const isFirstItem = iTier === 0;
                    const isPrivateGroup = group.GroupId > 1000;
                    const minAmount = format(tierSetting.MinAmount);
                    const maxAmount = tierSetting.MaxAmount === INFINITY_AM ? INFINITY_SYMBOL : format(tierSetting.MaxAmount);
                    const minAp = format(tierSetting.MinAp);
                    const maxAp = tierSetting.MaxAp === INFINITY_QM ? INFINITY_SYMBOL : format(tierSetting.MaxAp);

                    rows.push(
                        (<Row key={`row-${index}-${iTier}`} className={isPrivateGroup ? "private" : ""}>
                            { isFirstItem && (
                                <Fragment>
                                    <Cell className="text-center" rowSpan={rowSpan}>{group.RowIdx}</Cell>
                                    <Cell className="text-center" rowSpan={rowSpan} title={isPrivateGroup && "Private Group"}>
                                        {isPrivateGroup && (<span className="oi oi-person"></span>)}{htmlDecode(group.GroupName)}
                                    </Cell>
                                    <Cell className="text-center" rowSpan={rowSpan}>
                                        <a href={resolveClientUrl("Portal/Affiliate?groupId=") + group.GroupId} target="_top">{group.NoAffs}</a>
                                    </Cell>
                                    <Cell className="text-center" rowSpan={rowSpan}>{htmlDecode(group.Description)}</Cell>
                                    <Cell className="text-center" rowSpan={rowSpan}><p>{group.Creator}</p><p>{group.CreatedDateText}</p></Cell>
                                    <Cell className="font-weight-bold cell-tier" rowSpan={tierSettingRowSpan}>Tier Setting</Cell>
                                </Fragment>
                            )}

                            <Cell className="text-center cell-tier">{tierSetting.TierId}</Cell>
                            <Cell className="text-right cell-tier" title={minAmount}>{minAmount}</Cell>
                            <Cell className="text-right cell-tier" title={maxAmount}>{maxAmount}</Cell>
                            <Cell className="text-right cell-tier" title={minAp}>{minAp}</Cell>
                            <Cell className="text-right cell-tier" title={maxAp}>{maxAp}</Cell>
                            <Cell className="text-right cell-tier">{`${format(tierSetting.Commission * 100, 1)}%`}</Cell>
                            <Cell className="text-right" rowSpan={operationalFeeRowSpan} title={operationalFee}>{operationalFee}</Cell>

                            { isFirstItem && (
                                <Fragment>
                                    <Cell className="text-right" rowSpan={rowSpan} title={depositFee}>{depositFee}</Cell>
                                    <Cell className="text-right" rowSpan={rowSpan} title={withdrawalFee}>{withdrawalFee}</Cell>
                                    <Cell className="text-center" rowSpan={rowSpan}>
                                        <button className="btn btn-link" onClick={(e) => this.props.onEdit(item.GroupId)}>
                                            <span className="oi oi-pencil text-secondary"></span>
                                        </button>

                                        {
                                            group.NoAffs === 0 && (
                                                <button className="btn btn-link" onClick={() => this._handleDeleteCommGroup(item.GroupId, item.GroupName)}>
                                                    <span className="oi oi-x text-danger"></span>
                                                </button>)
                                        }
                                    </Cell>
                                </Fragment>
                            )}
                        </Row>)
                    );
                }

                for (let platformFee of PlatformFeeList) {
                    const percent = `${format(platformFee.DeductedPercentage * 100, 1)}%`;
                    const productIds = platformFee.ProductIds;

                    rows.push(
                        (<Row key={`row-platform-${index}-${productIds}`}>
                            <Cell className="font-weight-bold cell-tier">{`Royalty Fee ${percent}`}</Cell>
                            <Cell className="cell-tier" colSpan="6">{this._convertToProductNameText(productIds)}</Cell>
                        </Row>)
                    );
                }

                for (let p2pDeduction of P2pDeductionList) {
                    const p2pFixedRate = `${format(p2pDeduction.Commission * 100, 1)}%`;
                    const royaltyFee = `${format(p2pDeduction.DeductedPercentage * 100, 1)}%`;
                    const productIds = p2pDeduction.ProductIds;

                    rows.push(
                        (<Row key={`row-platform-${index}-${productIds}`}>
                            <Cell className="font-weight-bold cell-deduction">{`P2P Fixed Rate ${p2pFixedRate}`}</Cell>
                            <Cell className="font-weight-bold cell-deduction" colSpan="2">{`Royalty Fee ${royaltyFee}`}</Cell>
                            <Cell className="cell-deduction" colSpan="4">{this._convertToProductNameText(productIds)}</Cell>
                            <Cell className="text-right cell-while">{globalResource.NA}</Cell>
                        </Row>)
                    );
                }
            }
        }
        else {
            rows.push(<Row>
                <Cell className="text-center" colSpan="16">{globalResource.NoInfo}</Cell>
            </Row>);
        }

        return rows;
    }

    render() {
        const { shouldResetScrollPosition, messageNotification, isConfirmPopup } = this.state;

        return (
            <React.Fragment>
                <div className="table-responsive table-group-setting">
                    <Table
                        minWidth={1000}
                        autoWidth={true}
                        bodyHeight={300}
                        header={this._renderHeader()}
                        body={this._renderGroupData()}
                        containerPadding={20}
                        shouldResetScrollPosition={shouldResetScrollPosition}
                    />
                </div>
                {
                    !!messageNotification && <NotificationPopup
                        message={messageNotification}
                        isConfirmPopup={isConfirmPopup}
                        onClose={this.handleCloseNotificationPopup}
                    />
                }
            </React.Fragment>
        );
    }
}

function mapStateToProps({ gridData, productList, searchedGroupName, pagingOption }) {
    return Object.assign({}, { gridData, productList, searchedGroupName, pagingOption });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ deleteCommGroup, getGroupSettingList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GridData);
