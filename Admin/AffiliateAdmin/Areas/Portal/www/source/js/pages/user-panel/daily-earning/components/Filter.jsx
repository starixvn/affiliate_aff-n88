import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, FormGroup, Input, Label } from 'reactstrap';

import { setParam } from '../actions';
import { selectedAllProduct, globalResource, defaultBaseCurrency } from '../modules/constants';
import { htmlDecode } from '../../../../modules/htmlHelper';

export class Filter extends PureComponent {
    constructor(props) {
        super(props);

        const { param, baseCurrencyList } = this.props;

        this.state = {
            selectedProduct: param.productId || selectedAllProduct,
            selectedBaseCurrency: param.currencyId || (baseCurrencyList && baseCurrencyList.length && baseCurrencyList[0].ExchangeId) || defaultBaseCurrency,
            selectedCurrencyList: param.currencyIds || ''
        }
    }

    handleChangeProduct = (event) => {
        const selectedProduct = Number(event.target.value);
        this.setState({ selectedProduct }, this.handleSetParam);
    }

    handleChangeBaseCurrency = (event) => {
        const selectedBaseCurrency = Number(event.target.value);
        this.setState({ selectedBaseCurrency }, this.handleSetParam);
    }

    handleChangeCurrency = (item, selectedCurrencyList) => {
        this.setState({ selectedCurrencyList });
    }

    handleSetParam() {
        const { selectedProduct, selectedBaseCurrency, selectedCurrencyList } = this.state;
        const param = Object.assign(this.props.param, { productId: selectedProduct, baseCurrencyId: selectedBaseCurrency, currencyIds: selectedCurrencyList });
        this.props.setParam(param);
    }

    render() {
        const { selectedProduct, selectedBaseCurrency } = this.state;
        const { productList, currencyList, baseCurrencyList, isProduction } = this.props;

        return (
            <div className="filter-container">
                <Form inline tag="div">
                    <FormGroup className="mr-sm-2">
                        <Label className="mr-2">{globalResource.Product}</Label>
                        <Input type="select" name="Product" id="Product" value={selectedProduct} onChange={this.handleChangeProduct}>
                            <option value="0">{globalResource.All}</option>
                            {
                                productList.map(p => {
                                    return (<option key={`product-${p.ProductId}`} value={p.ProductId}>{htmlDecode(p.ProductName)}</option>)
                                })
                            }
                            {
                                !isProduction && <option value="20">UUS</option>
                            }
                        </Input>
                    </FormGroup>
                    {
                        baseCurrencyList && baseCurrencyList.length &&
                        <FormGroup className="mr-sm-2">
                            <Label className="mr-2">{globalResource.BaseCurrency}</Label>
                            <Input type="select" name="Currrency" id="Currrency" value={selectedBaseCurrency} onChange={this.handleChangeCurrency}>
                                {
                                    baseCurrencyList.map(c => {
                                        return (<option key={c.ExchangeId} value={c.ExchangeId}>{htmlDecode(c.Code)}</option>)
                                    })
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
                </Form>
            </div>
        );
    }
}

function mapStateToProps({ dailyEarning }) {
    const { param } = dailyEarning;
    return Object.assign({}, { param });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setParam }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);