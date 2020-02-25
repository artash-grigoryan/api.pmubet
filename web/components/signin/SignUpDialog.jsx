import React from "react";
import {connect} from "react-redux";

import {userActions} from "./../../actions/user.js";
import logo from "../../../resources/images/signup_modals/holi_logo.svg";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

import {faEnvelopeOpen} from '@fortawesome/fontawesome-free-solid';
import {faFacebookF, faGoogle} from '@fortawesome/fontawesome-free-brands';


class SignUpDialog extends React.Component {
    constructor(props) {
        super(props);
        this.props.logout();
    }

    onSignUpWithMail() {
        this.props.closeSignUpDialog();
        this.props.openSignUp();
    }

    render() {
        let {closeSignUpDialog, openSignUp} = this.props;
        return (
            <div className="modal-holi signup-dialog" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"
                                    onClick={(e) => closeSignUpDialog()}>&times;</button>
                            <div className="header">
                                <figure>
                                    <img src={logo} height={50}/>
                                </figure>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="modal-forms-container">
                                <div className="modal-form">
                                    <div className="form-group">
                                        <button className="btn  btn-facebook btn-block btn-lg" href="/api/authFacebook">
                                            <FontAwesomeIcon icon={faFacebookF}/> Connect with Facebook
                                        </button>
                                    </div>
                                    <div className="form-group">
                                        <a className="btn btn-google btn-block btn-lg" href="/api/authGoogle">
                                            <FontAwesomeIcon icon={faGoogle}/> Connect with Google
                                        </a>
                                    </div>
                                    <div className="sections-divider">
                                        <hr/>
                                        <div>
                                            <span>or feel safe to</span>
                                        </div>
                                        <hr/>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-red btn-block btn-lg" onClick={this.onSignUpWithMail.bind(this)}>
                                            <FontAwesomeIcon icon={faEnvelopeOpen}/> Sign Up with Email
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const {registering} = state.registration;
    return {
        registering
    };
}

const actionCreators = {...userActions};
export default connect(mapStateToProps, actionCreators)(SignUpDialog);