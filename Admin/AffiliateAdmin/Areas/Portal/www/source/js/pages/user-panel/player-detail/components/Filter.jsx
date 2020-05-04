import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import MonthPicker from '@9softstudio/react-monthpicker';

import { globalResource, resource, selectedAllProduct, shortedMonthNames, minMonthDate, SortByIdList, SortingColumnDefault, defaultBaseCurrency } from '../modules/constants';
import { setParam, exportExcel, setSortingColumn } from '../actions';
import ReportExcel from '../modules/reportExcel';
import { htmlDecode } from '../../../../modules/htmlHelper';
import MultipleSelect from '../../../../components/multiple-select';
import { handleChangeMultipleSelected } from '../../../../modules/utils';

export class Filter extends PureComponent {
    constructor(props) {
        super(props);

        const { today, param, baseCurrencyList, currencyList } = this.props;
        const monthDate = param.isClickLink ? (param.monthDate || today) : today;
        const newMonthDate = new Date(monthDate);

        this.state = {
            selectedProduct: selectedAllProduct,
            monthDate: newMonthDate,
            selectedBaseCurrency: baseCurrencyList && baseCurrencyList.length && baseCurrencyList[0].ExchangeId || defaultBaseCurrency,
            selectedCurrencyList: '',
            currencyList
        }
    }

    componentDidMount() {
        if (this.props.param.isClickLink) {
            const { monthDate } = this.state;
            this.handleSearch(monthDate);
        }
    }

    componentDidUpdate(prevProps) {
        const { param, baseCurrencyList } = this.props;
        if (param.isClickLink && param !== prevProps.param) {
            const newMonthDate = new Date(param.monthDate);

            this.setState({
                monthDate: newMonthDate,
                selectedProduct: selectedAllProduct,
                selectedBaseCurrency: baseCurrencyList && baseCurrencyList.length && baseCurrencyList[0].ExchangeId || defaultBaseCurrency
            }, () => this.handleSearch(newMonthDate));
        }
    }

    handleSelectMonth = (month, year) => {
        this.setState({
            monthDate: new Date(year, month - 1)
        })
    }

    handleChangeProduct = (event) => {
        const selectedProduct = Number(event.target.value);

        this.setState({
            selectedProduct
        })
    }

    handleChangeBaseCurrency = (event) =>{
        const selectedBaseCurrency = Number(event.target.value);
        this.setState({
            selectedBaseCurrency
        })
    }

    handleChangeCurrency = (item, selectedCurrencyList) => {
        const currencyList = handleChangeMultipleSelected(this.state.currencyList, selectedCurrencyList);

        this.setState({ selectedCurrencyList, currencyList });
    }

    handleFormatMonthPicker = (month, year) => {
        return `${shortedMonthNames[month - 1]}-${year}`
    }

    handleSearch = (monthDate) => {
        const { selectedProduct, selectedBaseCurrency, selectedCurrencyList } = this.state;

        const param = {
            productId: selectedProduct,
            baseCurrencyId: selectedBaseCurrency,
            currencyIds: selectedCurrencyList,
            monthDate: `${monthDate.getMonth() + 1}/1/${monthDate.getFullYear()}`,
        }
        this.props.setParam(param);
        this.props.setSortingColumn(SortingColumnDefault);
    }

    handleExportExcel = async () => {
        const { selectedProduct, monthDate, selectedBaseCurrency, selectedCurrencyList } = this.state;
        const { affId, sortingColumn } = this.props;

        const param = {
            IsExportExcel: true,
            productId: selectedProduct,
            baseCurrencyId: selectedBaseCurrency,
            currencyIds: selectedCurrencyList,
            monthDate: `${monthDate.getMonth() + 1}/1/${monthDate.getFullYear()}`,
            affId,
            sortById: SortByIdList[sortingColumn.ColumnName],
            isSortAsc: sortingColumn.IsSortAsc
        }

        const data = await this.props.exportExcel(param);

        if (data) {
            const title = this._getReportTitle();
            const reportExcel = new ReportExcel(data, title);
            reportExcel.export();
        }
    }

    _getReportTitle() {
        const { baseCurrencyList } = this.props;
        const { selectedProduct, monthDate, selectedBaseCurrency } = this.state;
        const productTitle = selectedProduct === 0 ? 'All Products' : this._getSelectedProductName(selectedProduct);
        const selectedMonthTitle = this.handleFormatMonthPicker(monthDate.getMonth() + 1, monthDate.getFullYear());
        const currency = baseCurrencyList ? baseCurrencyList.filter(x => x.ExchangeId == selectedBaseCurrency) : [];

        return `Player Detail - Base Currency ${currency[0] && currency[0].Code} - ${productTitle} - ${selectedMonthTitle}`;
    }

    _getSelectedProductName(productId) {
        const selectedProduct = this.props.productList.find(p => p.ProductId === productId);

        return selectedProduct ? selectedProduct.ProductName : '';
    }

    render() {
        const { selectedProduct, selectedBaseCurrency, monthDate, currencyList } = this.state;
        const { productList, baseCurrencyList, isProduction } = this.props;

        return (
            <div className="filter-container">
                <Form inline tag="div">
                    <FormGroup className="mr-sm-2">
                        <Label className="mr-2">{globalResource.Product}</Label>
                        <Input type="select" name="Product" id="Product" value={selectedProduct} onChange={this.handleChangeProduct}>
                            <option value="0">{globalResource.All}</option>
                            {
                                productList && productList.map(p => {
                                    return (<option value={p.ProductId} key={p.ProductId}>{htmlDecode(p.ProductName)}</option>)
                                })
                            }
                        </Input>
                    </FormGroup>
                    {
                        baseCurrencyList && baseCurrencyList.length &&
                        <FormGroup className="mr-sm-2">
                            <Label className="mr-2">{globalResource.BaseCurrency}</Label>
                            <Input type="select" name="BaseCurrency" id="BaseCurrency" value={selectedBaseCurrency} onChange={this.handleChangeCurrency}>
                                {
                                    baseCurrencyList.map(c => {
                                        return (<option key={c.ExchangeId} value={c.ExchangeId}>{htmlDecode(c.Code)}</option>)
                                    })
                                }
                                {
                                    !isProduction && <option value="20">UUS</option>
                                }
                            </Input>
                        </FormGroup>
                    }
                    {
                        !isProduction && currencyList &&
                        <FormGroup className="mr-sm-2">
                            <Label for="Currency" className="mr-2">{globalResource.Currency}</Label>
                            <MultipleSelect
                                dataSource={currencyList}
                                keyField="key"
                                valueField="name"
                                statusField="checked"
                                maxDisplayItemCount={1}
                                noneSelectedLabel="None Select"
                                onChange={this.handleChangeCurrency} />
                        </FormGroup>
                    }

                    <FormGroup className="mr-sm-2">
                        <Label className="mr-sm-2">{resource.Month}</Label>
                        <MonthPicker minMonth={minMonthDate.month} minYear={minMonthDate.year}
                            selectedDropdownYear={monthDate.getFullYear()}
                            selectedMonth={monthDate.getMonth() + 1}
                            onSelect={this.handleSelectMonth}
                            onFormat={this.handleFormatMonthPicker}
                            iconElement={(<span className="oi oi-calendar icon-calendar ml-1"></span>)} />
                    </FormGroup>

                    <Button outline color="primary" type="button" onClick={() => this.handleSearch(monthDate)}>
                        <span className="oi oi-magnifying-glass"></span> {globalResource.Search}
                    </Button>

                    <Button color="link" type="button" className="ml-auto btn-excel" onClick={this.handleExportExcel} title="Export Excel">
                        <span className="oi icon-excel"></span>
                    </Button>
                </Form>
            </div>
        );
    }
}

function mapStateToProps({ today, affCommonInfo, playerDetail, productList, currencyList, baseCurrencyList, isProduction }) {
    const { param, sortingColumn } = playerDetail;
    const { affId } = affCommonInfo;

    return Object.assign({}, {
        param,
        affId,
        today,
        sortingColumn,
        productList, currencyList, baseCurrencyList, isProduction
    });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setParam, exportExcel, setSortingColumn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);