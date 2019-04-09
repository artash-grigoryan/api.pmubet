import React, {Component} from "react";
import MainMenu from "../components/MainMenu.jsx";
import Footer from "../components/shared/footer/footer";
import { faCalendarAlt } from '@fortawesome/fontawesome-free-solid'
import { useTranslation, Trans } from "react-i18next";
import { raceActions } from '../actions/race';
import { reunionActions } from '../actions/reunion';
import Countdown from 'react-countdown-now';

import "./../assets/css/bootstrap.min.css";
import "./../assets/css/main.scss";

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
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


            departure: new Date('2019-04-23 17:35:00'),
            participants: [
                {
                    'rank'  : 1,
                    'odds'  : 3.5,
                    'horse' : 'PHILIPPE CAMURAC',
                    'rider' : 'JULIEN'
                },
                {
                    'rank'  : 2,
                    'odds'  : 4.5,
                    'horse' : 'NICOLAS CRAMAIL',
                    'rider' : 'JULIEN RAFFESTIN'
                },
                {
                    'rank'  : 3,
                    'odds'  : 4,
                    'horse' : 'ARTASH GRIGORYAN',
                    'rider' : 'JULIEN RAFFESTIN'
                },
                {
                    'rank'  : 4,
                    'odds'  : 4,
                    'horse' : 'NARE CAMURAC',
                    'rider' : 'JULIEN RAFFESTIN'
                },
                {
                    'rank'  : 5,
                    'odds'  : 4,
                    'horse' : 'TRUC MUCH',
                    'rider' : 'JULIEN RAFFESTIN'
                },
            ],
            distance: 1250,
            sport: 'atelé',
            weather: {
                wind : {
                    speed : '35km/h',
                    direction : 'Sud-Ouest',
                },
                degree : '12°',
                state : 'Peu nuageux'

            },
            predictions: {
                list : [12, 8, 24],
                details : [
                    {
                        number : 12,
                        runner : {
                            horse : 'CARLA DU HOULME',
                        },
                        description : 'Pieds nues, Carla du Houlme fait face é son objectif. Ses derniéres sorties sont bonnes et sur sa forme, elle devrait jouer les premiers réles.'
                    },
                    {
                        number : 8,
                        runner : {
                            horse : 'TRUC',
                        },
                        description : 'description 2'
                    },
                    {
                        number : 24,
                        runner : {
                            horse : 'MUCH',
                        },
                        description : 'description 3'
                    },
                ]
            }

        };
    }

    async componentWillMount() {

        reunionActions.getAll().then((response) => {

            this.setState({reunions : response.reunions})
        });

        raceActions.getNext().then((response) => {

            this.setState({race : response.race})
            this.setState({reunion : response.race.reunion})
        });

        raceActions.getNextQ5().then((response) => {

            this.setState({nextQ5 : response.race})
        });
    }

    renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return null;
        } else {
            // Render a countdown
            return <span><Trans i18nKey="Departure in">Departure in</Trans> {hours} {hours>1?<Trans i18nKey="hours">hours</Trans>:<Trans i18nKey="hour">hour</Trans>} {minutes} {hours>1?<Trans i18nKey="minutes">minutes</Trans>:<Trans i18nKey="minute">minute</Trans>}</span>;
        }
    };

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
                    <a href="#">
                        <img src="https://www.equidia.fr/assets/img/icons-png/discipline_attele_w.png"/> <b>R{reunion.externNumber}</b> - {reunion.hippodromeName}
                    </a>
                </li>
            );
        }

        let listRaces = [];
	    if(this.state.reunion) {

            for (let raceNumber = 1; raceNumber <= this.state.reunion.racesNumber; ++raceNumber) {
                listRaces.push(
                    <li key={raceNumber}>
                        <a className={this.state.race.number && this.state.race.number===raceNumber?'active':''} href="#">C{raceNumber}</a>
                    </li>
                );
            }
        }

        let listBets = [];
        if(this.state.race) {

            let simple = false;
            let couple = false;
            let coupleOrdre = false;
            let trio = false;
            let twoOnFour = false;
            let multi = false;
            let tierce = false;
            let quarte = false;
            let quintePlus = false;
            
            this.state.race.bets.map((bet) => {
                
                switch (bet.lib) {

                    case 'SG':
                    case 'SP':
                    case 'ESG':
                        simple = true;
                        break;
                    case 'CG':
                    case 'ECG':
                        couple = true;
                        break;
                    case 'CP':
                    case 'ECP':
                        coupleOrdre = true;
                        break;
                    case 'TR':
                    case 'ETR':
                        trio = true;
                        break;
                    case 'C4':
                    case 'EC4':
                        twoOnFour = true;
                        break;
                    case 'MI':
                    case 'EMI':
                        multi = true;
                        break;
                    case 'T':
                    case 'ET':
                        tierce = true;
                        break;
                    case 'QP':
                    case 'EQP':
                        quarte = true;
                        break;
                    case 'QN':
                    case 'EQN':
                        quintePlus = true;
                        break;
                }
            });

            if(simple) {
                listBets.push(
                    <img key="SG" src="/assets/img/bets/SG.png" alt=""/>
                );
            }
            if(couple) {
                listBets.push(
                    <img key="CG" src="/assets/img/bets/CG.png" alt=""/>
                );
            }
            if(coupleOrdre) {
                listBets.push(
                    <img key="CP" src="/assets/img/bets/CP.png" alt=""/>
                );
            }
            if(trio) {
                listBets.push(
                    <img key="TR" src="/assets/img/bets/TR.png" alt=""/>
                );
            }
            if(twoOnFour) {
                listBets.push(
                    <img key="C4" src="/assets/img/bets/C4.png" alt=""/>
                );
            }
            if(multi) {
                listBets.push(
                    <img key="MI" src="/assets/img/bets/MI.png" alt=""/>
                );
            }
            if(tierce) {
                listBets.push(
                    <img key="T" src="/assets/img/bets/T.png" alt=""/>
                );
            }
            if(quarte) {
                listBets.push(
                    <img key="QP" src="/assets/img/bets/QP.png" alt=""/>
                );
            }
            if(quintePlus) {
                listBets.push(
                    <img key="QN" src="/assets/img/bets/QN.png" alt=""/>
                );
            }
        }

        let listRunners = [];
        if(this.state.race) {
            listRunners = this.state.race.runners.map((runner) =>
                <tr key={runner.number} className="runner">
                    <td className="runner-rank">{runner.number}</td>
                    <td className="runner-img">
                        <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                    </td>
                    <td className="runner-name">
                        <a href="#">{runner.name}</a>
                        <span>{runner.jokey}</span>
                    </td>
                    <td className="runner-cote">
                        <span>{runner.odds}</span>
                    </td>
                </tr>
            );
        }

	    let listPredictions = [];
        if(this.state.race) {
            listPredictions = this.state.race.reporters.map((reporter) =>
                <div key={reporter.id} className="previsions">
                    <p className="reporter">
                        <b>{reporter.reporter}</b> <br/>
                        {reporter.societe}
                    </p>
                    <ul>
                        {
                            reporter.predictions.map((prediction) =>
                                <li key={prediction.id}><span>{prediction.number}</span></li>
                            )
                        }
                    </ul>
                </div>
            );
            console.log(listPredictions);
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
                                        <a className={this.state.race.yesterday ? 'active' : ''} href="#"><Trans i18nKey="Yesterday">Yesterday</Trans></a>
                                    </li>
                                    <li>
                                        <a className={this.state.race.today ? 'active' : ''} href="#"><Trans i18nKey="Today">Today</Trans></a>
                                    </li>
                                    <li>
                                        <a className={this.state.race.tomorrow ? 'active' : ''} href="#"><Trans i18nKey="Tomorrow">Tomorrow</Trans></a>
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
                                                    <a className="meeting-selected" href="#">
                                                        <img src="https://www.equidia.fr/assets/img/icons-png/discipline_attele_w.png"/> <b>R{this.state.reunion.externNumber}</b> - {this.state.reunion.hippodromeName}
                                                    </a>
                                                    <ul className="metting-selector-list">
                                                        {listReunions}
                                                    </ul>
                                                </div>
                                            :
                                                <div className="meeting-selector">
                                                    <a className="meeting-selected" href="#">
                                                        <img src="https://www.equidia.fr/assets/img/icons-png/discipline_attele_w.png"/> <Trans i18nKey="Select a Reunion">Select a Reunion</Trans>
                                                    </a>
                                                    <ul className="metting-selector-list">
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
                            this.state.race
                            ?
                                <div>
                                    <div className="banner inner-banner">

                                        <div className="container">
                                            <div className="text-holder">
                                                <h1>
                                                    <time>
                                                        {this.state.race.today ? <Trans i18nKey="Today">Today</Trans> : (this.state.race.tomorrow ? <Trans i18nKey="Tomorrow">Tomorrow</Trans> : this.state.race.day)} {this.state.race.time}
                                                    </time>
                                                    <b>R{this.state.reunion.externNumber}C{this.state.race.number} </b>
                                                    {this.state.race.labelLong}
                                                </h1>

                                                <div className="btn-holder">
                                                    <Countdown
                                                        date={this.state.race.date}
                                                        renderer={this.renderer}
                                                    />
                                                </div>

                                                <div style={{marginTop: "30px"}}><a className="btn btn-md" href="#">{t('Bet on Vivaro')}</a></div>
                                            </div>
                                        </div>
                                    </div>

                                    <section className="info-section" style={{background: "#fff"}}>
                                        <div className="container">

                                            <div className="block-race-condition">

                                                <div className="picto-meteo">
                                                    <img src="https://www.equidia.fr/assets/img/meteo/P4_grand.png"/>
                                                </div>

                                                <div className="row m-b-10">
                                                    <div className="col-md-3">
                                                        <div className="info-line-1">
                                                            <Trans i18nKey="Participants">Participants</Trans> :<br/>
                                                            <b>{this.state.race.runners.length} <Trans i18nKey="Runners">Runners</Trans></b>
                                                        </div>
                                                        <div className="info-line-2">
                                                            Distance :<br/>
                                                            <b>{this.state.race.distance} <Trans i18nKey="meters">meters</Trans></b>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="info-line-1">
                                                            <Trans i18nKey="Sport">Sport</Trans> :<br/>
                                                            <b>{this.state.race.discipline}</b>
                                                        </div>
                                                        <div className="info-line-2">
                                                            <Trans i18nKey="Diffusion">Diffusion</Trans> :<br/>
                                                            <b>TODO</b>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="bet-selector">
                                                            {listBets}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="info-line-1">
                                                        </div>
                                                        <div className="info-line-2">
                                                            <div className="text-right">
                                                                <b>{this.state.weather.degree} {this.state.weather.state} / {this.state.weather.wind.speed}<br/>
                                                                    {this.state.weather.wind.direction}</b>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>


                                    <section className="info-section">
                                        <div className="container">

                                            <div className="row">

                                                <div className="col-lg-4 col-md-12">
                                                    <div className="title double-title m-b-0">
                                                        <h3>The runners</h3>
                                                        <span className="add-value"><img src="https://www.equidia.fr/assets/img/icons-png/discipline_trot.png" alt="Monté"/><span>R{this.state.reunion.externNumber} C{this.state.race.number}</span></span>
                                                    </div>
                                                    <div className="runners-tab">
                                                        <table className="table-striped">
                                                            <tbody>
                                                            {listRunners}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>

                                                {
                                                    new Date(this.state.race.date).getTime() > Date.now()
                                                        ?
                                                        <div className="col-lg-5 col-md-12">
                                                            <div className="title" style={{marginBottom: 0}}>
                                                                <h3><Trans i18nKey="Predictions">Predictions</Trans>
                                                                </h3>
                                                            </div>
                                                            <div className="previsions-container">
                                                                {listPredictions}
                                                            </div>
                                                        </div>
                                                        :
                                                        null
                                                }

                                                <div className="col-lg-3 col-md-12" style={{marginTop: "61px"}}>
                                                    {
                                                        this.state.nextQ5
                                                            ?
                                                            <div className="adv-1">
                                                                <a className="widget widget__quinte" href="#">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div className="widget__top">
                                                                                <p className="widget__sub-title" data-reactid="1067">{this.state.nextQ5.today ? <Trans i18nKey="Today">Today</Trans> : (this.state.nextQ5.tomorrow ? <Trans i18nKey="Tomorrow">Tomorrow</Trans> : this.state.nextQ5.day)}</p>
                                                                                <i className="widget__icon widget__icon--quinte" data-reactid="1068"></i>
                                                                            </div>
                                                                            <header className="widget-flex-wrap">
                                                                                <p className="widget-race__text">{this.state.nextQ5.labelLong} - {this.state.nextQ5.time}</p>
                                                                            </header>
                                                                            <div className="widget__link"><Trans i18nKey="Bet now">Bet now</Trans>
                                                                                <i className="widget__link-icon"></i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            :
                                                            ''
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {
                                        this.state.race.betResults
                                        ?
                                            <section className="results-section">
                                                <div className="container">

                                                    <div className="row">

                                                        <div className="col-md-12 m-b-10">
                                                            <div className="title m-b-0">
                                                                <h3>Results</h3>
                                                            </div>
                                                            <div className="">
                                                                <table className="results-selection-tab">
                                                                    <tbody>
                                                                    <tr className="">
                                                                        <td className="result-selector">
                                                                            <a href="#">
                                                                                <img src="https://www.equidia.fr/assets/img/paris/simple.png" alt=""/>
                                                                            </a>
                                                                        </td>
                                                                        <td className="result-selector">
                                                                            <a href="#">
                                                                                <img src="https://www.equidia.fr/assets/img/paris/couple.png" alt=""/>
                                                                            </a>
                                                                        </td>
                                                                        <td className="result-selector">
                                                                            <a href="#">
                                                                                <img src="https://www.equidia.fr/assets/img/paris/couple-ordre.png" alt=""/>
                                                                            </a>
                                                                        </td>
                                                                        <td className="result-selector">
                                                                            <a href="#">
                                                                                <img src="https://www.equidia.fr/assets/img/paris/trio.png" alt=""/>
                                                                            </a>
                                                                        </td>
                                                                        <td className="result-selector active">
                                                                            <a href="#">
                                                                                <img src="https://www.equidia.fr/assets/img/paris/2sur4.png" alt=""/>
                                                                            </a>
                                                                        </td>
                                                                        <td className="result-selector">
                                                                            <a href="#">
                                                                                <img src="https://www.equidia.fr/assets/img/paris/multi.png" alt=""/>
                                                                            </a>
                                                                        </td>
                                                                        <td className="result-selector">
                                                                            <a href="#">
                                                                                <img src="https://www.equidia.fr/assets/img/paris/tierce.png" alt=""/>
                                                                            </a>
                                                                        </td>
                                                                        <td className="result-selector">
                                                                            <a href="#">
                                                                                <img src="https://www.equidia.fr/assets/img/paris/quarte.png" alt=""/>
                                                                            </a>
                                                                        </td>
                                                                        <td className="result-selector">
                                                                            <a href="#">
                                                                                <img src="https://www.equidia.fr/assets/img/paris/quinte-plus.png" alt=""/>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table className="results">
                                                                    <thead className="double">
                                                                    <tr>
                                                                        <td className="arrivee" rowSpan="2">Arrivée</td>
                                                                        <td colSpan="2">Gagnant</td>
                                                                        <td colSpan="2">Placé</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="forceLeftBorder">Rapport</td>
                                                                        <td>Nb mises gagnantes</td>
                                                                        <td className="forceLeftBorder">Rapport</td>
                                                                        <td>Nb mises gagnantes</td>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr className="odd">
                                                                        <td>1</td>
                                                                        <td>6,80 ?</td>
                                                                        <td>3 425,63 </td>
                                                                        <td>2,10 ?</td>
                                                                        <td>4 930,23 </td>
                                                                    </tr>
                                                                    <tr className="even">
                                                                        <td>5</td>
                                                                        <td>-</td>
                                                                        <td>-</td>
                                                                        <td>1,50 ?</td>
                                                                        <td>9 569,92 </td>
                                                                    </tr>
                                                                    <tr className="odd">
                                                                        <td>6</td>
                                                                        <td>-</td>
                                                                        <td>-</td>
                                                                        <td>2,80 ?</td>
                                                                        <td>2 930,28 </td>
                                                                    </tr>
                                                                    </tbody>

                                                                </table>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        :
                                            null
                                    }
                                </div>
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
