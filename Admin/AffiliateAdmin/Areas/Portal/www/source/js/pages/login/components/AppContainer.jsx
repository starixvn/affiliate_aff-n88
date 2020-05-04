import React, { PureComponent } from 'react';
import { Alert, Form, FormGroup, Label, Input } from 'reactstrap';

import { post } from '../../../modules/ajaxRequest';
import { resolveClientUrl, changeMode } from '../../../modules/utils';

export default class AppContainer extends PureComponent {
    constructor(props) {
        super(props);

        const now = new Date();
        this.state = {
            userName: '',
            password: '',
            isShowMessage: false,
            message: '',
            year: now.getFullYear(),
            isLightMode: true
        }
    }

    _handleShowAlert = (isSuccess, message) => {
        this.setState({
            message,
            isSuccess,
            isShowMessage: true,
        }, () => window.setTimeout(this._hideMessage, 3000));
    }

    _hideMessage = () => {
        this.setState({
            isShowMessage: false
        });
    }

    _validateAccount = (userName, password) => {
        const isValidUserName = !!userName;
        if (isValidUserName && !!password) {
            return true;
        }

        this._handleShowAlert(false, !isValidUserName ? 'User Name is empty. Please check!' : 'Password is empty. Please check!');
        return false;
    }
    _handleLogin = async () => {
        const { userName, password } = this.state;

        const isValidAccount = this._validateAccount(userName, password);

        if (isValidAccount) {
            const param = { userName, password };
            const response = await post('Portal/Auth/Login', param);

            if (response) {
                const { data } = response;

                if (data.IsSuccessful) {
                    window.location = resolveClientUrl("Portal/Home")
                } else {
                    this._handleShowAlert(false, data.Message);
                }
            } else {
                this._handleShowAlert(false, "An error occurred while processing your request");
            }
        }
    }

    _handlePressEnter = (event) => {
        if (event.charCode === 13) {
            event.preventDefault()
            this._handleLogin();
        }
    }

    _handleChange = (event) => {
        const target = event.target;

        this.setState({ [target.name]: target.value });
    }

    _handleChangeMode = () => {
        const { isLightMode } = this.state;

        changeMode(!isLightMode);
        this.setState({ isLightMode: !isLightMode });
    }

    render() {
        const { userName, password, isShowMessage, message, year } = this.state;
        const { licenseeName } = window.initialState;

        return (
            <div className="login-container">
                {/* <div className="lgRight"></div> */}
                <div className="lgRp">
                    <div className="login-header">
                        <div>
                            <div>Welcome to {licenseeName}<span> Login</span></div>
                            <p>Please sign in to continue to work</p>
                        </div>
                        {
                            licenseeName.toLowerCase() === 'nova88' && <div class="switch-mode-theme">
                                <input type="checkbox" id="switch" onChange={this._handleChangeMode} /><label for="switch"></label>
                            </div>
                        }
                    </div>
                    <div className="war-box">
                        <Alert color='danger' isOpen={isShowMessage}>
                            <div dangerouslySetInnerHTML={{ __html: message }}></div>
                        </Alert>
                    </div>

                    <Form tag="form" className="form-login" autocomplete="false">
                        <FormGroup>
                            {/* <span className="icUser">&nbsp;</span> */}
                            <Label for="userName" className="form-login-text">User Name</Label>
                            <div>
                                <Input type="text" name="userName" id="userName" value={userName}
                                    onKeyPress={this._handlePressEnter} onChange={this._handleChange} />
                            </div>
                        </FormGroup>

                        <FormGroup>
                            {/* <span className="icPass">&nbsp;</span> */}
                            <Label for="passWord" className="form-login-text">Password</Label>
                            <div>
                                <Input type="password" name="password" id="password" autocomplete="false"
                                    value={password} onKeyPress={this._handlePressEnter} onChange={this._handleChange} />
                            </div>
                        </FormGroup>

                        <div className="bt">
                            <a href="javascript:;" class="bt-login" onClick={this._handleLogin}>Log On</a>
                        </div>
                    </Form>
                </div>

                <div className="foot">
                    <span className="foot-rp">{`© Copyright ${year} ${licenseeName}`}</span>
                </div>
            </div>
        )
    }
}