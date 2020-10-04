import React from "react";
import {Trans} from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import {Link} from "react-router-dom";
import DialogMenu from "./DialogMenu";


class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            requests: [],
            fixedTop: "",
            navBarOpen: false,
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

    handleClick() {

        this.setState({'navBarOpen':!this.state.navBarOpen});
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

    redirectUrl() {

        console.log('ok');
    }

    render() {

        return <nav className="navbar fixed-top navbar-expand-lg navbar-light">
            <Link className={"navbar-brand"} to={"/"+this.props.lang}>
                <img className={"header-logo"} src={require('./../assets/images/logo.svg')} height="40" width="50" />
            </Link>
            <button className="navbar-toggler" type="button" onClick={() => this.handleClick()}>
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent"  style={{display:this.state.navBarOpen?'block':'none'}}>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/"+this.props.lang}><Trans i18nKey="Programs & Results">Programs & Results</Trans></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/"+this.props.lang+"/how-to-bet"}><Trans i18nKey="How to bet">How to bet</Trans></Link>
                    </li>
                    <li className="nav-item">
                        <DialogMenu race={this.props.race}/>
                    </li>
                </ul>
                <ul className="navbar-nav secondary">
                    <li className="nav-item m-0">

                    </li>
                </ul>
            </div>
            <LanguageSelector {...this.props}/>
        </nav>
    }
}

export default MainMenu;
