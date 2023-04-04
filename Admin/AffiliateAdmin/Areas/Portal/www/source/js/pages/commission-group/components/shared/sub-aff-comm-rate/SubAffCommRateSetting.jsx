import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSelectedGroup } from '../../../actions';

import SubAffCommRateItem from "./SubAffCommRateItem";

export class SubAffCommRateSetting extends PureComponent {
    constructor(props) {
        super(props);

        this.defaultItem = {
            subAffComm: 0.1
        }
    }

    handleChangeCommission = (subAffComm) => {
        this.props.setSelectedGroup({ SubAffComm: subAffComm });
    }

    render() {
        const { selectedGroup } = this.props;

        return (
            <fieldset className="p2p-product-group">
                <legend><h6 className="font-weight-bold">Sub-Affiliates Comm Rate</h6></legend>
                <SubAffCommRateItem
                    data={selectedGroup.SubAffComm}
                    onChangeCommission={(value) => this.handleChangeCommission(value)}
                />
            </fieldset>
        )
    }
}

function mapStateToProp({ selectedGroup }) {
    return { selectedGroup };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSelectedGroup }, dispatch);
}

export default connect(mapStateToProp, mapDispatchToProps)(SubAffCommRateSetting);