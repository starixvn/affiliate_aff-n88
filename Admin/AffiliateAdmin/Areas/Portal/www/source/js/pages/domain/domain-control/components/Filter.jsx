import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { setSelectedTargetCountry, fetchData } from '../actions';
import { headerText, globalResource } from '../libs/constants';

export const Filter = (props) => {
    const { targetCountryList } = props;
    const [targetCountry, setTargetCountry] = useState('');

    const _handleSearch = () => {
        props.setSelectedTargetCountry(targetCountry);
        props.fetchData(targetCountry);
    }

    return targetCountryList && (
        <div className="filter-container my-2">
            <Form inline tag="div">
                <FormGroup className="mr-sm-2">
                    <Label htmlFor="targetCountry" className="mr-sm-2">{headerText.TargetCountry}</Label>
                    <Input type="select" name="targetCountry" value={targetCountry} onChange={(e) => setTargetCountry(e.target.value)}>
                        <option key={'targetCountry-all'} value={''}>{globalResource.All}</option>
                        {
                            targetCountryList.map(item => (
                                <option key={`targetCountry-${item.TargetCountryCode}`} value={item.TargetCountryCode}>{item.TargetCountryName}</option>)
                            )
                        }
                    </Input>
                </FormGroup>
                <Button outline color="primary" type="button" onClick={_handleSearch}>
                    <span className="oi oi-magnifying-glass"></span> {globalResource.Search}
                </Button>
            </Form>
        </div>
    )
}

function mapStateToProps({ targetCountryList }) {
    return Object.assign({}, { targetCountryList });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSelectedTargetCountry, fetchData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Filter));