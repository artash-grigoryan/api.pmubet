import React from "react";
import {Trans} from "react-i18next";
import Q5Icon from "./Q5Icon";


export default class NextQ5 extends React.Component {

    componentWillReceiveProps(args) {

        this.props.nextQ5.labelLong = (this.props.nextQ5.translation ? this.props.nextQ5.translation.labelLong : null) || this.props.nextQ5.labelLong;
        // this.props.nextQ5.labelLong = this.props.nextQ5.translation.labelLong || this.props.nextQ5.labelLong;
    }

    render() {

        return <div className="adv-1">
            <a className="widget widget__quinte" href={"/" + this.props.lang + "/" + this.props.nextQ5.datePath + "/R"+this.props.nextQ5.reunion.number+"/C" + this.props.nextQ5.number}>
                <div className="row">
                    <div className="col-md-12">
                        <img alt="nextQ5" src="https://api.dzio.am/img/banner/nextQ5.jpg"/>
                        <div className="widget-overlay"></div>
                        <div className="widget-container">
                            <div className="widget__top">
                                <p className="widget__sub-title" data-reactid="1067">{this.props.nextQ5.today ? <Trans i18nKey="Today">Today</Trans> : (this.props.nextQ5.tomorrow ? <Trans i18nKey="Tomorrow">Tomorrow</Trans> : this.props.nextQ5.day)}</p>
                                <Q5Icon/>
                            </div>
                            <header className="widget-flex-wrap">
                                <p className="widget-race__text">{this.props.nextQ5.labelLong} - {this.props.nextQ5.time}</p>
                            </header>
                            <div className="widget__link"><Trans i18nKey="Bet now">Bet now</Trans>
                                <i className="widget__link-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    }
}
