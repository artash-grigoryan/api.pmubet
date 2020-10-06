import React, {useEffect} from "react";

import {Trans} from "react-i18next";
import Countdown from "react-countdown-now";
import BannerAdmin from "./BannerAdmin";
import Q5Icon from "./Q5Icon";
import BetButton from "./BetButton";

const Banner = (props) => {

    useEffect(() => {
        props.race.labelLong = (props.race.translation ? props.race.translation.labelLong : null) || props.race.labelLong;
    }, [props.race])

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return null;
        } else {
            // Render a countdown
            return <span>
                <Trans i18nKey="Departure in">Departure in</Trans> {days > 0 ? days : null} {days > 1 ?  <Trans i18nKey="days">days</Trans> : (days > 0) ? <Trans i18nKey="day">day</Trans> : null} {hours > 0 ? hours : null} {hours > 1 ?  <Trans i18nKey="hours">hours</Trans> :  (hours > 0) ? <Trans i18nKey="hour">hour</Trans> : null} {minutes > 0 ? minutes : null} {minutes > 1 ? <Trans i18nKey="minutes">minutes</Trans> : (minutes > 0) ? <Trans i18nKey="minute">minute</Trans> : null}
            </span>;
        }
    };

    return (

        <div className="banner inner-banner" style={{backgroundImage: `url(${process.env.API_URL}/img/banner/0.jpg)`}}>
            <div className="container">
                <div className="text-holder">
                    <h1>
                        <time>
                            {props.race.datePath === props.today ? <Trans
                                i18nKey="Today">Today</Trans> : (props.race.datePath === props.tomorrow ?
                                <Trans
                                    i18nKey="Tomorrow">Tomorrow</Trans> : (props.race.datePath === props.yesterday ?
                                    <Trans i18nKey="Yesterday">
                                        Yesterday
                                    </Trans> : props.race.day))} {props.race.timezoneTime}
                        </time>
                        <span className="label-name">
                            <b>R{props.reunion.externNumber}C{props.race.number} </b>
                            {props.race.labelLong}
                        </span>
                    </h1>

                    <div className="btn-holder">
                        <Countdown
                            date={props.race.date}
                            renderer={renderer}
                        />
                    </div>

                    <div style={{marginTop: "30px"}}>
                        <BetButton race={props.race}/>
                        {props.race.reunion.qn === props.race.number &&
                            <Q5Icon className="banner-icon"/>
                        }
                    </div>
                </div>
            </div>
            <BannerAdmin {...props}/>
        </div>
    );
}

export default Banner;
