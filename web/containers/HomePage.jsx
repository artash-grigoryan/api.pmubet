import React, {Component} from "react";
import { Link } from 'react-router-dom'
import MainMenu from "../components/MainMenu.jsx";
import Calendar from 'react-calendar';
import Footer from "../components/shared/footer/footer";
import _ from "lodash";

import { raceActions } from '../actions/race';
import { reunionActions } from '../actions/reunion';

import "./../assets/css/main.scss";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Race from "../components/Race";

import { Trans } from "react-i18next";
import BannerAdmin from "../components/BannerAdmin";
import {getIconBySpeciality} from "../helpers/iconsBySpeciality";
import i18next, {t} from 'i18next';
import {faAngleDoubleDown, faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import {Helmet} from "react-helmet";
import moment from "moment";
import tz from "moment-timezone";


export default class HomePage extends Component {

    constructor(props) {

        super(props);

        let timezoneOffset = (moment().utcOffset() - moment().tz("Europe/Paris").utcOffset()) / 60;

        let date = new Date();
        let today = date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2);
        date.setDate(date.getDate()-1);
        let yesterday = date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2);
        date.setDate(date.getDate()+2);
        let tomorrow = date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2);

        let lang = (typeof this.props.match.params.lang !== 'undefined' ? this.props.match.params.lang : 'en');
        i18next.changeLanguage(lang);

        let dateCalendar = new Date();
        let minDateCalendar = new Date().setMonth(new Date().getMonth()-2);
        let maxDateCalendar = new Date().setDate(new Date().getDate()+1);

        this.state = {

            timezoneOffset: timezoneOffset,
            lang: lang,
            yesterday: yesterday,
            today: today,
            tomorrow: tomorrow,
            reunions: false,
            nextRace: false,
            nextQ5: false,
            date: false,
            reunion: false,
            race: false,
            reunionSelectorOpened: false,
            calendarSelectorOpened: false,
            dateCalendar : dateCalendar,
            minDateCalendar : minDateCalendar,
            maxDateCalendar : maxDateCalendar,
            predictionTop: [],
            runnerSelected: [],
            predictions: []
        };
    }

    changeLanguage(lang) {

        this.setState({lang});
        i18next.changeLanguage(lang);
    }

    async componentWillMount() {

        this.setReunions();

        raceActions.getNextQ5(this.state.lang).then((response) => {

            this.setState({nextQ5 : response.race})
        });

        if(typeof this.props.match.params.raceNumber !== 'undefined') {

            this.setReunions(this.props.match.params.date);
            this.setRace(this.props.match.params.date, this.props.match.params.reunionNumber, this.props.match.params.raceNumber);
        }
        else if(typeof this.props.match.params.reunionNumber !== 'undefined') {

            this.setReunions(this.props.match.params.date);
            this.setFirstRaceByReunion(this.props.match.params.date, this.props.match.params.reunionNumber);
        }
        else if(typeof this.props.match.params.date !== 'undefined') {

            this.setReunions(this.props.match.params.date);
            this.setNextRaceByDate(this.props.match.params.date)
        }
        else {

            this.setNextRace()
        }
    }

    setReunions(date) {

        if(typeof date === 'undefined') {

            reunionActions.getAll(this.state.lang).then((response) => {
                let reunions = _.groupBy(response.reunions, 'datePath');
                this.setState({reunions : reunions});
            });
        }
        else {

            if(!this.state.reunions[date]) {

                reunionActions.get(this.state.lang, date).then((response) => {

                    if(this.state.reunions) {
                        this.state.reunions[date] = response.reunions;
                    }
                    else {
                        this.state.reunions = _.groupBy(response.reunions, 'datePath');
                    }
                    this.setState({reunions : this.state.reunions});
                });
            }
        }
    }

    setNextRace() {

        raceActions.getNext(this.state.lang).then((response) => {

            this.setState({
                date : response.race.datePath,
                dateCalendar : response.race.date,
                reunion : response.race.reunion,
                race : response.race,
                predictionTop : response.race.reporters_top,
                predictions : _.compact(_.concat(response.race.reporters_geny, response.race.reporters_best, response.race.reporters_others))
            });
        });
    }

    setFirstRaceByDate(date) {

        raceActions.getFirstByDate(this.state.lang, date).then((response) => {

            if(response.race) {

                this.setState({
                    date : response.race.datePath,
                    dateCalendar : response.race.date,
                    reunion : response.race.reunion,
                    race : response.race,
                    predictionTop : response.race.reporters_top,
                    predictions : _.compact(_.concat(response.race.reporters_geny, response.race.reporters_best, response.race.reporters_others)),
                    reunionSelectorOpened : false,
                    calendarSelectorOpened : false
                });
                this.props.history.push("/"+this.state.lang+"/"+response.race.datePath+"/R"+response.race.reunion.number+"/C"+response.race.number);
            }
        });
    }

    setNextRaceByDate(date) {

        raceActions.getNextByDate(this.state.lang, date).then((response) => {

            if(response.race) {

                this.setState({
                    date : response.race.datePath,
                    dateCalendar : response.race.date,
                    reunion : response.race.reunion,
                    race : response.race,
                    predictionTop : response.race.reporters_top,
                    predictions : _.compact(_.concat(response.race.reporters_geny, response.race.reporters_best, response.race.reporters_others)),
                    reunionSelectorOpened : false,
                    calendarSelectorOpened : false
                });
                this.props.history.push("/"+this.state.lang+"/"+response.race.datePath+"/R"+response.race.reunion.number+"/C"+response.race.number);
            }
            else {
                //this.setNextRaceByDate(this.date);
            }
        });
    }

    setFirstRaceByReunion(date, reunionNumber) {

        raceActions.getFirstByReunion(this.state.lang, date, reunionNumber).then((response) => {

            this.setState({
                date : response.race.datePath,
                dateCalendar : response.race.date,
                reunion : response.race.reunion,
                race : response.race,
                predictionTop : response.race.reporters_top,
                predictions : _.compact(_.concat(response.race.reporters_geny, response.race.reporters_best, response.race.reporters_others)),
                reunionSelectorOpened : false,
                calendarSelectorOpened : false
            });
            this.props.history.push("/"+this.state.lang+"/"+response.race.datePath+"/R"+response.race.reunion.number+"/C"+response.race.number);
        });
    }

    setRace(date, reunionNumber, raceNumber) {

        raceActions.get(this.state.lang, date, reunionNumber, raceNumber).then((response) => {

            if(response.race) {

                this.setState({
                    date : response.race.datePath,
                    dateCalendar : response.race.date,
                    reunion : response.race.reunion,
                    race : response.race,
                    predictionTop : response.race.reporters_top,
                    predictions : _.compact(_.concat(response.race.reporters_geny, response.race.reporters_best, response.race.reporters_others)),
                    reunionSelectorOpened : false,
                    calendarSelectorOpened : false,
                });
                this.props.history.push("/"+this.state.lang+"/"+response.race.datePath+"/R"+response.race.reunion.number+"/C"+response.race.number);
            }
            else {
                this.setDate(this.date, 'next');
            }
        });
    }

    toggleReunionSelector() {

        this.setState({reunionSelectorOpened:!this.state.reunionSelectorOpened});
    }

    toggleCalendarSelector() {

        this.setState({calendarSelectorOpened:!this.state.calendarSelectorOpened});
    }

    setDate(date, rcase) {

        this.setReunions(date);
        this.setState({date});

        switch (rcase) {

            case 'next' :
                this.setNextRaceByDate(date);
                break;
            case 'first' :
                this.setFirstRaceByDate(date);
                break;
        }
    }

	render() {

        let listReunions = null;
	    if(this.state.reunions && this.state.date) {

            let reunions = this.state.reunions[this.state.date];

            if(reunions) {
                let specialityLogo = null;
                listReunions = reunions.map((reunion) => {
                    return (
                        <li key={reunion.id} className={this.reunion && this.reunion.id === reunion.id ? 'active' : ''}>
                            <Link to={"/" + this.state.lang + "/" + reunion.datePath + "/R" + reunion.number} onClick={() => this.setFirstRaceByReunion(reunion.datePath, reunion.number)}>
                                <img src={getIconBySpeciality(reunion.speciality)}/> <b>R{reunion.number}</b> - {(reunion.translation ? reunion.translation.hippodromeName : null) || reunion.hippodromeName}
                            </Link>
                        </li>
                    );
                });
            }
            else {
                listReunions = null;
            }
        }

        let listRaces = [];
	    if(this.state.date && this.state.reunion && this.state.race) {

            for (let raceNumber = 1; raceNumber <= this.state.reunion.racesNumber; ++raceNumber) {

                listRaces.push(
                    <li key={raceNumber}>
                        <Link className={this.state.race.number && this.state.race.number===raceNumber?'active':''} to={"/" + this.state.lang + "/" + this.state.date + "/R"+this.state.reunion.number+"/C" + raceNumber} onClick={() => this.setRace(this.state.date, this.state.reunion.number, raceNumber)}>
                            C{raceNumber}
                            {raceNumber === this.state.reunion.qn ? <i className="widget__icon widget__icon--quinte" data-reactid="1068"><img src={require('../assets/images/icons/pmu_QUINTE-PLUS_rvb.svg')}/></i> : ''}
                        </Link>
                    </li>
                );
            }
        }

		return (


		    <div>

                <Helmet>
                    <html lang={t("lang")}/>
                    <title>{t("Programs & Results")}</title>

                    <meta name="title" content={t("meta title")}/>
                    <meta name="description" content={t("meta description")}/>
                    <meta itemProp="name" content={t("meta name")}/>
                    <meta itemProp="description" content={t("meta description")}/>
                    <meta property="og:title" content={t("meta title")}/>
                    <meta property="og:description" content={t("meta description")}/>
                    <meta property="twitter:title" content={t("meta title")}/>
                    <meta property="twitter:description" content={t("meta description")}/>
                </Helmet>

                <header>
                    <MainMenu {...this.state}/>
                </header>

                <div className="container-fluid">
                    <div id="wrapper">
                        <div id="main">
                            <div className="bar-selector">
                                <div className="day-selector">
                                    <ul>

                                        <li>
                                            <Link className={this.state.date === this.state.yesterday?'active':''} to={"/" + this.state.lang + "/" + this.state.yesterday} onClick={() => this.setDate(this.state.yesterday, 'first')}><Trans i18nKey="Yesterday">Yesterday</Trans></Link>
                                        </li>
                                        <li>
                                            <Link className={this.state.date === this.state.today?'active':''} to={"/" + this.state.lang + "/" + this.state.today} onClick={() => this.setDate(this.state.today, 'next')}><Trans i18nKey="Today">Today</Trans></Link>
                                        </li>
                                        <li>
                                            <Link className={this.state.date === this.state.tomorrow?'active':''} to={"/" + this.state.lang + "/" + this.state.tomorrow} onClick={() => this.setDate(this.state.tomorrow, 'next')}><Trans i18nKey="Tomorrow">Tomorrow</Trans></Link>
                                        </li>
                                    </ul>
                                    <ul className="calendar-selector">
                                        <li>
                                            <a className="meeting-selected" href="javascript:;" onClick={() => this.toggleCalendarSelector()}>
                                                <FontAwesomeIcon icon={faCalendarAlt} />
                                            </a>
                                            {
                                                this.state.calendarSelectorOpened
                                                ?
                                                    <Calendar
                                                        locale={this.state.lang}
                                                        onClickDay={(date) => this.setDate(date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2), 'first')}
                                                        value={new Date(this.state.dateCalendar)}
                                                        minDate={new Date(this.state.minDateCalendar)}
                                                        maxDate={new Date(this.state.maxDateCalendar)}
                                                    />
                                                :
                                                    null
                                            }
                                        </li>
                                    </ul>
                                </div>
                                {
                                    this.state.reunions
                                    ?
                                        <div>
                                            {
                                                this.state.reunion
                                                ?
                                                    <div className="meeting-selector">
                                                        <a className="meeting-selected" href="javascript:;" onClick={() => this.toggleReunionSelector()}>
                                                            <FontAwesomeIcon icon={faAngleDoubleDown} className="selector-icon" />
                                                            <img src={getIconBySpeciality(this.state.reunion.speciality)}/> <b>R{this.state.reunion.number}</b> - {(this.state.reunion.translation ? this.state.reunion.translation.hippodromeName : null) || this.state.reunion.hippodromeName}
                                                        </a>
                                                        <ul style={this.state.reunionSelectorOpened ? {display:'block'} : null} className="meeting-selector-list">
                                                            {listReunions}
                                                        </ul>
                                                    </div>
                                                :
                                                    <div className="meeting-selector">
                                                        <a className="meeting-selected" href="javascript:;" onClick={() => this.toggleReunionSelector()}>
                                                            <img src="https://www.equidia.fr/assets/img/icons-png/discipline_attele_w.png"/> <Trans i18nKey="Select a Reunion">Select a Reunion</Trans>
                                                        </a>
                                                        <ul style={this.state.reunionSelectorOpened ? {display:'block'} : null} className="meeting-selector-list">
                                                            {listReunions}
                                                        </ul>
                                                    </div>
                                            }
                                            <div className="race-selector">
                                                {
                                                    this.state.date && this.state.reunion
                                                    ?
                                                        <ul>
                                                            {listRaces}
                                                        </ul>
                                                    :
                                                        null
                                                }
                                            </div>
                                        </div>
                                    :
                                        null
                                }

                            </div>

                            {
                                this.state.race && this.state.reunion
                                ?
                                    <Race {...this.state}/>
                                :
                                    <BannerAdmin {...this.state}/>
                            }

                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
	}
}
