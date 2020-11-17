import React, {Component} from "react";
import { Link } from 'react-router-dom'
import MainMenu from "../components/MainMenu.jsx";
import Footer from "../components/shared/footer/footer";
import _ from "lodash";

import { Trans } from "react-i18next";
import { raceActions } from '../actions/race';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'
import Calendar from "react-calendar";
import Banner from "../components/Banner";
import {getIconBySpeciality} from "../helpers/iconsBySpeciality";
import i18next, {t} from "i18next";
import {reunionActions} from "../actions/reunion";
import Q5Icon from "../components/Q5Icon";
import BetButton from "../components/BetButton";
import {Helmet} from "react-helmet";


export default class CalendarResultsPage extends Component {

    constructor(props) {

        super(props);

        let timezoneOffset = (new Date().getTimezoneOffset() / 60 + 1) * -1;

        let date = new Date();
        let today = date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2);
        date.setDate(date.getDate()-1);
        let yesterday = date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2);
        date.setDate(date.getDate()+2);
        let tomorrow = date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2);

        let lang = this.props.match.params.lang ? this.props.match.params.lang : 'en';
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
            date : today,
            filter : 'all',
            calendarSelectorOpened: false,
            dateCalendar : dateCalendar,
            minDateCalendar : minDateCalendar,
            maxDateCalendar : maxDateCalendar,
            races : null,
            race: null,
            reunions: false,
            nextRace: false,
            nextQ5: false,
            reunion: false,
            reunionSelectorOpened: false,
            predictionTop: [],
            runnerSelected: [],
            predictions: []
        };
    }

    async componentWillMount() {

        this.setReunions();

        raceActions.getNext(this.state.lang).then((response) => {

            let timezoneHours = parseInt(response.race.time.substring(0,2)) + parseInt(this.state.timezoneOffset);
            while (timezoneHours.toString().length < 2) {timezoneHours = "0" + timezoneHours;}
            let timezoneMinutes = parseInt(response.race.time.substring(3,5));
            while (timezoneMinutes.toString().length < 2) {timezoneMinutes = "0" + timezoneMinutes;}

            response.race.timezoneTime = timezoneHours + ':' + timezoneMinutes;
            response.race.date = new Date(response.race.day+' '+response.race.timezoneTime);

            this.setState({
                date : response.race.datePath,
                dateCalendar : response.race.date,
                reunion : response.race.reunion,
                race : response.race,
            });
        });

        if(typeof this.props.match.params.date !== 'undefined') {

            this.setDate(this.props.match.params.date);
        }
        else {
            raceActions.getAll(this.state.lang).then((response) => {

                this.setState({
                    races : _.groupBy(response.races, 'datePath')
                });
            });
        }
    }

    redirect(target) {
        this.props.history.push(target);
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

    setDate(date) {

        if(!this.state.races || !this.state.races[date]) {

            raceActions.getAllByDate(this.state.lang, date).then((response) => {

                if(this.state.races) {
                    this.state.races[date] = response.races;
                }
                else {
                    this.state.races = _.groupBy(response.races, 'datePath');
                }
                if(this.state.races[date] && this.state.races[date].length) {

                    this.setState({
                        races : this.state.races,
                        date : date,
                        dateCalendar : this.state.races[date][0].day,
                        filter : 'all',
                        calendarSelectorOpened: false,
                    });
                }
            });
        }
        else {

            this.setState({
                date : date,
                filter : 'all',
                dateCalendar : this.state.races[date][0].day,
                calendarSelectorOpened: false,
            });
        }
        this.props.history.push("/"+this.state.lang+"/calendar-results/"+date);
    }

    setFilter(filter) {

        this.setState({
            filter : filter,
        });
    }

    toggleReunionSelector() {

        this.setState({reunionSelectorOpened:!this.state.reunionSelectorOpened});
    }

    toggleCalendarSelector() {

        this.setState({calendarSelectorOpened:!this.state.calendarSelectorOpened});
    }

    getRaceTime(race) {

        let timezoneHours = parseInt(race.time.substring(0,2)) + parseInt(this.state.timezoneOffset);
        while (timezoneHours.toString().length < 2) {timezoneHours = "0" + timezoneHours;}
        let timezoneMinutes = parseInt(race.time.substring(3,5));
        while (timezoneMinutes.toString().length < 2) {timezoneMinutes = "0" + timezoneMinutes;}
        return timezoneHours + ':' + timezoneMinutes;
    }

    getRaceDateWithOffset(race) {

        return (Date.parse(race.date) + (this.state.timezoneOffset*60*60*1000));
    }

    getDateFilter = () => {
        let elem = this;
        return function(race){ return elem.getRaceDateWithOffset(race) > Date.now(); }
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
                            <Link to={"/" + this.state.lang + "/" + reunion.datePath + "/R" + reunion.number}>
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
                        <Link className={this.state.race.number && this.state.race.number===raceNumber?'active':''} to={"/" + this.state.lang + "/" + this.state.date + "/R"+this.state.reunion.number+"/C" + raceNumber}>
                            C{raceNumber}
                            {raceNumber === this.state.reunion.qn ? <Q5Icon/> : ''}
                        </Link>
                    </li>
                );
            }
        }

		return <div id="calendar-result">

            <Helmet>
                <html lang={t("lang")}/>
                <title>{t("Programs & Results")}</title>
                <link rel="canonical" href={t("canonical")} />

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

                        <h1 class="page-title">{t("Programs & Results")}</h1>

                        <div className="bar-selector">
                            <div className="day-selector">
                                <ul>

                                    <li>
                                        <Link className={this.state.date === this.state.yesterday?'active':''} to={"/" + this.state.lang + "/calendar-results/" + this.state.yesterday} onClick={() => this.setDate(this.state.yesterday, 'first')}><Trans i18nKey="Yesterday">Yesterday</Trans></Link>
                                    </li>
                                    <li>
                                        <Link className={this.state.date === this.state.today?'active':''} to={"/" + this.state.lang + "/calendar-results/" + this.state.today} onClick={() => this.setDate(this.state.today, 'next')}><Trans i18nKey="Today">Today</Trans></Link>
                                    </li>
                                    <li>
                                        <Link className={this.state.date === this.state.tomorrow?'active':''} to={"/" + this.state.lang + "/calendar-results/" + this.state.tomorrow} onClick={() => this.setDate(this.state.tomorrow, 'next')}><Trans i18nKey="Tomorrow">Tomorrow</Trans></Link>
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
                            this.state.race
                                ?
                                <Banner {...this.state}/>
                                :
                                null
                        }

                        <div className="container" style={{marginTop:20}}>
                            <div className="data-holder">

                                <div className="btn-holder d-none d-md-block">
                                    <Link className={this.state.date === this.state.yesterday?'btn btn-info active':'btn btn-info'} to={"/"+ this.state.lang + "/calendar-results/" + this.state.yesterday} onClick={() => this.setDate(this.state.yesterday)}><Trans i18nKey="Yesterday">Yesterday</Trans></Link>
                                    <Link className={this.state.date === this.state.today?'btn btn-info active':'btn btn-info'} to={"/" + this.state.lang + "/calendar-results/" + this.state.today} onClick={() => this.setDate(this.state.today)}><Trans i18nKey="Today">Today</Trans></Link>
                                    <Link className={this.state.date === this.state.tomorrow?'btn btn-info active':'btn btn-info'} to={"/" + this.state.lang + "/calendar-results/" + this.state.tomorrow} onClick={() => this.setDate(this.state.tomorrow)}><Trans i18nKey="Tomorrow">Tomorrow</Trans></Link>

                                    <div className="filters">
                                        <button onClick={()=>this.setFilter('all')} className={this.state.filter === 'all'?'btn btn-info active':'btn btn-info'} type="button"><Trans i18nKey="All races">All races</Trans></button>
                                        <button onClick={()=>this.setFilter('next')} className={this.state.filter === 'next'?'btn btn-info active':'btn btn-info'} type="button"><Trans i18nKey="Next">Next</Trans></button>
                                    </div>
                                </div>

                                {
                                    this.state.races
                                    ?
                                        this.state.filter === 'next'
                                        ?
                                            _.filter(this.state.races[this.state.date], this.getDateFilter()).map((race, indexRace) =>
                                                <div key={race.id} className="calendar-row">
                                                    <div>

                                                        <div className="calendar-name" onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>
                                                            R{race.reunion.number}C{race.number} - {race.labelLong}
                                                            { _.findIndex(race.bets, {lib : 'QN' }) !== -1 ? <Q5Icon/> : ''}
                                                        </div>

                                                        <div className="calendar-time" style={{textAlign:'center'}} onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>
                                                            {this.getRaceTime(race)}
                                                        </div>
                                                        <div className="calendar-runners" style={{textAlign:'center'}} onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>{race.runners.length} <Trans i18nKey="runners">runners</Trans></div>
                                                        <div className="calendar-btn">
                                                            {
                                                                this.getRaceDateWithOffset(race) < Date.now()
                                                                    ?
                                                                    <Link className="btn btn-access" to={"/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number}>
                                                                        <Trans i18nKey="Results">Results</Trans>
                                                                    </Link>
                                                                    :
                                                                    <BetButton className="btn btn-access bet-now" race={race}/>
                                                            }
                                                        </div>
                                                    </div>
                                                    {
                                                        race.results.length
                                                            ?
                                                            <div className="calendar-results" style={{textAlign:'center'}} onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>
                                                                <div className="calendar-results-numbers">
                                                                    {
                                                                        race.results.slice(0, 8).map((runner, indexRunner) =>
                                                                            <span key={runner.id}>{runner.number}</span>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div className="calendar-results-time"></div>
                                                            </div>
                                                            :
                                                            null
                                                    }
                                                </div>
                                            )
                                        :
                                            this.state.races[this.state.date].map((race, indexRace) =>
                                                <div key={race.id} className="calendar-row">
                                                    <div>

                                                        <div className="calendar-name" onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>
                                                            R{race.reunion.number}C{race.number} - {race.labelLong}
                                                            { _.findIndex(race.bets, {lib : 'QN' }) !== -1 ? <Q5Icon/> : ''}
                                                        </div>

                                                        <div className="calendar-time" style={{textAlign:'center'}} onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>
                                                            {this.getRaceTime(race)}
                                                        </div>
                                                        <div className="calendar-runners" style={{textAlign:'center'}} onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>{race.runners.length} <Trans i18nKey="runners">runners</Trans></div>
                                                        <div className="calendar-btn">
                                                            {
                                                                this.getRaceDateWithOffset(race) < Date.now()
                                                                    ?
                                                                    <a className="btn btn-access" href={"/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number}>
                                                                        <Trans i18nKey="Results">Results</Trans>
                                                                    </a>
                                                                    :
                                                                    <BetButton className="btn btn-access bet-now" race={race}/>
                                                            }
                                                        </div>
                                                    </div>
                                                    {
                                                        race.results.length
                                                        ?
                                                            <div className="calendar-results" style={{textAlign:'center'}} onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>
                                                                <div className="calendar-results-numbers">
                                                                    {
                                                                        race.results.slice(0, 8).map((runner, indexRunner) =>
                                                                            <span key={indexRunner}>{runner.number}</span>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div className="calendar-results-time"></div>
                                                            </div>
                                                        :
                                                            <div className="calendar-waiting-results calendar-results">
                                                                <div className="calendar-results-numbers"></div>
                                                                <div className="calendar-results-time"></div>
                                                            </div>
                                                    }
                                                </div>
                                            )
                                    :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
		</div>;
	}
}
