import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSelectedGroup, setSelectedProductIds } from '../../actions';
import { Col, FormGroup } from 'reactstrap';
import MultipleSelect from '../../../../components/multiple-select';
import { convertProductList, convertStringToArrayNumber } from '../../modules/service';

function ProductList(props) {
    const { productList, selectedProductIds, selectedGroup } = props
    const selectedProducts = convertProductList(productList, selectedProductIds)

    const handleChange = (selectedItem, selectedItemsKey) => {
        const selectedIds = convertStringToArrayNumber(selectedItemsKey);
        const platformFeeList = selectedGroup.PlatformFeeList;
        updatePlatfromFeeList(selectedIds, platformFeeList);
        props.setSelectedProductIds(selectedIds);
    }

    const updatePlatfromFeeList = (ids, platformFeeList) => {
        const feeIdListInArrayForm = platformFeeList.map(fee => convertStringToArrayNumber(fee.ProductIds));
        const newFeeListIds = getPlatformFeeListIds(ids, feeIdListInArrayForm);
        const newPlatformFeeList = [];
        newFeeListIds.forEach((ids, index) => {
            const platformFee = platformFeeList[index];
            const newplatformFee = Object.assign({}, platformFee, {ProductIds: ids.join(',')} )
            newPlatformFeeList.push(newplatformFee);
        })
        props.setSelectedGroup({PlatformFeeList: newPlatformFeeList}); 
    }

    const getPlatformFeeListIds = (curSelProductIds, prePlatformFeeIds) => {
        const preSelProductIds = prePlatformFeeIds.reduce((acc, cur, []) => acc.push(cur));
        const additionIds = getAdditionId(curSelProductIds, preSelProductIds);
        const platformFeeIdsAfterRemoveProduct = removeUnCheckedProductId(curSelProductIds, prePlatformFeeIds);
        const firstPlatformFeeProductIds = platformFeeIdsAfterRemoveProduct[0];
        firstPlatformFeeProductIds.push(additionIds);
        return [firstPlatformFeeProductIds, ...platformFeeIdsAfterRemoveProduct.slice(1)]
    }

    const getAdditionId = (curIds, preSelIds) => {
        return curIds.filter(i => !preSelIds.find(t => t === i))
    }

    const removeUnCheckedProductId = (curSelIds, preListIds) => {
        console.log(curSelIds);
        console.log(preListIds);
        const newList = [];
        preListIds.forEach(list => {
            newList.push(list.filter(i => !!curSelIds.find(p => p===i)));
        })
        return newList;
    }

    return (
        <fieldset>
            <legend><h6 className="font-weight-bold">Products</h6></legend>
            <FormGroup row className="align-items-center">
                <Col sm={4}>
                    <MultipleSelect
                        dataSource={selectedProducts}
                        keyField="ProductId"
                        valueField="ProductName"
                        statusField="Checked"
                        hasAllOption={false}
                        hasInputOption={true}
                        maxDisplayItemCount={1}
                        noneSelectedLabel="Please Select"
                        onChange={handleChange}
                        isDisable={false} />
                </Col>
                <Col sm={8}>Selected products are counted in the Gross Win Loss to calculate affiliate commission</Col>
            </FormGroup>
        </fieldset>
    )
}

function mapStateToProp({ productList, selectedProductIds, selectedGroup }) {
    return { productList, selectedProductIds, selectedGroup };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSelectedGroup, setSelectedProductIds }, dispatch);
}

export default connect(mapStateToProp, mapDispatchToProps)(ProductList);
