import React, {Component} from "react";
import { Link } from 'react-router-dom'
import MainMenu from "../components/MainMenu.jsx";
import Footer from "../components/shared/footer/footer";
import _ from "lodash";

import { useTranslation, Trans } from "react-i18next";
import { raceActions } from '../actions/race';
import { reunionActions } from '../actions/reunion';

import "./../assets/css/main.scss";

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Race from "../components/Race";
const { t, i18n } = useTranslation();

export default class HomePage extends Component {

    constructor(props) {

        super(props);
        this.state = {

            reunions: false,
            nextRace: false,
            nextQ5: false,
            day: 'today',
            reunion: false,
            race: false,
            reunionSelectorOpened: false,
            predictionTop: [],
            runnerSelected: [],
            predictions: [],
            weather: {
                wind : {
                    speed : '35km/h',
                    direction : 'Sud-Ouest',
                },
                degree : '12°',
                state : 'Peu nuageux'

            }
        };
    }

    async componentWillMount() {

        reunionActions.getAll().then((response) => {

            this.setState({reunions : response.reunions})
        });

        raceActions.getNextQ5().then((response) => {

            this.setState({nextQ5 : response.race})
        });

        if(typeof this.props.match.params.reunionId !== 'undefined' && typeof this.props.match.params.raceNumber !== 'undefined') {

            this.setRace(this.props.match.params.reunionId, this.props.match.params.raceNumber);
        }
        else if(typeof this.props.match.params.reunionId !== 'undefined') {

            this.setReunion(this.props.match.params.reunionId);
        }
        else {

            raceActions.getNext().then((response) => {

                let day = response.race.yesterday ? 'yesterday' : (response.race.today ? 'today' : (response.race.today ? 'tomorrow' : 'today'));

                this.setState({
                    day : day,
                    reunion : response.race.reunion,
                    race : response.race,
                    predictionTop : response.race.reporters_top,
                    predictions : _.compact(_.concat(response.race.reportersGeny, response.race.reporters_best, response.race.reporters_others))
                });
            });
        }
    }

    setReunion(reunionID) {

        let reunion = _.find(this.state.reunions[this.state.day], function(reunion){ return reunion.id === reunionID; });

        this.setState({
            reunion : reunion,
            race : null,
            predictionTop : null,
            predictions : null
        });
        this.setRace(reunionID, 1);
    }

    setRace(reunionID, raceNumber) {

        raceActions.get(reunionID, raceNumber).then((response) => {

            let day = response.race.yesterday ? 'yesterday' : (response.race.today ? 'today' : (response.race.today ? 'tomorrow' : 'today'));

            this.setState({
                day : day,
                reunion : response.race.reunion,
                race : response.race,
                predictionTop : response.race.reporters_top,
                predictions : _.compact(_.concat(response.race.reportersGeny, response.race.reporters_best, response.race.reporters_others)),
                reunionSelectorOpened : false
            });
            this.props.history.push("/"+reunionID+"/R"+response.race.reunion.externNumber+"/C"+raceNumber);
        });
    }

    toggleReunionSelector() {

        this.setState({reunionSelectorOpened:!this.state.reunionSelectorOpened});
    }

    setDay(day) {

        console.log(day);
        console.log(this.state.reunions);
        this.setReunion(this.state.reunions[day][0].id);
    }

	render() {

        let listReunions = null;
	    if(this.state.reunions && this.state.day) {

            let reunions = this.state.reunions[this.state.day];
	        listReunions = reunions.map((reunion) =>
                <li key={reunion.id} className={this.reunion && this.reunion.id === reunion.id ? 'active' : ''}>
                    <Link to={"/" + reunion.id + "/R"+reunion.externNumber} onClick={() => this.setReunion(reunion.id)}>
                        <img src="https://www.equidia.fr/assets/img/icons-png/discipline_attele_w.png"/> <b>R{reunion.externNumber}</b> - {reunion.hippodromeName}
                    </Link>
                </li>
            );
        }

        let listRaces = [];
	    if(this.state.reunion && this.state.race) {

            for (let raceNumber = 1; raceNumber <= this.state.reunion.racesNumber; ++raceNumber) {
                listRaces.push(
                    <li key={raceNumber}>
                        <Link className={this.state.race.number && this.state.race.number===raceNumber?'active':''} to={"/" + this.state.reunion.id + "/R"+this.state.reunion.externNumber+"/C" + raceNumber} onClick={() => this.setRace(this.state.reunion.id, raceNumber)}>C{raceNumber}</Link>
                    </li>
                );
            }
        }

		return <div>
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
                            {
                                this.state.reunions
                                ?
                                    <div>
                                        {
                                            this.state.reunion
                                            ?
                                                <div className="meeting-selector">
                                                    <a className="meeting-selected" href="#" onClick={() => this.toggleReunionSelector()}>
                                                        <img src="https://www.equidia.fr/assets/img/icons-png/discipline_attele_w.png"/> <b>R{this.state.reunion.externNumber}</b> - {this.state.reunion.hippodromeName}
                                                    </a>
                                                    <ul style={this.state.reunionSelectorOpened ? {display:'block'} : null} className="meeting-selector-list">
                                                        {listReunions}
                                                    </ul>
                                                </div>
                                            :
                                                <div className="meeting-selector">
                                                    <a className="meeting-selected" href="#" onClick={() => this.toggleReunionSelector()}>
                                                        <img src="https://www.equidia.fr/assets/img/icons-png/discipline_attele_w.png"/> <Trans i18nKey="Select a Reunion">Select a Reunion</Trans>
                                                    </a>
                                                    <ul style={this.state.reunionSelectorOpened ? {display:'block'} : null} className="meeting-selector-list">
                                                        {listReunions}
                                                    </ul>
                                                </div>
                                        }
                                        <div className="race-selector">
                                            {
                                                this.state.reunions && this.state.day && this.state.reunion
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
                                <div className="banner inner-banner">

                                    <div className="container">
                                        <div className="text-holder">

                                        </div>
                                    </div>
                                </div>
                        }

                    </div>
                </div>
            </div>
            <Footer />
		</div>;
	}
}
