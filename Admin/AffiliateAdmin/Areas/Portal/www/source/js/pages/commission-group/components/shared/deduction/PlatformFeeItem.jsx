import React from "react";
import MultipleSelect from "../../../../../components/multiple-select";
import { Col, Form, FormGroup } from 'reactstrap';
import DeductedPercentageForm from './DeductedPercentageGroup';
import { ONLY_ONE_ITEM, GGR } from '../../../modules/constant';

export default class PlatformFeeItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (selectedItem) => {
        selectedItem && this.props.onSelectProduct(selectedItem);
    }

    handleChangeComm = (event) => {
        const { name, value } = event.target;
        this.props.onChangeCommission({ [name]: Number(value) });
    }

    render() {
        const { data, handleClick, btnText, isOnlyOnePlatformFeeRow, isFirst } = this.props;

        const { productList, commission } = data;
        const isValid = (isFirst && isOnlyOnePlatformFeeRow) || productList.filter(p => !p.Checked).length < productList.length;
        const isDisableAddButton = isFirst && productList.length === ONLY_ONE_ITEM;

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
                            hasInputOption={!isOnlyOnePlatformFeeRow}
                            maxDisplayItemCount={1}
                            noneSelectedLabel={isValid ? "None" : "Please Select"}
                            onChange={this.handleChange}
                            isDisable={isOnlyOnePlatformFeeRow} />
                    </div>
                </Col>
                <Col sm={7}>
                    <Form inline>
                        <DeductedPercentageForm
                            value={commission}
                            label={GGR}
                            onChange={this.handleChangeComm} />
                    </Form>
                </Col>
                <Col sm={1}>
                    <button type="button" className="btn btn-action" disabled={isDisableAddButton} onClick={handleClick}>{btnText}</button>
                </Col>
            </FormGroup>
        )
    }
}