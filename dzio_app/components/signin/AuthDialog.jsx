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
                console.log("dsdfsdfsd");
            });
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;

        return (
            <div className="signin-signup-modal">
                <div className="modal-title-block">
                    <figure>
                        <img src={logo} />
                    </figure>
                    <h2 className="section-title">Start your next adventure <br/> on Holimates</h2>
                </div>
                <div className="login-container">
                    <form onSubmit={(e) => this.onSubmit(e)}>
                        <input name="username" type="email" placeholder="Email" value={username} onChange={(e) => this.onChange(e)} />
                        <input name="password" type="password" placeholder="Password" value={password} onChange={(e) => this.onChange(e)} />
                        <button className="signin-button">Sign in</button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}
const actionCreators = {...userActions};
export default connect(mapStateToProps, actionCreators)(SignIn);