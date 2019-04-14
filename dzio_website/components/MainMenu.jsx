import _ from "lodash";
import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import '@fortawesome/fontawesome';

import ReactLogo from "./../elements/ReactLogo";
import {userActions} from "./../actions/user";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";


class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            requests: [],
            fixedTop: "",
            showSignInPage: false,
            showSignUpPage: false,
            showSignUpDialog: false,
            showMessageNotifications: false,
            showNotifications: false,
            showDropDown: false
        };

        this.openDropDownMenu = this.openDropDownMenu.bind(this);
        this.profilePicture = this.profilePicture.bind(this);
        this.openSignIn = this.openSignIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.closeSignIn = this.closeSignIn.bind(this);
        this.openSignUp = this.openSignUp.bind(this);
        this.closeSignUp = this.closeSignUp.bind(this);
        this.openSignUpDialog = this.openSignUpDialog.bind(this);
        this.closeSignUpDialog = this.closeSignUpDialog.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.toggleMessagePopup = this.toggleMessagePopup.bind(this);
        this.toggleNotifications = this.toggleNotifications.bind(this);

    }


    openDropDownMenu() {

        this.setState({
            showNotifications: false,
            showMessageNotifications: false,
            showDropDown: !this.state.showDropDown
        });
    }

    profilePicture() {
        let profilePic = "";
        if (this.props.user.profile.image) {
            profilePic = this.props.user.profile.image.src.indexOf("http") > -1 ? this.props.user.profile.image.src : API_URL + '/' + this.props.user.profile.image.src;
        }

        return profilePic;
    }


    countMessages() {

        return false;
    }

    openSignIn() {
        this.setState({
            showSignInPage: true
        });
    }

    signOut() {
        this.props.logout();
    }

    closeSignIn() {
        this.setState({
            showSignInPage: false
        });
    }

    openSignUp() {
        this.setState({
            showSignUpPage: true
        });
    }

    closeSignUp() {
        this.setState({
            showSignUpPage: false
        });
    }

    openSignUpDialog() {
        this.setState({
            showSignUpDialogPage: true
        });
    }

    closeSignUpDialog() {
        this.setState({
            showSignUpDialogPage: false
        });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const yOffset = 500;
        let currYOffSet = window.pageYOffset;

        if (yOffset < currYOffSet) {
            this.setState({
                fixedTop: "fixed-top"
            });
        }
        else if (currYOffSet <= yOffset) {
            this.setState({
                fixedTop: ""
            });
        }

    }

    toggleMessagePopup() {
        this.setState(prevState => ({
            showNotifications: false,
            showDropDown: false,
            showMessageNotifications: !prevState.showMessageNotifications
        }))
    }

    toggleNotifications() {
        this.setState(prevState => ({
            showNotifications: !prevState.showNotifications,
            showDropDown: false,
            showMessageNotifications: false
        }))
    }

    render() {
        const {loggedIn, requests, user} = this.props;
        const {messages, showDropDown, showSignInPage, showSignUpPage, showSignUpDialogPage, fixedTop, showMessageNotifications, showNotifications} = this.state;

        return <nav className="navbar fixed-top navbar-expand-lg navbar-light">
            <ReactLogo type={'jpg'} />
            <button className="navbar-toggler" type="button">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="quinte.html">Programs</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Predictions</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="calendar-results.html">Calendar & Results</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="how-to-bet.html">How to bet</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="news.html">News</a>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item m-0">
                        <a className="btn-skew nav-link" href="#">
                            Lives
                            <FontAwesomeIcon style={{marginLeft: '5px'}} icon="play-circle" />
                        </a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="#">
                            <FontAwesomeIcon icon="search" />
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <FontAwesomeIcon icon="user" />
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    }
}

function mapStateToProps(state) {
    const {user, loggedIn, token} = state.authentication;

    let requests = [];

    if (user && user.groups) {
        _.each(user.groups, (group) => {
            requests = _.unionWith(requests, group.requests, _.isEqual);
        });
    }

    return {
        requests,
        token,
        user,
        loggedIn
    };
}

export default connect(mapStateToProps, userActions)(MainMenu);