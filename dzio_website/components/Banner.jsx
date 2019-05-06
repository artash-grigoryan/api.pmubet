import _ from "lodash";
import React from "react";
import '@fortawesome/fontawesome';

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {Trans} from "react-i18next";
import Countdown from "react-countdown-now";


export default class Banner extends React.Component {

    renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return null;
        } else {
            // Render a countdown
            return <span><Trans i18nKey="Departure in">Departure in</Trans> {hours>0?hours:null} {hours>1? <Trans i18nKey="hours">hours</Trans>:(hours===1?<Trans i18nKey="hour">hour</Trans>:null)} {minutes>0?minutes:null} {minutes>0 ? (minutes>1?<Trans i18nKey="minutes">minutes</Trans>:<Trans i18nKey="minute">minute</Trans>):null}</span>;
        }
    };

    render() {

        return <div className="banner inner-banner">

            <div className="container">
                <div className="text-holder">
                    <h1>
                        <time>
                            {this.props.race.today ? <Trans i18nKey="Today">Today</Trans> : (this.props.race.tomorrow ? <Trans i18nKey="Tomorrow">Tomorrow</Trans> : this.props.race.day)} {this.props.race.time}
                        </time>
                        <b>R{this.props.reunion.externNumber}C{this.props.race.number} </b>
                        {this.props.race.labelLong}
                    </h1>

                    <div className="btn-holder">
                        <Countdown
                            date={this.props.race.date}
                            renderer={this.renderer}
                        />
                    </div>

                    <div style={{marginTop: "30px"}}><a target="_blank" className="btn btn-md" href="https://www.vivarobet.am"><Trans i18nKey="Bet on Vivaro">Bet on Vivaro</Trans></a></div>
                </div>
            </div>
        </div>
    }
}