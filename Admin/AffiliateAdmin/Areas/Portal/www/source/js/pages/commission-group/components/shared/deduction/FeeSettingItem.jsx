import React from 'react';

import { Col, FormGroup, Label, Input, Form } from 'reactstrap';
import { formatDecimal } from '../../../../../modules/numberFormat';
import { commissionValueList } from '../../../modules/constant';

export default class FeeSettingItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChangeComm = (event) => {
        const { name, value } = event.target;
        this.props.onChangeCommission({ [name]: Number(value) });
    }

    render() {
        const { label, data, basedValueName, isCreating } = this.props;
        return (
            <FormGroup row>
                <Label sm={4} className="font-weight-bold">{label}</Label>
                <Col sm={5} className="select-comm">
                    <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label className="mr-sm-2">New Revenue Share </Label>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Input type="select" name="DeductedPercentage" className="form-control"
                                defaultValue={formatDecimal((data && data.DeductedPercentage) || 0)}
                                onChange={this.handleChangeComm} style={{ width: 60 }}>
                                {
                                    commissionValueList.map((item, i) => {
                                        return (<option key={`operational-fee-comm-${i}`} value={item}>{item}</option>);
                                    })
                                }
                            </Input>
                        </FormGroup>
                    </Form>
                </Col>
                <Col sm={3}>
                    <Input plaintext tag="p">{basedValueName}</Input>
                </Col>
            </FormGroup>
        )
    }
}