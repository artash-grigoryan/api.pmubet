import React, {Component} from "react";
import { Link } from 'react-router-dom'
import MainMenu from "../components/MainMenu.jsx";
import Footer from "../components/shared/footer/footer";
import _ from "lodash";
import { faCalendarAlt } from '@fortawesome/fontawesome-free-solid'
import { useTranslation, Trans } from "react-i18next";
import { raceActions } from '../actions/race';
import { reunionActions } from '../actions/reunion';
import Countdown from 'react-countdown-now';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Race from "../components/Race";
const { t, i18n } = useTranslation();

export default class CalendarResultsPage extends Component {

    constructor(props) {

        super(props);
        this.state = {
            day : 'today',
            filter : 'all',
            races : null
        };
    }

    async componentWillMount() {

        raceActions.getAll().then((response) => {

            this.setState({
                races : response.races
            });
        });
    }

    setDay(day) {

        this.setState({
            day : day,
            filter : 'all'
        });
    }

    setFilter(filter) {

        this.setState({
            filter : filter,
        });
    }

	render() {

		return <div id="calendar-result">
            <header>
                <MainMenu/>
            </header>

            <div className="container-fluid">
                <div id="wrapper">
                    <div id="main">

                        <div className="bar-selector">
                            <div className="day-selector">
                                <ul>

                                    <li>
                                        <a className={this.state.day === 'yesterday' ? 'active' : ''} href="#" onClick={() => this.setDay('yesterday')}><Trans i18nKey="Yesterday">Yesterday</Trans></a>
                                    </li>
                                    <li>
                                        <a className={this.state.day === 'today' ? 'active' : ''} href="#" onClick={() => this.setDay('today')}><Trans i18nKey="Today">Today</Trans></a>
                                    </li>
                                    <li>
                                        <a className={this.state.day === 'tomorrow' ? 'active' : ''} href="#" onClick={() => this.setDay('tomorrow')}><Trans i18nKey="Tomorrow">Tomorrow</Trans></a>
                                    </li>
                                </ul>
                                <ul className="calendar-selector">
                                    <li>
                                        <a href="#">
                                            <FontAwesomeIcon icon="calendar-alt" />
                                        </a>
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

                                    <div style={{marginTop: '30px'}}><a target="_blank" className="btn btn-md" href="https://www.vivarobet.am"><Trans i18nKey="Bet on Vivaro">Bet on Vivaro</Trans></a></div>
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
                                                    _.filter(this.state.races[this.state.day], function(race){ return Date.parse(race.date) > Date.now(); }).map((race, indexRace) =>
                                                        <tr key={indexRace}>

                                                            <td className="name-cell">
                                                                R{race.reunion.number}C{race.number} - {race.labelLong}

                                                            </td>

                                                            <td style={{textAlign:'center'}}>
                                                                {race.time}
                                                            </td>
                                                            <td style={{textAlign:'center'}}>{race.runners.length} <Trans i18nKey="runners">runners</Trans></td>
                                                            <td style={{textAlign:'center'}}>
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
                                                                    race.results.length > 0
                                                                        ?
                                                                        <a className="btn btn-access" href={"/" + race.reunion.id + "/R"+race.reunion.number+"/C" + race.number}>
                                                                            <Trans i18nKey="Results">Results</Trans>
                                                                        </a>
                                                                        :
                                                                        <a className="btn btn-access" href={"/" + race.reunion.id + "/R"+race.reunion.number+"/C" + race.number}>
                                                                            <Trans i18nKey="Live">Live</Trans>
                                                                        </a>
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                :
                                                    this.state.races[this.state.day].map((race, indexRace) =>
                                                        <tr key={indexRace}>

                                                            <td className="name-cell">
                                                                R{race.reunion.number}C{race.number} - {race.labelLong}

                                                            </td>

                                                            <td style={{textAlign:'center'}}>
                                                                {race.time}
                                                            </td>
                                                            <td style={{textAlign:'center'}}>{race.runners.length} <Trans i18nKey="runners">runners</Trans></td>
                                                            <td style={{textAlign:'center'}}>
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
                                                                    race.results.length > 0
                                                                    ?
                                                                        <a className="btn btn-access" href={"/" + race.reunion.id + "/R"+race.reunion.number+"/C" + race.number}>
                                                                            <Trans i18nKey="Results">Results</Trans>
                                                                        </a>
                                                                    :
                                                                        <a className="btn btn-access" href={"/" + race.reunion.id + "/R"+race.reunion.number+"/C" + race.number}>
                                                                            <Trans i18nKey="Live">Live</Trans>
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
