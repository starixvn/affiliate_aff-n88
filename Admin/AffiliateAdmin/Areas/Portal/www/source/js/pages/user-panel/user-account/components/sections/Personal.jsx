import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';

import { renderInputForm, capitalizeFirstChar } from '../../modules/service';
import { setUserAccountInfo } from '../../actions';
import { updateObjectInArray } from '../../../../../modules/dataHandler';

export class Personal extends PureComponent {
    constructor(props) {
        super(props);

        const { userAccountInfo } = this.props;
        this.TELEGRAM_APP = { Name: 'Telegram', Value: '', Order: 0 };

        this.arrayContactApps = userAccountInfo && this.handleContactApps(userAccountInfo.ContactAppList);
    }

    handleContactApps = (contactApps) => {
        if (!Array.isArray(contactApps)) {
            return [this.TELEGRAM_APP];
        }

        const result = [...contactApps];
        const hasTelegram = result.some(item => item.Name === this.TELEGRAM_APP.Name);
        if (!hasTelegram) {
            result.push(this.TELEGRAM_APP);
        }

        return result.sort((a, b) => {
            const priority = (name) => {
                if (name === 'Skype') return 0;
                if (name === 'Telegram') return 1;
                return 2;
            };
            return priority(a.Name) - priority(b.Name);
        });
    }

    handleChange = (event) => {
        const target = event.target;
        const name = capitalizeFirstChar(target.name);

        const newUserAccountInfo = Object.assign({}, this.props.userAccountInfo, { [name]: target.value })
        this.props.setUserAccountInfo(newUserAccountInfo);
    }

    handleChangeGender = (isMale) => {
        const newUserAccountInfo = Object.assign({}, this.props.userAccountInfo, { Gender: isMale });

        this.props.setUserAccountInfo(newUserAccountInfo);
    }

    handleChangeContactApps = (event) => {
        const { name, value } = event.target
        const indexItem = this.arrayContactApps.findIndex(item => item.Name === name);
        const updateItem = Object.assign({}, this.arrayContactApps[indexItem], { Value: value });
        this.arrayContactApps = updateObjectInArray(this.arrayContactApps, indexItem, updateItem)

        const newUserAccountInfo = Object.assign({}, this.props.userAccountInfo, { ContactAppList: this.arrayContactApps })
        this.props.setUserAccountInfo(newUserAccountInfo);
    }

    _renderGenderForm(isMale, isRequired) {
        return (
            <FormGroup row>
                <Label sm={3} xl={2} className={isRequired ? 'required' : ''}>Gender</Label>
                <Col sm={9} xl={10} className="gender-group">
                    <FormGroup check className="d-inline-block mr-3">
                        <Label check>
                            <Input type="radio" checked={isMale != null && isMale} onChange={() => this.handleChangeGender(true)} />{' '} Male
                        </Label>
                    </FormGroup>
                    <FormGroup check className="d-inline-block">
                        <Label check>
                            <Input type="radio" checked={isMale != null && !isMale} onChange={() => this.handleChangeGender(false)} />{' '} Female
                        </Label>
                    </FormGroup>
                </Col>
            </FormGroup>
        )
    }

    _renderContactAppInput(name, value, isRequired, placeholder = '') {
        return (
            <FormGroup row key={name}>
                <Label for={name} sm={3} xl={2} className={isRequired ? "required" : ""}>{name}</Label>
                <Col sm={9} xl={10}>
                    <Input
                        type="text"
                        id={name}
                        name={name}
                        value={value || ''}
                        onChange={this.handleChangeContactApps}
                        placeholder={placeholder}
                    />
                </Col>
            </FormGroup>
        );
    }

    _renderContactApps(isRequired) {
        const contactApps = this.arrayContactApps.filter(item => item.Name !== 'Skype');
        const contactLength = contactApps.length;

        return contactApps.map(contactApp => {
            const placeholder = contactApp.Name === 'Telegram' ? '@xxxxxxxx' : '';
            return this._renderContactAppInput(
                contactApp.Name,
                contactApp.Value,
                contactLength === 1 && isRequired,
                placeholder
            );
        });
    }

    render() {
        const { userAccountInfo } = this.props;
        const isRequired = !userAccountInfo.IsMarketingAccount;

        return userAccountInfo && (
            <Form tag="div">
                {renderInputForm('username', 'User Name', userAccountInfo.AffName, true, false, this.handleChange)}
                {renderInputForm('affCategoryDesc', 'Account Type', userAccountInfo.AffCategoryDesc, true, false, this.handleChange)}
                {renderInputForm('firstName', 'First Name', userAccountInfo.FirstName, false, isRequired, this.handleChange)}
                {renderInputForm('lastName', 'Last Name', userAccountInfo.LastName, false, isRequired, this.handleChange)}
                {this._renderGenderForm(userAccountInfo.Gender, isRequired)}
                {renderInputForm('email', 'Email Address', userAccountInfo.Email, false, isRequired, this.handleChange)}
                {renderInputForm('phone', 'Contact Number', userAccountInfo.Phone, false, isRequired, this.handleChange)}
                {this._renderContactApps(isRequired)}
            </Form>
        )
    }
}

function mapStateToProps({ edit }) {
    const { userAccountInfo } = edit;
    return Object.assign({}, { userAccountInfo });
}

function mapDispatchToProp(dispatch) {
    return bindActionCreators({ setUserAccountInfo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProp)(Personal);