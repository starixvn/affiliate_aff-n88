import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Col, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Alert } from 'reactstrap';
import { insertDomain, updateDomain, toggleLoader, fetchData, setSelectedDomainId, getDomainControlById } from '../actions/index';
import { getDomainList } from '../../domain/actions/index';
import Select from '../../../../components/select';
import { defaultState } from '../libs/constants';

export class DomainControlPopup extends PureComponent {
    constructor(props) {
        super(props)

        this.state = defaultState;
    }

    componentDidUpdate(prevProps) {
        const { selectedDomainId } = this.props;
        if (selectedDomainId != null && prevProps.selectedDomainId !== selectedDomainId) {
            this._handleUpdateState(selectedDomainId);
        }
    }

    _handleUpdateState = async (selectedDomainId) => {
        this.props.toggleLoader(true);

        try {
            if (selectedDomainId === 0) {
                await this._handleInsertDomain(selectedDomainId);
            } else {
                await this._handleUpdateDomain(selectedDomainId);
            }
        } finally {
            this.props.toggleLoader(false);
        }
    }

    _handleInsertDomain = async (selectedDomainId) => {
        const { targetCountryList } = this.props;
        const targetCountryCode = targetCountryList.length ? targetCountryList[0].TargetCountryCode : "";

        await this._fetchDomainLists(targetCountryCode);

        const affDomainId = this.state.affDomainList[0]?.DomainId;
        const redirectDomainId = this.state.redirectDomainList[0]?.DomainId;

        this.setState({
            isInsert: true,
            selectedDomain: { domainControlId: selectedDomainId, affDomainId, redirectDomainId, targetCountryCode, isUsed: true }
        });
    }

    _handleUpdateDomain = async (selectedDomainId) => {
        const domain = await this.props.getDomainControlById(selectedDomainId);

        if (!domain) {
            this.props.setSelectedDomainId(null);
            return;
        }

        const { AffDomainId, RedirectDomainId, TargetCountryCode, IsUsed } = domain;

        await this._fetchDomainLists(TargetCountryCode);

        this.setState({
            isInsert: false,
            selectedDomain: {
                domainControlId: selectedDomainId,
                affDomainId: AffDomainId,
                redirectDomainId: RedirectDomainId,
                targetCountryCode: TargetCountryCode,
                isUsed: IsUsed
            }
        });
    }

    _handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        const { selectedDomain } = this.state;

        const newDomain = Object.assign({}, selectedDomain, { [target.name]: value });

        this.setState({ selectedDomain: newDomain });
    }

    _handleChangeAffDomain = (selectedDomainId) => {
        const { selectedDomain } = this.state;
        const newDomain = Object.assign({}, selectedDomain, { "affDomainId": selectedDomainId });

        this.setState({ selectedDomain: { ...newDomain } });
    }

    _handleChangeRedirectDomain = (selectedDomainId) => {
        const { selectedDomain } = this.state;
        const newDomain = Object.assign({}, selectedDomain, { "redirectDomainId": selectedDomainId });

        this.setState({ selectedDomain: { ...newDomain } });
    }

    _fetchDomainLists = async (countryCode) => {
        const affDomainList = await getDomainList(true, countryCode);
        const redirectDomainList = await getDomainList(false, countryCode);

        this.setState({ affDomainList, redirectDomainList });
    }

    _handleChangeTargetCountry = async (event) => {
        this.props.toggleLoader(true);

        const { value } = event.target;
        const { selectedDomain } = this.state;

        await this._fetchDomainLists(value);

        const affDomainId = this.state.affDomainList[0]?.DomainId;
        const redirectDomainId = this.state.redirectDomainList[0]?.DomainId;

        const newDomain = Object.assign({}, selectedDomain, {
            targetCountryCode: value,
            affDomainId,
            redirectDomainId
        });

        this.setState({ selectedDomain: newDomain });
        this.props.toggleLoader(false);
    }

    _handleSubmit = async () => {
        this.props.toggleLoader(true);

        const { isInsert, selectedDomain } = this.state;
        const message = isInsert ? "Add Successfully!" : "Update Successfully!";

        const result = isInsert ? await this.props.insertDomain(selectedDomain) : await this.props.updateDomain(selectedDomain);

        if (result) {
            this._handleShowAlert(result.IsSuccessful, result.IsSuccessful ? message : result.Message);
        } else {
            this._handleShowAlert(false, isInsert ? "Add Domain is failed!" : "Update Domain is failed!");
        }

        this.props.toggleLoader(false);
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
            this.props.fetchData(this.props.selectedTargetCountry);
            this._handleClosePopup();
        }
    }

    _handleClosePopup = () => {
        this.props.setSelectedDomainId(null);
        this.setState(defaultState);
    }

    render() {
        const { selectedDomainId, targetCountryList } = this.props;
        const { isInsert, isSuccess, isShowMessage, message, selectedDomain, affDomainList, redirectDomainList } = this.state;
        const isShowPopup = selectedDomainId !== null;
        const title = isInsert ? "Add New Domain Control" : "Edit Domain Control";
        const buttonLabel = isInsert ? "Add" : "Submit";

        return selectedDomain && (
            <Modal isOpen={isShowPopup} toggle={this._handleClosePopup} backdrop='static'>
                <ModalHeader toggle={this._handleClosePopup}><span className="iconpopup"></span>{title}</ModalHeader>
                <ModalBody>
                    <div className="modal-body-wrapper">
                        <div className="domain-form-container">
                            <Alert color={isSuccess ? 'success' : 'danger'} isOpen={isShowMessage}>
                                <div dangerouslySetInnerHTML={{ __html: message }}></div>
                            </Alert>
                            <Form tag="form" className="mb-5" autoComplete="off">
                                <FormGroup row className="align-items-center mb-2">
                                    <Label htmlFor="targetCountryCode" sm={4}>Target Country</Label>
                                    <Col sm={8}>
                                        <Input type="select" name="targetCountryCode" className="mt-1" value={selectedDomain.targetCountryCode} onChange={this._handleChangeTargetCountry}>
                                            {
                                                targetCountryList.map(item => {
                                                    return (<option key={`targetCountryCode-${item.TargetCountryCode}`} value={item.TargetCountryCode}>{item.TargetCountryName}</option>)
                                                })
                                            }
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="align-items-center mb-2">
                                    <Label htmlFor="affDomainId" sm={4}>Aff Domain</Label>
                                    <Col sm={8}>
                                        <Select
                                            key={selectedDomain.targetCountryCode}
                                            id="affDomain"
                                            dataSource={affDomainList}
                                            keyField="DomainId"
                                            valueField="DomainName"
                                            hasInputOption={true}
                                            selectedKey={selectedDomain.affDomainId}
                                            onChange={this._handleChangeAffDomain} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="align-items-center mb-2">
                                    <Label htmlFor="redirectDomainId" sm={4}>Redirect Domain</Label>
                                    <Col sm={8}>
                                        <Select
                                            key={selectedDomain.targetCountryCode}
                                            id="redirectDomain"
                                            dataSource={redirectDomainList}
                                            keyField="DomainId"
                                            valueField="DomainName"
                                            hasInputOption={true}
                                            selectedKey={selectedDomain.redirectDomainId}
                                            onChange={this._handleChangeRedirectDomain} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="mb-2">
                                    <Label sm={4}>Status</Label>
                                    <Col sm={8}>
                                        <input type="checkbox" className="mt-2" name="isUsed" checked={selectedDomain.isUsed} onChange={this._handleChange} />
                                    </Col>
                                </FormGroup>
                            </Form>

                            <Button type="button" color="success" className="mr-3" onClick={this._handleSubmit}>{buttonLabel}</Button>
                            <Button type="button" color="info" onClick={this._handleClosePopup}>Cancel</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}

function mapStateToProps({ selectedDomainId, selectedTargetCountry, targetCountryList }) {
    return Object.assign({}, { selectedDomainId, selectedTargetCountry, targetCountryList });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ insertDomain, updateDomain, toggleLoader, fetchData, setSelectedDomainId, getDomainControlById }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DomainControlPopup);