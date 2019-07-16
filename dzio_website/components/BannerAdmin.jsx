import React from "react";
import '@fortawesome/fontawesome';

import {Trans} from "react-i18next";
import Countdown from "react-countdown-now";
import {bannerActions} from "../actions/banner";


export default class Banner extends React.Component {

    constructor(args) {
        super(args);
        this.state = {
            image: false
        };
    }

    async componentWillMount() {

        bannerActions.getLast(this.props.lang || 'hy').then((response) => {
            this.setState(response);
        });
    }

    renderer = ({ total, days, hours, minutes, seconds, milliseconds, completed }) => {
        if (completed) {
            // Render a completed state
            return null;
        } else {

            return <span>
                <Trans i18nKey="Departure in">Departure in</Trans>&nbsp;
                {days > 0 ? days : null} {days > 1 ?  <Trans i18nKey="days">days</Trans> :  <Trans i18nKey="day">day</Trans>}&nbsp;
                {hours > 0 ? hours : null} {hours > 1 ?  <Trans i18nKey="hours">hours</Trans> :  <Trans i18nKey="hour">hour</Trans>}&nbsp;
                {minutes > 0 ? minutes : null} {minutes > 1 ? <Trans i18nKey="minutes">minutes</Trans> : <Trans i18nKey="minute">minute</Trans>}
            </span>;
        }
    };

    render() {

        return <div>
            { this.state.text && (new Date(this.state.date)) > (new Date()) &&
            <div className="inner-banner additional " style={{backgroundImage: "url('/img/banner/" + this.state.image + "')"}}>
                <div className="container">
                    <div className="text-holder" style={{paddingTop: '20px'}}>
                        <h1>
                            {this.state.text}
                        </h1>

                            <Countdown
                                date={this.state.date}
                                renderer={this.renderer}
                            />
                    </div>
                </div>
            </div>
        }
        </div>
    }
}