import React from 'react';

import { Col, FormGroup, Label, Input } from 'reactstrap';

export default class RateSetting extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (value) => {
        this.props.handleChange({ IsDeductedRate: value });
    }

    render() {
        const { isDeductedRate  } = this.props;

        return (
            <FormGroup row className="pt-3">
                <Col sm={5}>
                    <FormGroup check className="d-inline-block mr-5">
                        <Label check>
                            <Input type="radio" checked={isDeductedRate} onChange={() => this.handleChange(true)} />{' '} Rate
                        </Label>
                    </FormGroup>
                    <FormGroup check className="d-inline-block">
                        <Label check>
                            <Input type="radio" checked={!isDeductedRate} onChange={() => this.handleChange(false)} />{' '} Fixed Amount
                        </Label>
                    </FormGroup>
                </Col>
            </FormGroup>
        )
    }
}