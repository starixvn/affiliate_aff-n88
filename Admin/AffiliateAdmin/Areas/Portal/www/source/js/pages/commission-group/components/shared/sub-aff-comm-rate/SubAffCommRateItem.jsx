import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { Col, FormGroup, Label, Form } from 'reactstrap';
import { subAffCommValueList } from '../../../modules/constant';
import { format } from '../../../../../modules/numberFormat';

export default class SubAffCommRateItem extends PureComponent {
    constructor(props) {
        super(props);
    }

    handleChangeComm = (event) => {
        const { name, value } = event.target;
        this.props.onChangeCommission({ [name]: Number(value) });
    }

    render() {
        const { lblText, data } = this.props;

        return (
            <FormGroup row className="align-items-center">
                <Col sm={3}>
                    <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label>{lblText}</Label>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <select name="SubAffComm" className="form-control"
                                value={format(data || 0, 3)}
                                onChange={this.handleChangeComm} style={{ width: 70 }}>
                                {
                                    Object.keys(subAffCommValueList).map((key, i) => {
                                        return (<option key={`sub-aff-fixed-rate-${i}`} value={key}>{subAffCommValueList[key]}</option>);
                                    })
                                }
                            </select>
                        </FormGroup>
                    </Form>
                </Col>
            </FormGroup>
        )
    }
}

SubAffCommRateItem.propTypes = {
    data: PropTypes.number.isRequired,
    onChangeCommission: PropTypes.func.isRequired,
    lblText: PropTypes.string
};

SubAffCommRateItem.defaultProps = {
    lblText: 'Fixed Rate'
};