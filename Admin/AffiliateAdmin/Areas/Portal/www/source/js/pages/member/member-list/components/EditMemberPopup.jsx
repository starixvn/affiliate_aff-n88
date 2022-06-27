import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Alert } from 'reactstrap';
import { globalResource } from '../libs/constants';
import { getMemberDetail, updateMember, setSelectedMemberId } from '../actions';

const initialState = {
    memberName: '',
    isInclude: true,
    isRemoved: false,
    isClickedSubmit: false,
    isShowMessage: false,
    isSuccess: true,
    message: ''
};

export class EditMemberPopup extends PureComponent {
    constructor(props) {
        super(props);

        this.state = initialState
    }

    componentDidUpdate = (prevProps) => {
        const { selectedMemberId } = this.props;

        if (!!selectedMemberId && selectedMemberId !== prevProps.selectedMemberId) {
            this.getMemberInfo(selectedMemberId);
        }
    }

    getMemberInfo = async (selectedMemberId) => {
        var memberInfo = await this.props.getMemberDetail(selectedMemberId);

        !!memberInfo && this.setState(prevState => Object.assign({}, prevState, {
            memberName: memberInfo.MemberName,
            isInclude: memberInfo.IsInclude,
            isRemoved: memberInfo.IsRemoved
        }))
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = async () => {
        const { selectedMemberId } = this.props;
        const { isInclude, isRemoved } = this.state;

        const result = await this.props.updateMember({ memberId: selectedMemberId, isInclude, isRemoved });

        if (result) {
            if (result.IsSuccessful) {
                window.setTimeout(this.handleClosePopup, 3000);
            }

            this.setState({
                isSuccess: result.IsSuccessful,
                isShowMessage: true,
                message: result.IsSuccessful ? "The selected member has been updated successfully!" : result.Message
            }, () => window.setTimeout(this.hideMessage, 3000));
        } else {
            this.setState({
                isSuccess: false,
                isShowMessage: true,
                message: "Updating the selected member is failed!"
            }, () => window.setTimeout(this.hideMessage, 3000));
        }
    }

    handleClosePopup = () => {
        this.props.setSelectedMemberId(null);
        this.setState(initialState);
    }

    hideMessage = () => {
        this.setState({
            isShowMessage: false
        });
    }

    _handlePressEnter = (isValid, event) => {
        if (event.charCode === 13) {
            event.preventDefault()
            this.handleSubmit(isValid);
        }
    }

    render() {
        const { selectedMemberId } = this.props;
        const { memberName, isInclude, isRemoved, isShowMessage, isSuccess, message } = this.state;

        const isShowPopup = !!selectedMemberId;

        return (
            <Modal isOpen={isShowPopup} toggle={this.handleClosePopup} backdrop='static'>
                <ModalHeader toggle={this.handleClosePopup}><span className="iconpopup"></span>{memberName}</ModalHeader>
                <ModalBody>
                    <div className="modal-body-wrapper">
                        <div className="edit-member-form-container">
                            <Alert color={isSuccess ? 'success' : 'danger'} isOpen={isShowMessage}>
                                <div dangerouslySetInnerHTML={{ __html: message }}></div>
                            </Alert>
                            <Form tag="form" className="mb-5" autocomplete="off">
                                <FormGroup row className="mb-2">
                                    <Label for="isRemoved" sm={4} className="required">Status:</Label>
                                    <Input type="checkbox" name="isRemoved" id="isRemoved" checked={isRemoved} onClick={this.handleChange} />
                                </FormGroup>

                                <FormGroup row className="mb-2">
                                    <Label sm={4}>Affiliate:</Label>
                                    <Label>{memberName}</Label>
                                </FormGroup>

                                <FormGroup row className="mb-2">
                                    <Label for="isInclude" sm={4} className="required">Current Month Report:</Label>
                                    <Input type="select" name="isInclude" id="isInclude" value={isInclude ? "0" : "1"} onChange={this.handleChange}>
                                        <option key="include" value="0">Include</option>
                                        <option key="exclude" value="1">Exclude</option>
                                    </Input>
                                </FormGroup>
                            </Form>

                            <Button type="button" color="success" className="mr-3" onClick={this.handleSubmit}>{globalResource.Save}</Button>
                            <Button type="button" color="info" onClick={this.handleClosePopup}>{globalResource.Cancel}</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}

function mapStateToProps({ selectedMemberId }) {
    return { selectedMemberId };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getMemberDetail, updateMember, setSelectedMemberId }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMemberPopup);