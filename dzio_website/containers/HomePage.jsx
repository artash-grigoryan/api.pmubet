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

        let date = new Date();
        let today = date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2);
        date.setDate(date.getDate()-1);
        let yesterday = date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2);
        date.setDate(date.getDate()+2);
        let tomorrow = date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2);

        this.state = {

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
            predictionTop: [],
            runnerSelected: [],
            predictions: []
        };
    }

    async componentWillMount() {

        this.setReunions();

        raceActions.getNextQ5().then((response) => {

            this.setState({nextQ5 : response.race})
        });

        if(typeof this.props.match.params.raceNumber !== 'undefined') {

            this.setRace(this.props.match.params.date, this.props.match.params.reunionNumber, this.props.match.params.raceNumber);
        }
        else if(typeof this.props.match.params.reunionNumber !== 'undefined') {

            this.setFirstRaceByReunion(this.props.match.params.date, this.props.match.params.reunionNumber);
        }
        else if(typeof this.props.match.params.date !== 'undefined') {

            this.setReunions(this.props.match.params.date);
            this.setFirstRaceByDate(this.props.match.params.date)
        }
        else {

            this.setNextRace()
        }
    }

    setReunions(date) {

        reunionActions.getAll().then((response) => {
            let reunions = _.groupBy(response.reunions, 'datePath');
            this.setState({reunions : reunions});
        });
        if(typeof date === 'undefined') {

        }
        else {


        }
    }

    setNextRace() {

        raceActions.getNext().then((response) => {

            this.setState({
                date : response.race.datePath,
                reunion : response.race.reunion,
                race : response.race,
                predictionTop : response.race.reporters_top,
                predictions : _.compact(_.concat(response.race.reportersGeny, response.race.reporters_best, response.race.reporters_others))
            });
        });
    }

    setFirstRaceByDate(date) {

        raceActions.getFirstByDate(date).then((response) => {

            this.setState({
                date : response.race.datePath,
                reunion : response.race.reunion,
                race : response.race,
                predictionTop : response.race.reporters_top,
                predictions : _.compact(_.concat(response.race.reportersGeny, response.race.reporters_best, response.race.reporters_others)),
                reunionSelectorOpened : false
            });
            this.props.history.push("/"+response.race.datePath+"/R"+response.race.reunion.number+"/C"+response.race.number);
        });
    }

    setFirstRaceByReunion(date, reunionNumber) {

        raceActions.getFirstByReunion(date, reunionNumber).then((response) => {

            this.setState({
                date : response.race.datePath,
                reunion : response.race.reunion,
                race : response.race,
                predictionTop : response.race.reporters_top,
                predictions : _.compact(_.concat(response.race.reportersGeny, response.race.reporters_best, response.race.reporters_others)),
                reunionSelectorOpened : false
            });
            this.props.history.push("/"+response.race.datePath+"/R"+response.race.reunion.number+"/C"+response.race.number);
        });
    }

    setRace(date, reunionNumber, raceNumber) {

        raceActions.get(date, reunionNumber, raceNumber).then((response) => {

            this.setState({
                date : response.race.datePath,
                reunion : response.race.reunion,
                race : response.race,
                predictionTop : response.race.reporters_top,
                predictions : _.compact(_.concat(response.race.reportersGeny, response.race.reporters_best, response.race.reporters_others)),
                reunionSelectorOpened : false
            });
            this.props.history.push("/"+response.race.datePath+"/R"+response.race.reunion.number+"/C"+response.race.number);
        });
    }

    toggleReunionSelector() {

        this.setState({reunionSelectorOpened:!this.state.reunionSelectorOpened});
    }

    setDate(date) {

        this.setState({date});
        this.setFirstRaceByDate(date);
    }

	render() {

        let listReunions = null;
	    if(this.state.reunions && this.state.date) {

            let reunions = this.state.reunions[this.state.date];
	        listReunions = reunions.map((reunion) =>
                <li key={reunion.id} className={this.reunion && this.reunion.id === reunion.id ? 'active' : ''}>
                    <Link to={"/" + reunion.datePath + "/R" + reunion.number} onClick={() => this.setFirstRaceByReunion(reunion.datePath, reunion.number)}>
                        <img src="https://www.equidia.fr/assets/img/icons-png/discipline_attele_w.png"/> <b>R{reunion.number}</b> - {(reunion.translation ? reunion.translation.hippodromeName : null) || reunion.hippodromeName}
                    </Link>
                </li>
            );
        }

        let listRaces = [];
	    if(this.state.date && this.state.reunion && this.state.race) {

            for (let raceNumber = 1; raceNumber <= this.state.reunion.racesNumber; ++raceNumber) {

                listRaces.push(
                    <li key={raceNumber}>
                        <Link className={this.state.race.number && this.state.race.number===raceNumber?'active':''} to={"/" + this.state.date + "/R"+this.state.reunion.number+"/C" + raceNumber} onClick={() => this.setRace(this.state.date, this.state.reunion.number, raceNumber)}>C{raceNumber}</Link>
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
                                        <Link className={this.state.date === this.state.yesterday?'active':''} to={"/" + this.state.yesterday} onClick={() => this.setDate(this.state.yesterday)}><Trans i18nKey="Yesterday">Yesterday</Trans></Link>
                                    </li>
                                    <li>
                                        <Link className={this.state.date === this.state.today?'active':''} to={"/" + this.state.today} onClick={() => this.setDate(this.state.today)}><Trans i18nKey="Today">Today</Trans></Link>
                                    </li>
                                    <li>
                                        <Link className={this.state.date === this.state.tomorrow?'active':''} to={"/" + this.state.tomorrow} onClick={() => this.setDate(this.state.tomorrow)}><Trans i18nKey="Tomorrow">Tomorrow</Trans></Link>
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
                                                        <img src="https://www.equidia.fr/assets/img/icons-png/discipline_attele_w.png"/> <b>R{this.state.reunion.number}</b> - {(this.state.reunion.translation ? this.state.reunion.translation.hippodromeName : null) || this.state.reunion.hippodromeName}
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
