import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Row, Cell } from '@9softstudio/react-fixed-table-header';
import { Button } from 'reactstrap';

import { htmlDecode } from '../../../../modules/htmlHelper';
import { formatDecimalWithCurrencySymbol } from '../../../../modules/numberFormat';
import { setPagingOption, toggleLoaderUserPanel, fetchData, setTransactionId, redirectToDailyEarning, setExpandMonthDateList, redirectToSubAffiliate } from '../actions';
import { headerText, globalResource, transTypeList, monthlyWinlost, MONTHLY_TOTAL, MONTHLY_WINLOST, PAYMENT_REQUEST, SUBAFFILIATE, selectedAllProduct, maxWidth, CalculatedMonth } from '../modules/constants';

export class Content extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            gridData: null,
            shouldResetScrollPosition: true
        }

        this.transTypeClickHandler = this._getClickHandlerByTransType();
    }

    componentDidUpdate(prevProps) {
        const { pagingOption, param, affId } = this.props;

        if (param !== prevProps.param || affId !== prevProps.affId) {
            const newParam = Object.assign({}, param, { pageIndex: 1, pageSize: pagingOption.PageSize });

            this.props.setExpandMonthDateList({});
            this.fetchData(newParam);
        }
    }

    async fetchData(param) {
        this.props.toggleLoaderUserPanel(true);

        const postParam = { ...param, affId: this.props.affId };
        const data = await this.props.fetchData(postParam);

        this.setState({ gridData: data ? data.MainData : null, shouldResetScrollPosition: true });
        this.props.setPagingOption({ TotalItem: data ? data.TotalItem : 0, PageIndex: param.pageIndex, PageSize: param.pageSize });

        this.props.toggleLoaderUserPanel(false);
    }

    _renderHeader() {
        return (
            <Row key="thead">
                <Cell header={true} colWidth={35} title={headerText.Index}>{headerText.Index}</Cell>
                <Cell header={true} colWidth={100} title={headerText.Date}>{headerText.Date}</Cell>
                <Cell header={true} colWidth={110} title={headerText.Type}>{headerText.Type}</Cell>
                <Cell header={true} colWidth={100} title={headerText.Amount}>{headerText.Amount}</Cell>
                <Cell header={true} colWidth={95} title={headerText.Status}>{headerText.Status}</Cell>
                <Cell header={true} colWidth={110} title={headerText.Creator}>{headerText.Creator}</Cell>
                <Cell header={true} colWidth={450} title={headerText.Description}>{headerText.Description}</Cell>
            </Row>
        );
    }

    _renderDataSection(dataList) {
        const dataRows = [];

        if (dataList && dataList.length) {
            const { pagingOption } = this.props;
            const startIndex = (pagingOption.PageIndex - 1) * pagingOption.PageSize + 1;

            for (let i = 0; i < dataList.length; i++) {
                const dataItem = dataList[i];

                dataRows.push(this._buildDataRow(dataItem, i + startIndex));
            }
        }
        else {
            dataRows.push(<Row>
                <Cell className="text-center" colSpan="7">{globalResource.NoInfo}</Cell>
            </Row>);
        }

        return dataRows;
    }

    _handleRedirectToDailyEarning = (dataItem) => {
        const { affId } = this.props;
        const dailyEarningParam = {
            affId,
            monthDate: dataItem.NormalizeDateText,
            productId: selectedAllProduct
        }

        return this.props.redirectToDailyEarning(dailyEarningParam);
    }

    _handleRedirectToSubAffiliate = (dataItem) => {
        const { affId } = this.props;
        const subAffiliateParam = {
            affId,
            monthDate: dataItem.NormalizeDateText
        }

        return this.props.redirectToSubAffiliate(subAffiliateParam);
    }

    _getClickHandlerByTransType() {
        return {
            [PAYMENT_REQUEST]: (dataItem) => () => {
                return this.handleSetTransactionId(dataItem.TransId);
            },
            [MONTHLY_WINLOST]: (dataItem) => () => this._handleRedirectToDailyEarning(dataItem),
            [SUBAFFILIATE]: (dataItem) => () => this._handleRedirectToSubAffiliate(dataItem)
        }
    }

    _handleShow = (monthDate) => {
        const { expandMonthDateList } = this.props;
        this.setState({ shouldResetScrollPosition: false });

        this.props.setExpandMonthDateList(Object.assign({}, expandMonthDateList, { [monthDate]: !expandMonthDateList[monthDate] }));
    }

    _buildDataRow(dataItem, index) {
        const { expandMonthDateList } = this.props;
        const isExpand = expandMonthDateList[dataItem.NormalizeDateText];
        const amount = formatDecimalWithCurrencySymbol(dataItem.Amount)
        const transType = dataItem.TransType;
        const clickHandler = this.transTypeClickHandler[transType];
        const status = dataItem.Status;

        const isProcessing = status && status.toLowerCase() === 'processing';

        const creator = htmlDecode(dataItem.Creator);
        const description = htmlDecode(dataItem.DescriptionDisplay);
        const isTotalRow = transType === MONTHLY_TOTAL;
        const transTypeString = isTotalRow && dataItem.CalculatedType == CalculatedMonth ? 'Monthly Total' : transTypeList[transType];

        return (
            <React.Fragment key={`dataRow-${dataItem.TransId}-${dataItem.DateText}-${dataItem.TransType}`}>
                <Row className={status && status.toLowerCase()}>
                    <Cell title={index} className="text-center">{index}</Cell>
                    <Cell title={dataItem.DateText} className="text-center">{
                        isTotalRow ? (
                            <Button className="p-0 th-wrapper" color="link" onClick={() => this._handleShow(dataItem.NormalizeDateText)}>
                                <div className="icon-container">
                                    <span className={`caret ${isExpand ? 'expand current' : 'collapsed'}`}></span>
                                </div>
                                <span>{dataItem.DateText}</span>
                            </Button>
                        ) : dataItem.DateText
                    }</Cell>
                    <Cell title={transTypeString || monthlyWinlost} className="text-center">{transTypeString || monthlyWinlost}</Cell>
                    <Cell title={amount} className="text-right">
                        {clickHandler ?
                            (<Button className="p-0" color="link" onClick={clickHandler(dataItem)}>
                                {amount}
                            </Button>) :
                            amount}
                    </Cell>
                    <Cell title={status} className="text-center">{isProcessing ?
                        <Button className="p-0" color="link" onClick={() => this.handleSetTransactionId(dataItem.TransId)}>
                            {status}
                        </Button> : status}</Cell>
                    <Cell title={creator} className="text-center">{creator}</Cell>
                    <Cell title={description}>{description}</Cell>
                </Row>
                {
                    isTotalRow && isExpand && dataItem.Children.map(item => {
                        return this._buildDataRow(item);
                    })
                }
            </React.Fragment>
        )
    }

    handleSetTransactionId = (transId) => {
        this.setState({ shouldResetScrollPosition: false });

        this.props.setTransactionId(transId);
    }

    handlePaging = (pageIndex, pageSize) => {
        const newParam = { ...this.props.param, pageIndex, pageSize };

        this.fetchData(newParam);
    };

    render() {
        const { gridData, shouldResetScrollPosition } = this.state;

        return (
            <div className="data-content payment-request">
                <div className="table-responsive table-striped my-2">
                    <Table
                        maxWidth={maxWidth}
                        bodyHeight={300}
                        header={this._renderHeader()}
                        body={this._renderDataSection(gridData)}
                        containerPadding={10}
                        isPaging={true}
                        pageOption={this.props.pagingOption}
                        onPaging={this.handlePaging}
                        shouldResetScrollPosition={shouldResetScrollPosition}
                    />
                </div>
            </div>
        );
    }
}


function mapStateToProps({ affCommonInfo, statementHistory }) {
    const { pagingOption, param, expandMonthDateList } = statementHistory;
    const { affId } = affCommonInfo;

    return Object.assign({}, { affId, pagingOption, param, expandMonthDateList });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setPagingOption, toggleLoaderUserPanel, fetchData, setTransactionId, redirectToDailyEarning, setExpandMonthDateList, redirectToSubAffiliate }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);