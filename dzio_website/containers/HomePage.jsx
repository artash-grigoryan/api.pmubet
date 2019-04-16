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

import "./../assets/css/bootstrap.min.css";
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

        raceActions.getNext().then((response) => {

            let predictions = response.race.reporters;
            let predictionTop = response.race.reporters.shift();
            this.setState({
                reunion : response.race.reunion,
                race : response.race,
                predictionTop : predictionTop,
                predictions : predictions
            });
            let day = 'today';
            if(response.race.yesterday) {
                day = 'yesterday';
            }
            if(response.race.today) {
                day = 'today';
            }
            if(response.race.tomorrow) {
                day = 'tomorrow';
            }
            this.setState({day : day});
        });

        raceActions.getNextQ5().then((response) => {

            this.setState({nextQ5 : response.race})
        });
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
        this.setState({reunionSelectorOpened:false});
    }

    setRace(reunionID, raceNumber) {

        raceActions.get(reunionID, raceNumber).then((response) => {

            let predictions = response.race.reporters;
            let predictionTop = response.race.reporters.shift();
            this.setState({
                reunion : response.race.reunion,
                race : response.race,
                predictionTop : predictionTop,
                predictions : predictions
            });
        });
    }

    toggleReunionSelector() {

        this.setState({reunionSelectorOpened:!this.state.reunionSelectorOpened});
    }

    setDay(day) {

        this.setState({day : day});
        this.setState({race : null});
        this.setState({reunion : null});
    }

	render() {

        let listReunions = null;
	    if(this.state.reunions && this.state.day) {

	        let reunions = [];
	        switch (this.state.day) {

                case 'yesterday' :
                    reunions = this.state.reunions.yesterday;
                    break;
                case 'today' :
                    reunions = this.state.reunions.today;
                    break;
                case 'tomorrow' :
                    reunions = this.state.reunions.tomorrow;
                    break;
            }
	        listReunions = reunions.map((reunion) =>
                <li key={reunion.id} className={this.reunion && this.reunion.id === reunion.id ? 'active' : ''}>
                    <a href="#" onClick={() => this.setReunion(reunion.id)}>
                        <img src="https://www.equidia.fr/assets/img/icons-png/discipline_attele_w.png"/> <b>R{reunion.externNumber}</b> - {reunion.hippodromeName}
                    </a>
                </li>
            );
        }

        let listRaces = [];
	    if(this.state.reunion && this.state.race) {

            for (let raceNumber = 1; raceNumber <= this.state.reunion.racesNumber; ++raceNumber) {
                listRaces.push(
                    <li key={raceNumber}>
                        <Link className={this.state.race.number && this.state.race.number===raceNumber?'active':''} to={"/" + this.state.reunion.id + "/" + this.state.race.number} onClick={() => this.setRace(this.state.reunion.id, raceNumber)}>C{raceNumber}</Link>
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
