import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Trans} from "react-i18next";
import {Link} from "react-router-dom";
import BetButtonFooter from "../../BetButtonFooter";

const Footer = (props) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        footerTitle: {
            color: theme.palette.primary.main,
            fontSize: '1.3rem',
        },
        footerUl: {
            padding: 0,
            listStyle: 'none',
        },

        footerLi: {
            padding: '5px 0px',
        },
        footerLogoImg: {
            width: '90px',
        },
    }));

    const classes = useStyles();


    return (
    <footer id="footer">
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item sm={4} xs={12}>
                    <h3 className={classes.footerTitle}><Trans i18nKey="General informations">General informations</Trans></h3>
                    <ul className={classes.footerUl}>
                        <li className={classes.footerLi}><Link to={"/"+props.lang}><Trans i18nKey="Programs & Results">Programs & Results</Trans></Link></li>
                        <li className={classes.footerLi}><Link to={"/"+props.lang+"/comment-jouer"}><Trans i18nKey="How to bet">How to bet</Trans></Link></li>
                        <li className={classes.footerLi}><a href={"https://wariprono.com/"} target={"_blank"}><Trans i18nKey="Predictions">Predictions</Trans></a></li>
                    </ul>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <h3 className={classes.footerTitle}><Trans i18nKey="Bet online">Bet online</Trans></h3>
                    <ul className={classes.footerUl}>
                        <li className={classes.footerLi}>
                            <BetButtonFooter race={props.race}/>
                        </li>
                    </ul>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <h3 className={classes.footerTitle}><Trans i18nKey="Help">Help</Trans></h3>
                    <ul className={classes.footerUl}>
                        <li className={classes.footerLi}>
                            <a href="https://www.facebook.com/PMUBETMC"><Trans i18nKey="CONTACT US">CONTACT US</Trans></a>
                        </li>
                    </ul>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid className="footer-logo" item sm={4} xs={12}>
                    <Link to={"/"+props.lang}>
                        <img className={classes.footerLogoImg} src={require('./../../../assets/images/logo.svg')} height="40" width="50" />
                    </Link>
                </Grid>
                <Grid item sm={4} xs={12}>
                    Copyright © 2020 PMUBET® All rights reserved.
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Trans i18nKey="Forbidden to minors">Forbidden to minors</Trans>
                </Grid>
            </Grid>
        </div>
    </footer>
    );
};

export default Footer;
