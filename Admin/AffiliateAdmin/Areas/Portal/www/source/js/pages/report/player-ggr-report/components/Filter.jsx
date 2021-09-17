import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import MultipleSelect from '../../../../components/multiple-select';
import { DatePicker } from '@9softstudio/react-datepicker';
import { setReportTitle, setParam, setProductList } from '../actions';
import { handleChangeMultipleSelected, handleAfterChangeFromDate, handleAfterChangeToDate } from '../../../../modules/utils';
import { minDate, sixMonth, defaultBaseCurrency } from '../../../../modules/constants';
import { globalResource } from '../../../../modules/globalResource';

export class Filter extends Component {
    constructor(props) {
        super(props);

        const { today, productList, baseCurrencyList } = this.props;

        const now = new Date(today);
        this.nowString = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

        const sixMonthAgo = new Date(today);
        sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);

        this.state = {
            affName: '',
            playerName: '',
            fromDate: sixMonthAgo < minDate ? '01/01/2020' : `${sixMonthAgo.getMonth() + 1}/${sixMonthAgo.getDate()}/${sixMonthAgo.getFullYear()}`,
            toDate: this.nowString,
            selectedProductList: productList.filter(item => item.checked).map(item => item.key).join(',') || '',
            selectedBaseCurrency: baseCurrencyList.length && baseCurrencyList[0].ExchangeId || defaultBaseCurrency,
        }
    }

    componentDidUpdate(prevProps) {
        const { } = this.props;
    }

    handlePressEnter = (event) => {
        if (event.charCode === 13) {
            this.handleClickSearch();
        }
    }

    handleChangeFromDate = (momentDate) => {
        this.setState(prevState => handleAfterChangeFromDate(momentDate, prevState.toDate, sixMonth));
    }

    handleChangeToDate = (momentDate) => {
        this.setState(prevState => handleAfterChangeToDate(momentDate, prevState.fromDate, sixMonth));
    }

    handleChangeProduct = (item, selectedProductList) => {
        this.setState({ selectedProductList });

        this.props.setProductList(handleChangeMultipleSelected(this.props.productList, selectedProductList));
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    handleClickSearch = () => {
        const { selectedProductList, selectedBaseCurrency, fromDate, toDate, affName, playerName } = this.state;
        const { pagingOption } = this.props;

        this._updateReportTitle();

        const param = {
            AffName: affName,
            OlayerName: playerName,
            FromDate: fromDate,
            ToDate: toDate,
            BaseCurrencyId: Number(selectedBaseCurrency),
            ProductIds: selectedProductList,
            PageIndex: 1,
            PageSize: pagingOption.PageSize
        }

        this.props.setParam(param);
    }

    _updateReportTitle() {
        const reportTitle = this._buildReportTitle();

        this.props.setReportTitle(reportTitle);
    }

    _buildReportTitle() {
        const { productList, baseCurrencyList } = this.props;
        const { fromDate, toDate, affName, playerName, selectedBaseCurrency } = this.state;

        const affNameTitle = `${affName && '- Username contains \'' + affName + '\''}`;
        const playerNameTitle = `${playerName && '- Username contains \'' + playerName + '\''}`;
        const productName = productList.every(p => p.checked) ? 'All Products' : productList.filter(p => p.checked).map(p => p.name).join(',');

        const fromToTitle = `FROM ${fromDate} TO ${toDate}`;
        const reportName = 'PLAYER GGR REPORT ';
        const baseCurrency = baseCurrencyList.filter(x => x.ExchangeId == selectedBaseCurrency).map(b => b.Code).join(',');

        return `${reportName}${affNameTitle}${playerNameTitle} - ${productName} - ${fromToTitle} - Base Currency ${baseCurrency}`;
    }

    render() {
        const { productList, baseCurrencyList, isProduction } = this.props;
        const { selectedBaseCurrency, fromDate, toDate, affName, playerName } = this.state;

        return (
            <div className="filter-container">
                <Form inline tag="div">
                    <FormGroup className="my-sm-1 mr-sm-2">
                        <Label for="Affiliate" className="mr-sm-2">Affiliate</Label>
                        <Input type="text" name="affName" id="Affiliate"
                            onKeyPress={this.handlePressEnter}
                            onChange={this.handleChange}
                            value={affName} />
                    </FormGroup>
                    <FormGroup className="my-sm-1 mr-sm-2">
                        <Label for="Player" className="mr-sm-2">Player</Label>
                        <Input type="text" name="playerName" id="Player"
                            onKeyPress={this.handlePressEnter}
                            onChange={this.handleChange}
                            value={playerName} />
                    </FormGroup>
                    <FormGroup className="my-sm-1 mr-sm-2">
                        <Label className="mr-sm-2">{globalResource.BaseCurrency}</Label>
                        <Input type="select" name="selectedBaseCurrency" id="BaseCurrency" value={selectedBaseCurrency} onChange={this.handleChange}>
                            {
                                baseCurrencyList.map(c => {
                                    return (<option key={c.ExchangeId} value={c.ExchangeId}>{c.Code}</option>)
                                })
                            }
                            {
                                !isProduction && <option value="20">UUS</option>
                            }
                        </Input>
                    </FormGroup>
                    <FormGroup className="my-sm-1 mr-sm-2"
                        style={{ width: 175 }}>
                        <MultipleSelect
                            dataSource={productList}
                            keyField="key"
                            valueField="name"
                            statusField="checked"
                            maxDisplayItemCount={1}
                            hasInputOption={true}
                            noneSelectedLabel="Please Select"
                            selectedAllLabel="All Products"
                            onChange={this.handleChangeProduct} />
                    </FormGroup>
                    <FormGroup className="my-sm-1 mr-sm-2">
                        <Label className="mr-sm-2">{globalResource.From}</Label>
                        <DatePicker minDate={minDate} maxDate={this.nowString} date={fromDate}
                            iconElement={(<span className="oi oi-calendar icon-calendar ml-1"></span>)}
                            onChange={this.handleChangeFromDate} />
                    </FormGroup>
                    <FormGroup className="my-sm-1 mr-sm-2">
                        <Label className="mr-sm-2">{globalResource.To}</Label>
                        <DatePicker minDate={fromDate} maxDate={this.nowString} date={toDate}
                            iconElement={(<span className="oi oi-calendar icon-calendar ml-1"></span>)}
                            onChange={this.handleChangeToDate} />
                    </FormGroup>
                    <Button outline color="primary" type="button" onClick={this.handleClickSearch}>
                        <span className="oi oi-magnifying-glass"></span> Search
                    </Button>
                </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return Object.assign({}, {
        productList: state.productList,
        pagingOption: state.pagingOption,
        baseCurrencyList: state.baseCurrencyList,
        isProduction: state.isProduction,
        today: state.today,
        param: state.param,
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setReportTitle, setParam, setProductList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);