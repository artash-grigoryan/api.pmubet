import React from "react";
import {connect} from "react-redux";
import {userActions} from "./../../actions/user.js";
import logo from "../../../resources/images/signup_modals/holi_logo.svg";

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true});
        const {username, password} = this.state;

        if (username && password) {
            this.props.login(username, password).then(() => {
                if (this.props.loggedIn) {
                    this.props.closeSignIn();
                }
            });
        }
    }

    render() {
        const {loggingIn, message, success, closeSignIn} = this.props;
        const {username, password, submitted} = this.state;

        return <div className="modal-holi" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal"
                                onClick={(e) => closeSignIn()}>&times;</button>
                        <div className="header">
                            <figure>
                                <img src={logo} height={50}/>
                            </figure>
                            <h2 className="section-title">Start your next adventure <br/> on Holimates</h2>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="modal-forms-container">
                            <form className="modal-form" onSubmit={(e) => this.onSubmit(e)}>
                                {
                                    (submitted && !success) ?
                                        <div className="form-control-feedback">{ message || "" }</div>
                                        : ""
                                }
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-danger" id="username" value={username}
                                           onChange={(e) => this.onChange(e)} name="username" placeholder="username"/>
                                    {submitted && !username &&
                                    <div className="help-block">Username is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-danger" id="password"
                                           onChange={(e) => this.onChange(e)} name="password" placeholder="password"/>
                                    {submitted && !password &&
                                    <div className="help-block">Password is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-azure btn-block btn-lg">
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }
}

function mapStateToProps(state) {
    const {loggingIn, loggedIn, message} = state.authentication;
    return {
        message,
        loggedIn,
        loggingIn
    };
}

const actionCreators = {...userActions};
export default connect(mapStateToProps, actionCreators)(SignIn);