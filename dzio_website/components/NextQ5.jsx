import _ from "lodash";
import React from "react";
import '@fortawesome/fontawesome';

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {Trans} from "react-i18next";


export default class NextQ5 extends React.Component {

    constructor(args) {
        super(args);
        this.props.nextQ5.labelLong = (this.props.nextQ5.translation ? this.props.nextQ5.translation.labelLong : null) || this.props.nextQ5.labelLong;
    }

    render() {

        return <div className="adv-1">
            <a className="widget widget__quinte" href={"/" + this.props.nextQ5.datePath + "/R"+this.props.nextQ5.reunion.number+"/C" + this.props.nextQ5.number}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="widget__top">
                            <p className="widget__sub-title" data-reactid="1067">{this.props.nextQ5.today ? <Trans i18nKey="Today">Today</Trans> : (this.props.nextQ5.tomorrow ? <Trans i18nKey="Tomorrow">Tomorrow</Trans> : this.props.nextQ5.day)}</p>
                            <i className="widget__icon widget__icon--quinte" data-reactid="1068"></i>
                        </div>
                        <header className="widget-flex-wrap">
                            <p className="widget-race__text">{this.props.nextQ5.labelLong} - {this.props.nextQ5.time}</p>
                        </header>
                        <div className="widget__link"><Trans i18nKey="Bet now">Bet now</Trans>
                            <i className="widget__link-icon"></i>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    }
}