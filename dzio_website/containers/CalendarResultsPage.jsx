import React, {Component} from "react";
import { Link } from 'react-router-dom'
import MainMenu from "../components/MainMenu.jsx";
import Footer from "../components/shared/footer/footer";
import _ from "lodash";

import { useTranslation, Trans } from "react-i18next";
import { raceActions } from '../actions/race';


import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Calendar from "react-calendar";
import Banner from "../components/Banner";
import BannerAdmin from "../components/BannerAdmin";
const { t, i18n } = useTranslation();

export default class CalendarResultsPage extends Component {

    constructor(props) {

        super(props);

        let timezoneOffset = (new Date().getTimezoneOffset()*-1 - 120) / 60;

        let date = new Date();
        //date.setTime(date.getTime() + (2*60*60*1000)); // ADDING 2 HOURS FOR ARMENIA
        let today = date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2);
        date.setDate(date.getDate()-1);
        let yesterday = date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2);
        date.setDate(date.getDate()+2);
        let tomorrow = date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2);

        let dateCalendar = new Date();
        let minDateCalendar = new Date().setMonth(new Date().getMonth()-2);
        let maxDateCalendar = new Date().setDate(new Date().getDate()+1);

        this.state = {
            timezoneOffset: timezoneOffset,
            lang: this.props.match.params.lang,
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
            race: null
        };
    }

    async componentWillMount() {

        raceActions.getNext(this.state.lang).then((response) => {

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

    toggleCalendarSelector() {

        this.setState({calendarSelectorOpened:!this.state.calendarSelectorOpened});
    }

	render() {

		return <div id="calendar-result">
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
                                        <Link className={this.state.date === this.state.yesterday?'active':''} to={"/"+ this.state.lang + "/calendar-results/" + this.state.yesterday} onClick={() => this.setDate(this.state.yesterday)}><Trans i18nKey="Yesterday">Yesterday</Trans></Link>
                                    </li>
                                    <li>
                                        <Link className={this.state.date === this.state.today?'active':''} to={"/" + this.state.lang + "/calendar-results/" + this.state.today} onClick={() => this.setDate(this.state.today)}><Trans i18nKey="Today">Today</Trans></Link>
                                    </li>
                                    <li>
                                        <Link className={this.state.date === this.state.tomorrow?'active':''} to={"/" + this.state.lang + "/calendar-results/" + this.state.tomorrow} onClick={() => this.setDate(this.state.tomorrow)}><Trans i18nKey="Tomorrow">Tomorrow</Trans></Link>
                                    </li>
                                </ul>
                                <ul className="calendar-selector">
                                    <li>
                                        <a className="meeting-selected" href="javascript:;" onClick={() => this.toggleCalendarSelector()}>
                                            <FontAwesomeIcon icon="calendar-alt" />
                                        </a>
                                        {
                                            this.state.calendarSelectorOpened
                                                ?
                                                <Calendar
                                                    locale={this.state.lang}
                                                    onClickDay={(date) => this.setDate(date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2))}
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
                                            _.filter(this.state.races[this.state.date], function(race){ return Date.parse(race.date) > Date.now(); }).map((race, indexRace) =>
                                                <div className="calendar-row">
                                                    <div key={indexRace}>

                                                        <div className="calendar-name" onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>
                                                            R{race.reunion.number}C{race.number} - {race.labelLong}
                                                            { _.findIndex(race.bets, {lib : 'QN' }) !== -1 ? <i className="widget__icon widget__icon--quinte" data-reactid="1068"></i> : ''}
                                                        </div>

                                                        <div className="calendar-time" style={{textAlign:'center'}} onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>
                                                            {race.time}
                                                        </div>
                                                        <div className="calendar-runners" style={{textAlign:'center'}} onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>{race.runners.length} <Trans i18nKey="runners">runners</Trans></div>
                                                        <div className="calendar-btn">
                                                            {
                                                                Date.parse(race.date) < Date.now()
                                                                    ?
                                                                    <a className="btn btn-access" href={"/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number}>
                                                                        <Trans i18nKey="Results">Results</Trans>
                                                                    </a>
                                                                    :
                                                                    <a target="_blank" className="btn btn-access" href="https://www.vivarobet.am">
                                                                        <Trans i18nKey="Bet now">Bet now</Trans>
                                                                    </a>
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
                                                            null
                                                    }
                                                </div>
                                            )
                                        :
                                            this.state.races[this.state.date].map((race, indexRace) =>
                                                <div className="calendar-row">
                                                    <div key={indexRace}>

                                                        <div className="calendar-name" onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>
                                                            R{race.reunion.number}C{race.number} - {race.labelLong}
                                                            { _.findIndex(race.bets, {lib : 'QN' }) !== -1 ? <i className="widget__icon widget__icon--quinte" data-reactid="1068"></i> : ''}
                                                        </div>

                                                        <div className="calendar-time" style={{textAlign:'center'}} onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>
                                                            {race.time}
                                                        </div>
                                                        <div className="calendar-runners" style={{textAlign:'center'}} onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>{race.runners.length} <Trans i18nKey="runners">runners</Trans></div>
                                                        <div className="calendar-btn">
                                                            {
                                                                Date.parse(race.date) < Date.now()
                                                                    ?
                                                                    <a className="btn btn-access" href={"/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number}>
                                                                        <Trans i18nKey="Results">Results</Trans>
                                                                    </a>
                                                                    :
                                                                    <a target="_blank" className="btn btn-access" href="https://www.vivarobet.am">
                                                                        <Trans i18nKey="Bet now">Bet now</Trans>
                                                                    </a>
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
                                                            null
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
