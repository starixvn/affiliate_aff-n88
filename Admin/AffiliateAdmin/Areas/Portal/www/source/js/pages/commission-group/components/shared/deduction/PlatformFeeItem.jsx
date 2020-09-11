import React from "react";
import MultipleSelect from "../../../../../components/multiple-select";
import { Col, FormGroup, Input, Label, Form } from 'reactstrap';
import { commissionValueList } from '../../../modules/constant';
import { format } from '../../../../../modules/numberFormat';

export default class PlatformFeeItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (selectedItem) => {
        const { onSelectProduct } = this.props;
        selectedItem && onSelectProduct && onSelectProduct(selectedItem);
    }

    handleChangeComm = (event) => {
        const { name, value } = event.target;
        this.props.onChangeCommission({ [name]: Number(value) });
    }

    render() {
        const { data, handleClick, btnText, isDisable } = this.props;

        const { productList, commission } = data;
        const isValid = productList.filter(p => !p.Checked).length < productList.length;

        return (
            <FormGroup row className="align-items-center">
                <Col sm={4}>
                    <div className={`select-product ${isValid ? "" : "is-invalid"}`}>
                        <MultipleSelect
                            dataSource={productList}
                            keyField="ProductId"
                            valueField="ProductName"
                            statusField="Checked"
                            hasAllOption={false}
                            hasInputOption={!isDisable}
                            maxDisplayItemCount={1}
                            noneSelectedLabel="Please Select"
                            onChange={this.handleChange}
                            isDisable={isDisable} />
                    </div>
                </Col>
                <Col sm={5} className="select-comm">
                    <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label className="mr-sm-2">New Revenue Share </Label>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <select name="DeductedPercentage" className="form-control"
                                value={format(commission || 0, 3)}
                                onChange={this.handleChangeComm} style={{ width: 70 }}>
                                {
                                    Object.keys(commissionValueList).map((key, i) => {
                                        return (<option key={`platformfee-comm-${i}`} value={key}>{commissionValueList[key]}</option>);
                                    })
                                }
                            </select>
                        </FormGroup>
                    </Form>
                </Col>
                <Col sm={2}>
                    <Input plaintext tag="p">| Gross Win Loss |</Input>
                </Col>
                <Col sm={1}>
                    <button type="button" className="btn btn-action" onClick={handleClick}>{btnText}</button>
                </Col>
            </FormGroup>
        )
    }
}