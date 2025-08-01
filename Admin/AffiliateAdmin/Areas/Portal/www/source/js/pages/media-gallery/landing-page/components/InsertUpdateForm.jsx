import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MultipleSelect from '../../../../components/multiple-select';

import { Col, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Alert, FormFeedback } from 'reactstrap';
import { setSelectedLandingPageId, getLandingPageDetail, fetchData, insertLandingPage, updateLandingPage, toggleLoader, getTargetCountryListByLandingPage } from '../actions/index';
import { defaultState, headerText, globalResource, messages, restrictedCharactersPattern, maxLength } from '../libs/constants';
import { defaultInsertId } from '../../common/libs/constants';
import { handleChangeMultipleSelected } from '../../../../modules/utils';
import { getBlockTargetCountryList } from '../../../common/modules/utils/targetcountry';
import { htmlDecode } from '../../../../modules/htmlHelper';

export class InsertUpdateForm extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            ...defaultState
        }
    }

    componentDidMount() {
        const { gridData } = this.props;

        !gridData && this.props.fetchData();
    }

    componentDidUpdate(prevProps) {
        const { selectedLandingPageId } = this.props;
        if (selectedLandingPageId !== null && prevProps.selectedLandingPageId !== selectedLandingPageId) {
            this.setState({ isInsert: selectedLandingPageId === defaultInsertId });

            this._handleUpdateState(selectedLandingPageId);
        }
    }

    _handleUpdateState = async (pageId) => {
        this.props.toggleLoader(true);
        const targetCountryList = await this.props.getTargetCountryListByLandingPage({ pageId });

        if (pageId === 0) {
            this.setState({
                isInsert: true,
                selectedLandingPage: { pageName: '', pageCode: '', blockTargetCountry: '' },
                targetCountryList
            });
        } else {
            const landingPage = await this.props.getLandingPageDetail(pageId);

            if (landingPage) {
                const pageName = htmlDecode(landingPage.PageName);
                const pageCode = htmlDecode(landingPage.PageCode);

                if (targetCountryList && targetCountryList.length) {
                    const blockTargetCountryList = getBlockTargetCountryList(targetCountryList);

                    this.setState({
                        isInsert: false,
                        selectedLandingPage: { pageName, pageCode, blockTargetCountry: blockTargetCountryList.join(',') },
                        targetCountryList
                    });
                } else {
                    this.setState({ isInsert: false, selectedLandingPage: { pageName, pageCode, blockTargetCountry: '' } });
                }
            }
        }

        this.props.toggleLoader(false);
    }

    _handleChange = (event) => {
        const { name, value } = event.target;
        const { selectedLandingPage } = this.state;
        const newPage = { ...selectedLandingPage, [name]: value };

        this.setState({ selectedLandingPage: newPage });
    }

    _handleChangeTargetCountry = (item, selectedItem) => {
        const { selectedLandingPage, targetCountryList } = this.state;
        const newPage = { ...selectedLandingPage, blockTargetCountry: selectedItem };

        this.setState({ selectedLandingPage: newPage, targetCountryList: handleChangeMultipleSelected(targetCountryList, selectedItem) });

    }

    _validatePageCode() {
        const { pageCode } = this.state.selectedLandingPage;
        const hasRestrictedCharacter = restrictedCharactersPattern.test(pageCode);
        const result = {
            isValid: !!pageCode && !hasRestrictedCharacter && pageCode.length <= maxLength,
            message: ''
        }

        if (!result.isValid) {
            result.message = !pageCode ? messages.requiredErrorMessage :
                (hasRestrictedCharacter ?
                    'Special characters are not allowed' :
                    messages.maxLengthErrorMessage);
        }

        return result;
    }

    _validatePageName() {
        const { pageName } = this.state.selectedLandingPage;

        const result = {
            isValid: !!pageName && pageName.length <= maxLength,
            message: ''
        }

        if (!result.isValid) {
            result.message = !pageName ? messages.requiredErrorMessage : messages.maxLengthErrorMessage;
        }

        return result;
    }

    _handleSubmit = async (isValid) => {
        this.props.toggleLoader(true);
        this.setState({ isClickedSubmit: true });

        if (isValid) {
            const { selectedLandingPage, isInsert } = this.state;
            const { selectedLandingPageId } = this.props;
            const message = isInsert ? "Add Successfully!" : "Update Successfully!";
            const landingPageInfo = Object.assign({}, { pageId: selectedLandingPageId, ...selectedLandingPage });
            const result = isInsert ? await this.props.insertLandingPage(landingPageInfo) : await this.props.updateLandingPage(landingPageInfo);

            if (result) {
                this._handleShowAlert(result.IsSuccessful, result.IsSuccessful ? message : result.Message);
            } else {
                this._handleShowAlert(false, isInsert ? "Add Failed!" : "Update Failed!");
            }
        }

        this.props.toggleLoader(false);
    }

    _handleKeyPress = (event, isValid) => {
        if (event.charCode === 13) {
            event.preventDefault();
            this._handleSubmit(isValid);
        }
    }

    _handleShowAlert = (isSuccess, message) => {
        this.setState({
            message,
            isSuccess,
            isShowMessage: true,
        }, () => window.setTimeout(() => this._hideMessage(isSuccess), 3000));
    }

    _hideMessage = (isSuccess) => {
        this.setState({
            isShowMessage: false
        });

        if (isSuccess) {
            this.props.fetchData();
            this._handleClosePopup();
        }
    }

    _handleClosePopup = () => {
        this.props.setSelectedLandingPageId(null);

        this.setState({ ...defaultState });
    }

    render() {
        const { selectedLandingPage, isShowMessage, isSuccess, message, isInsert, isClickedSubmit, targetCountryList } = this.state;
        const pageNameValidation = this._validatePageName();
        const pageCodeValidation = this._validatePageCode();
        const isValid = pageNameValidation.isValid && pageCodeValidation.isValid;
        const isShowPopup = this.props.selectedLandingPageId !== null;
        const title = isInsert ? "Add Landing Page" : "Edit Landing Page";

        return (
            <Modal isOpen={isShowPopup} toggle={this._handleClosePopup} backdrop='static'>
                <ModalHeader toggle={this._handleClosePopup}><span className="iconpopup"></span>{title}</ModalHeader>
                <ModalBody>
                    <div className="modal-body-wrapper">
                        <div className="landing-page-form-container">
                            <Alert color={isSuccess ? 'success' : 'danger'} isOpen={isShowMessage}>
                                <div dangerouslySetInnerHTML={{ __html: message }}></div>
                            </Alert>
                            <Form tag="form" className="mb-5" autoComplete="off">
                                <FormGroup row className="mb-2">
                                    <Label htmlFor="pageName" sm={7} className="required">{headerText.LandingPageName}</Label>
                                    <Col sm={5}>
                                        <Input type="text" name="pageName" className="input-required mt-2" value={selectedLandingPage.pageName} onChange={this._handleChange}
                                            onKeyPress={(e) => this._handleKeyPress(e, isValid)} invalid={isClickedSubmit && !pageNameValidation.isValid} />
                                        {pageNameValidation.message &&
                                            <FormFeedback><div dangerouslySetInnerHTML={{ __html: pageNameValidation.message }} /></FormFeedback>}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="pageCode" sm={7} className="required">{headerText.LandingPageCode}</Label>
                                    <Col sm={5}>
                                        <Input type="text" name="pageCode" className="input-required mt-2" value={selectedLandingPage.pageCode} onChange={this._handleChange}
                                            onKeyPress={(e) => this._handleKeyPress(e, isValid)} invalid={isClickedSubmit && !pageCodeValidation.isValid} />
                                        {pageCodeValidation.message &&
                                            <FormFeedback><div dangerouslySetInnerHTML={{ __html: pageCodeValidation.message }} /></FormFeedback>}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="blockTargetCountry" sm={7}>{headerText.BlockTargetCountry}</Label>
                                    <Col sm={5}>
                                        {
                                            targetCountryList && <MultipleSelect
                                                dataSource={targetCountryList}
                                                keyField="key"
                                                valueField="name"
                                                statusField="checked"
                                                maxDisplayItemCount={1}
                                                noneSelectedLabel="None Select"
                                                selectedAllLabel="All"
                                                onChange={this._handleChangeTargetCountry} />
                                        }
                                    </Col>
                                </FormGroup>
                            </Form>

                            <Button type="button" color="success" className="mr-3" disabled={isClickedSubmit ? !isValid : false} onClick={() => this._handleSubmit(isValid)} >Submit</Button>
                            <Button type="button" color="info" onClick={this._handleClosePopup}>{globalResource.Cancel}</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}

function mapStateToProps({ selectedLandingPageId }) {
    return Object.assign({}, { selectedLandingPageId });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSelectedLandingPageId, getLandingPageDetail, fetchData, insertLandingPage, updateLandingPage, toggleLoader, getTargetCountryListByLandingPage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InsertUpdateForm);