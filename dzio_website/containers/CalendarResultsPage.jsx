import React, {Component} from "react";
import { Link } from 'react-router-dom'
import MainMenu from "../components/MainMenu.jsx";
import Footer from "../components/shared/footer/footer";
import _ from "lodash";
import { withRouter } from 'react-router-dom'
import { faCalendarAlt } from '@fortawesome/fontawesome-free-solid'
import { useTranslation, Trans } from "react-i18next";
import { raceActions } from '../actions/race';
import { reunionActions } from '../actions/reunion';
import Countdown from 'react-countdown-now';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Race from "../components/Race";
import Calendar from "react-calendar";
const { t, i18n } = useTranslation();

export default class CalendarResultsPage extends Component {

    constructor(props) {

        super(props);

        let date = new Date();
        date.setTime(date.getTime() + (2*60*60*1000)); // ADDING 2 HOURS FOR ARMENIA
        let today = date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2);
        date.setDate(date.getDate()-1);
        let yesterday = date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2);
        date.setDate(date.getDate()+2);
        let tomorrow = date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2);

        let dateCalendar = new Date();
        let minDateCalendar = new Date().setMonth(new Date().getMonth()-2);
        let maxDateCalendar = new Date().setDate(new Date().getDate()+1);

        this.state = {
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
            races : null
        };
    }

    async componentWillMount() {

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

                        <div className="banner inner-banner">

                            <div className="container">
                                <div className="text-holder">
                                    <h1>
                                        <Trans i18nKey="Calendar & Results">Calendar & Results</Trans>
                                    </h1>
                                    <p style={{marginTop: '20px',fontSize: '27px'}}>{this.state.date === this.state.today ? <Trans i18nKey="Today">Today</Trans> : (this.state.date === this.state.tomorrow ? <Trans i18nKey="Tomorrow">Tomorrow</Trans> : (this.state.date === this.state.yesterday ? <Trans i18nKey="Yesterday">Yesterday</Trans> : this.state.dateCalendar))}</p>

                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="data-holder">

                                <div className="btn-holder d-none d-md-block"
                                     style={{textAlign: 'center',margin: '40px 0px'}}>
                                    <button style={{margin: '0 10px'}} onClick={()=>this.setFilter('all')} className={this.state.filter === 'all'?'btn btn-info active':'btn btn-info'} type="button"><Trans i18nKey="All races">All races</Trans></button>
                                    <button style={{margin: '0 10px'}} onClick={()=>this.setFilter('next')} className={this.state.filter === 'next'?'btn btn-info active':'btn btn-info'} type="button"><Trans i18nKey="Next">Next</Trans></button>
                                </div>

                                <table style={{margin: '40px 0 0 0'}}>
                                    <tbody>
                                        {
                                            this.state.races
                                            ?
                                                this.state.filter === 'next'
                                                ?
                                                    _.filter(this.state.races[this.state.date], function(race){ return Date.parse(race.date) > Date.now(); }).map((race, indexRace) =>
                                                        <tr key={indexRace}>

                                                            <td className="name-cell" onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>
                                                                R{race.reunion.number}C{race.number} - {race.labelLong}

                                                            </td>

                                                            <td style={{textAlign:'center'}} onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>
                                                                {race.time}
                                                            </td>
                                                            <td style={{textAlign:'center'}} onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>{race.runners.length} <Trans i18nKey="runners">runners</Trans></td>
                                                            <td style={{textAlign:'center'}} onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>
                                                                {
                                                                    race.results.slice(0, 8).map((runner, indexRunner) =>
                                                                        <span key={indexRunner}>
                                                                            {indexRunner !== 0 ? ' - ' : ''}
                                                                            {runner.number}
                                                                        </span>
                                                                    )
                                                                }
                                                            </td>
                                                            <td className="btn-cell">
                                                                {
                                                                    Date.parse(race.date) < Date.now()
                                                                        ?
                                                                        <a className="btn btn-access" href={"/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number}>
                                                                            <Trans i18nKey="Results">Results</Trans>
                                                                        </a>
                                                                        :
                                                                        <a target="_blank" className="btn btn-access" href="https://www.vivarobet.am">
                                                                            <Trans i18nKey="Bet on Vivaro">Bet on Vivaro</Trans>
                                                                        </a>
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                :
                                                    this.state.races[this.state.date].map((race, indexRace) =>
                                                        <tr key={indexRace}>

                                                            <td className="name-cell" onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>
                                                                R{race.reunion.number}C{race.number} - {race.labelLong}

                                                            </td>

                                                            <td style={{textAlign:'center'}} onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>
                                                                {race.time}
                                                            </td>
                                                            <td style={{textAlign:'center'}} onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>{race.runners.length} <Trans i18nKey="runners">runners</Trans></td>
                                                            <td style={{textAlign:'center'}} onClick={()=>this.redirect("/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number)}>
                                                                {
                                                                    race.results.slice(0, 8).map((runner, indexRunner) =>
                                                                        <span key={indexRunner}>
                                                                            {indexRunner !== 0 ? ' - ' : ''}
                                                                            {runner.number}
                                                                        </span>
                                                                    )
                                                                }
                                                            </td>
                                                            <td className="btn-cell">
                                                                {
                                                                    Date.parse(race.date) < Date.now()
                                                                        ?
                                                                        <a className="btn btn-access" href={"/"+ this.state.lang + "/" + race.datePath + "/R"+race.reunion.number+"/C" + race.number}>
                                                                            <Trans i18nKey="Results">Results</Trans>
                                                                        </a>
                                                                        :
                                                                        <a target="_blank" className="btn btn-access" href="https://www.vivarobet.am">
                                                                            <Trans i18nKey="Bet on Vivaro">Bet on Vivaro</Trans>
                                                                        </a>
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                            :
                                                null
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
		</div>;
	}
}
