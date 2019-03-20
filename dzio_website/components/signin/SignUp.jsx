import React from "react";
import {connect} from "react-redux";
import moment from "moment";
import Select from 'react-select';
import {Field, reduxForm, SubmissionError} from 'redux-form'

import {inputType, terms, genderType} from "./../../helpers/form/components";
import {confirmPassword, termsAndConditions, required, email} from "./../../helpers/form/validators";
import {userActions} from "./../../actions/user";
import logo from "../../../resources/images/signup_modals/holi_logo.svg";


class SignUp extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                gender: '',
                birthDate: '',
                password: '',
                confirmPassword: '',
            },
            terms: false,
            submitted: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const {name, value} = e.target;
        const {user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    onSubmit(formValues) {
        let {user} = this.state;
        user = {
            ...user,
            ...formValues
        };

        this.setState({
            user,
            submitted: true
        });

        return this.props.register(user).then(()=>{
            const {success, message} = this.props;

            if ( typeof success !== "undefined" && !success) {
                throw new SubmissionError({
                    username: message
                })
            }
        });
    }

    onSignIn() {
        this.props.closeSignUp();
        this.props.openSignIn();
    }

    render() {
        const months = [];
        const years = [];
        const days = [];
        for (let i = 0; i <= moment.months().length; i += 1) {
            months.push({
                value: i,
                label: moment.months()[i]
            });
        }
        for (let i = 1918; i <= moment().year(); i += 1) {
            years.unshift({
                value: i,
                label: i
            });
        }
        for (let i = 1; i <= 31; i += 1) {
            days.push({
                value: i,
                label: i
            });
        }
        const {error, handleSubmit, pristine, reset, submitting, registering} = this.props;
        const {user, submitted} = this.state;

        return (
            <div className="modal-holi">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="header">
                                <img height={50} src={logo} alt=""/>
                                <button type="button" className="close" data-dismiss="modal"
                                        onClick={(e) => this.props.closeSignUp()}>&times;</button>
                            </div>
                        </div>
                        <div className="modal-body">
                            {/*<div className="modal-forms-container">*/}
                            <div className="container-fluid">
                                <div className="form-group">
                                    <span>* All fields are required</span>
                                </div>

                                <form className="modal-form" onSubmit={handleSubmit(this.onSubmit)}>
                                    {error && <strong>{error}</strong>}
                                    <Field type="text"
                                           className="form-control"
                                           name="firstName"
                                           label="First Name"
                                           component={inputType}
                                           validate={[required]} />

                                    <Field type="text"
                                           className="form-control"
                                           name="lastName"
                                           label="Last Name"
                                           component={inputType}
                                           validate={[required]} />

                                    <Field type="email" className="form-control" name="username"
                                           label="Username"
                                           component={inputType}
                                           validate={[required, email]} />

                                    <Field type="password" className="form-control" name="password"
                                           label="Password"
                                           component={inputType}
                                           validate={[required]} />

                                    <Field type="password" className="form-control" name="confirmPassword"
                                           label="Confirm Password"
                                           component={inputType}
                                           validate={[required]} />


                                    <div className="form-group row">
                                        <div className="col-4">
                                            <Select classNamePrefix='day' className="date" options={days}
                                                    value={this.state.value} onChange={(e) => this.onChange} />
                                        </div>
                                        <div className="col-4">
                                            <Select classNamePrefix='month' className="date" options={months}
                                                    value={this.state.value}
                                                    onChange={(e) => this.onChange} />
                                            </div>
                                        <div className="col-4">
                                            <Select classNamePrefix='day' className="year" options={years}
                                                    value={this.state.value}
                                                    onChange={(e) => this.onChange} />
                                        </div>
                                    </div>

                                    <Field
                                        name="gender"
                                           component={genderType}
                                           validate={[required]}
                                    />
                                    <div className="form-group">
                                        <hr/>
                                    </div>
                                    <div className="form-group">
                                        <Field type="checkbox" className="checkbox" name="terms" id="terms"
                                               component={terms}
                                               validate={[termsAndConditions]}
                                               />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-azure btn-block btn-lg" disabled={submitting}>
                                            Sign Up with Email
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="alt-login col-12">
                                <span>Already have an account?</span> <span className="btn btn-link"
                                                                            onClick={this.onSignIn.bind(this)}>Sign In</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {success, message, registering} = state.registration;

    return {
        success,
        message,
        registering
    };
}

SignUp = reduxForm({
    form: 'signUp',
    validate: confirmPassword
})(SignUp);

export default connect(mapStateToProps, userActions)(SignUp);