import React, {useState} from "react";
import {Trans} from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import {Link} from "react-router-dom";
import DialogMenu from "./DialogMenu";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core";

const YellowButton = withStyles((theme) => ({
    root: {
        width: "100%",
        background: "#f6a800",
        color: "#ffffff",
        '&:hover': {
            color: "#ffffff",
            background: "#F69000",
        },
        [theme.breakpoints.down('sm')]: {
            margin: "8px",
        },
    },
}))(Button);

const MainMenu = (props) => {

    let lang = props.lang;
    const [navBarOpen, setNavBarOpen] = useState(false)

    const handleClick = () => {
        setNavBarOpen(!navBarOpen);
    }


    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light">
            <Link className={"navbar-brand"} to={"/" + lang}>
                <img className={"header-logo"} src={require('./../assets/images/logo.svg')} height="40" width="50"/>
            </Link>
            <button className="navbar-toggler" type="button" onClick={handleClick}>
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent"
                 style={{display: navBarOpen ? 'block' : 'none'}}>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/" + lang}><Trans i18nKey="Programs & Results">Programs
                            &
                            Results</Trans></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/" + lang + "/comment-jouer"}><Trans
                            i18nKey="How to bet">How to bet</Trans></Link>
                    </li>
                    <li className="nav-item">
                        <YellowButton
                            variant={"contained"}
                            target={"_blank"}
                            href={"https://wariprono.com/"}
                        >
                            <Trans i18nKey="Predictions">Predictions</Trans>
                        </YellowButton>
                    </li>
                    <li className="nav-item">
                        <DialogMenu race={props.race}/>
                    </li>
                </ul>
                <ul className="navbar-nav secondary">
                    <li className="nav-item m-0">

                    </li>
                </ul>
            </div>
            <LanguageSelector {...props}/>
        </nav>
    )
}

export default MainMenu;
