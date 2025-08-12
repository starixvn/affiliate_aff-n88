import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { bindActionCreators } from 'redux';

import { setParam, setIsShowAddAffMktAccountPopup, setReportTitle } from '../actions';
import { allStatuses, globalResource, statusList, resource } from '../libs/constants';

export const Filter = (props) => {
    const { languageCodeList } = props;
    const [languageCode, setLanguageCode] = useState('');
    const [status, setStatus] = useState(allStatuses);
    const [userName, setUserName] = useState('');

    const _handlePressEnter = (event) => {
        if (event.charCode === 13) {
            event.preventDefault();

            _handleSearch();
        }
    }

    const _buildReportTitle = (selectedLanguage, selectedStatus, userName) => {
        const space = resource.Space;
        const apostrophe = resource.Apostrophe;
        const languageTitle = languageCodeList[selectedLanguage] || resource.AllLanguages;
        const statusTitle = statusList[selectedStatus] || resource.AllStatuses;
        
        const userNameTitle = userName && space + resource.UsernameContains + apostrophe + userName + apostrophe;
        
        return `${resource.ReportName}${space}${languageTitle.toUpperCase()}${space}${statusTitle.toUpperCase()}${userNameTitle || ''}`;
    };

    const _handleSearch = () => {
        const params = {
            "Status": "",
            "SortType": 1,
            "SortDirectionType": 1,
            "Language": "",
            "UserName": "",
            "PageIndex": 1,
            "PageSize": 20
        }

        const finalStatus = status === allStatuses ? '' : status;
        props.setReportTitle(_buildReportTitle(languageCode, finalStatus, userName));
        props.setParam({...params, Language: languageCode, Status: finalStatus, UserName: userName});
    };

    return (
        <div className="filter-container">
            <Form inline tag="div">
                <FormGroup className="mr-sm-2 my-2">
                    <Input type="select" name="language" id="language"
                        value={languageCode}
                        onChange={(e) => setLanguageCode(e.target.value)}>
                        <option value="">All Languages</option>
                        {
                            Object.keys(languageCodeList).map(key => {
                                return (<option key={`language-${key}`} value={key}>{languageCodeList[key]}</option>)
                            })
                        }
                    </Input>
                </FormGroup>
                <FormGroup className="my-sm-2 mr-sm-2">
                    <Input type="select" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                        {
                            Object.keys(statusList).map(key => {
                                return (<option key={`status-${key === allStatuses ? '' : key}`} value={key}>{statusList[key]}</option>)
                            })
                        }
                    </Input>
                </FormGroup>
                <FormGroup className="my-sm-1 mr-sm-2">
                    <Input type="text" name="affiliate" id="affiliate" maxLength="30"
                        onKeyPress={_handlePressEnter}
                        placeholder='Username'
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName} />
                </FormGroup>
                <FormGroup className="mr-sm-2 my-2">
                    <Button outline className="mr-sm-2" color="primary" type="button" onClick={_handleSearch}>
                        <span className="oi oi-magnifying-glass"></span> {globalResource.Search}
                    </Button>
                </FormGroup>
            </Form>
        </div>
    );
};

const mapStateToProps = ({ languageCodeList, targetCountryCodeList }) => {
    return {
        languageCodeList,
        targetCountryCodeList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setParam,
        setIsShowAddAffMktAccountPopup,
        setReportTitle,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Filter));