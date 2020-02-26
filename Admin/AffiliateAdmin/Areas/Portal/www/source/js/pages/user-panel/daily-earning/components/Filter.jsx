import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, FormGroup, Input, Label } from 'reactstrap';

import { setParam, getProductList, getCurrencyList } from '../actions';
import { selectedAllProduct, globalResource, resource  } from '../modules/constants';
import { htmlDecode } from '../../../../modules/htmlHelper';

export class Filter extends PureComponent {
    constructor(props) {
        super(props);

        const { param } = this.props;

        this.state = {
            selectedProduct: param.productId || selectedAllProduct,
            selectedCurrency: resource.AllCurrency,
            productList: [],
            currencyList: [],
        }
    }

    componentDidMount() {
        this._fetchProductList();
        this._fetchCurrencyList();
        this.handleSetParam(this.state.selectedProduct);
    }

    async _fetchProductList() {
        const productList = await this.props.getProductList();
        this.setState({ productList });
    }

    async _fetchCurrencyList() {
        const currencyList = await this.props.getCurrencyList();
        this.setState({ currencyList });
    }
    

    handleChangeProduct = (event) => {
        const selectedProduct = Number(event.target.value);
        const handleSetParam = this.handleSetParam;
        this.setState({ selectedProduct }, handleSetParam);
    }

    handleChangeCurrency = (event) =>{
        const selectedCurrency = Number(event.target.value);
        const handleSetParam = this.handleSetParam;
        this.setState({ selectedCurrency }, handleSetParam);
    }
    

    handleSetParam() {
        const {selectedProduct, selectedCurrency} = this.state;
        const param = Object.assign(this.props.param, { productId: selectedProduct, currencyId: selectedCurrency });
        this.props.setParam(param);
    }

    render() {
        const { productList, selectedProduct, currencyList, selectedCurrency } = this.state;

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
                        </Input>
                    </FormGroup>
                    <FormGroup className="mr-sm-2">
                        <Label className="mr-2">{globalResource.Currency}</Label>
                        <Input type="select" name="Currrency" id="Currrency" value={selectedCurrency} onChange={this.handleChangeCurrency}>
                             <option value="0">{globalResource.All}</option>
                            {
                                currencyList && currencyList.map(c => {
                                    return (<option key={c.ExchangeId} value={c.ExchangeId}>{htmlDecode(c.Code)}</option>)
                                })
                            }
                        </Input>
                    </FormGroup>
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
    return bindActionCreators({ setParam, getProductList, getCurrencyList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);