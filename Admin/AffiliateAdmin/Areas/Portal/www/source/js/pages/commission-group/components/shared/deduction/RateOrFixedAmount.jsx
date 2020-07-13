import React from 'react';

import { Col, FormGroup, Label, Input, Form } from 'reactstrap';
import { formatDecimal } from '../../../../../modules/numberFormat';

export default class RateOrFixedAmount extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (value) => {
        this.props.handleChange(value);
    }

    render() {
        const { isSelectedRate } = this.props;

        return (
            <FormGroup row>
                <Col sm={5}>
                    <FormGroup check className="d-inline-block mr-5">
                        <Label check>
                            <Input type="radio" checked={isSelectedRate} onChange={() => this.handleChange(true)} />{' '} Rate
                        </Label>
                    </FormGroup>
                    <FormGroup check className="d-inline-block">
                        <Label check>
                            <Input type="radio" checked={!isSelectedRate} onChange={() => this.handleChange(false)} />{' '} Fixed Amount
                        </Label>
                    </FormGroup>
                </Col>
            </FormGroup>
        )
    }
}