import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, FormGroup, Input, Label } from 'reactstrap';

import { globalResource, defaultBaseCurrency } from '../libs/constants';
import { setParam } from '../actions';
import { htmlDecode } from '../../../../modules/htmlHelper';

export class Filter extends PureComponent {
    constructor(props) {
        super(props);

        const { currencyList } = this.props;

        this.state = {
            selectedCurrency: (currencyList && currencyList.length && currencyList[0].ExchangeId) || defaultBaseCurrency
        }
    }

    componentDidMount() {
        this.handleSetParam();
    }

    handleChangeCurrency = (event) => {
        const selectedCurrency = Number(event.target.value);
        this.setState({ selectedCurrency }, this.handleSetParam);
    }

    handleSetParam() {
        const { selectedCurrency } = this.state;
        const param = Object.assign(this.props.param, { currencyId: selectedCurrency });
        this.props.setParam(param);
    }

    render() {
        const { selectedCurrency } = this.state;
        const { currencyList } = this.props;

        return (
            <div className="filter-container">
                <Form inline tag="div">
                    {
                        currencyList && currencyList.length &&
                        <FormGroup className="mr-sm-2">
                            <Label className="mr-2">{globalResource.BaseCurrency}</Label>
                            <Input type="select" name="Product" id="Product" value={selectedCurrency} onChange={this.handleChangeCurrency}>
                                {
                                    currencyList.map(c => {
                                        return (<option key={c.ExchangeId} value={c.ExchangeId}>{htmlDecode(c.Code)}</option>)
                                    })
                                }
                            </Input>
                        </FormGroup>
                    }
                </Form>
            </div>
        );
    }
}

function mapStateToProps({ subAffiliate }) {
    const { param } = subAffiliate;
    return Object.assign({}, { param });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setParam }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);