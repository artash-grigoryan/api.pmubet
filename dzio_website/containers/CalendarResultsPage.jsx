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

export default class CalendarResultsPage extends Component {

    constructor(props) {

        super(props);
        this.state = {

        };
    }

    async componentWillMount() {

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

                        <div className="container">
                            <div className="data-holder">
                                <div className="btn-holder d-none d-md-block"
                                     style={{textAlign: 'center',margin: '40px 0px'}}>
                                    <button style={{margin: '0 10px'}} className="btn btn-primary" type="button">Toutes les
                                        courses
                                    </button>
                                    <button style={{margin: '0 10px'}} className="btn btn-info" type="button">À venir
                                    </button>
                                </div>

                                <table style={{margin: 'auto'}}>
                                    <tbody>
                                    <tr>

                                        <td className="name-cell">
                                            R2C1 - ANGLO COURSE
                                            
                                        </td>

                                        <td style={{textAlign:'center'}}>
                                            11:00
                                            
                                            
                                        </td>
                                        <td style={{textAlign:'center'}}>8 Partants</td>
                                        <td style={{textAlign:'center'}}>
                                            
                                            15-8-13-7-2
                                            
                                        </td>
                                        
                                        
                                        
                                        <td className="btn-cell">
                                            <a className="btn btn-access" href="/courses/2019-03-02/R2/C1">
                                                Results
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>

                                        <td className="name-cell">
                                            R2C2 - PACHAN
                                            
                                        </td>

                                        <td style={{textAlign:'center'}}>
                                            11:30
                                            
                                            
                                        </td>
                                        <td style={{textAlign:'center'}}>7 Partants</td>
                                        <td style={{textAlign:'center'}}>
                                            
                                            3-7-11-12-2
                                            
                                        </td>
                                        
                                        
                                        
                                        <td className="btn-cell">
                                            <a className="btn btn-access" href="/courses/2019-03-02/R2/C2">
                                                Results
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>

                                        <td className="name-cell">
                                            R2C3 - ENCOURAGT BDX
                                            
                                        </td>

                                        <td style={{textAlign:'center'}}>
                                            12:00
                                            
                                            
                                        </td>
                                        <td style={{textAlign:'center'}}>8 Partants</td>
                                        <td style={{textAlign:'center'}}>
                                            
                                            4-10-5-3-11
                                            
                                        </td>
                                        
                                        
                                        
                                        <td className="btn-cell">
                                            <a className="btn btn-access" href="/courses/2019-03-02/R2/C3">
                                                Results
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>

                                        <td className="name-cell">
                                            R2C4 - MERLOT
                                            
                                        </td>

                                        <td style={{textAlign:'center'}}>
                                            12:30
                                            
                                            
                                        </td>
                                        <td style={{textAlign:'center'}}>9 Partants</td>
                                        <td style={{textAlign:'center'}}>
                                            
                                            6-7-8-9-1
                                            
                                        </td>
                                        
                                        
                                        
                                        <td className="btn-cell">
                                            <a className="btn btn-access" href="/courses/2019-03-02/R2/C4">
                                                Results
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>

                                        <td className="name-cell">
                                            R2C5 - L. BURANI
                                            
                                        </td>

                                        <td style={{textAlign:'center'}}>
                                            13:00
                                            
                                            
                                        </td>
                                        <td style={{textAlign:'center'}}>11 Partants</td>
                                        <td style={{textAlign:'center'}}>
                                            
                                            
                                            
                                            Enjeux SG <span className="cost">7 765 €</span>
                                        </td>
                                        
                                        
                                        
                                        <td className="btn-cell">
                                            <a className="btn btn-access" href="/courses/2019-03-02/R2/C5">
                                                Bet on Vivaro
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>

                                        <td className="name-cell">
                                            R2C6 - R. MIGAUD
                                            
                                        </td>

                                        <td style={{textAlign:'center'}}>
                                            13:30
                                            
                                            
                                        </td>
                                        <td style={{textAlign:'center'}}>12 Partants</td>
                                        <td style={{textAlign:'center'}}>
                                            
                                            
                                            
                                            Enjeux SG <span className="cost">23 765 €</span>
                                        </td>
                                        
                                        
                                        
                                        <td className="btn-cell">
                                            <a className="btn btn-access" href="/courses/2019-03-02/R2/C6">
                                                Bet on Vivaro
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>

                                        <td className="name-cell">
                                            R2C7 - TAILLAN
                                            
                                        </td>

                                        <td style={{textAlign:'center'}}>
                                            14:05
                                            
                                            
                                        </td>
                                        <td style={{textAlign:'center'}}>10 Partants</td>
                                        <td style={{textAlign:'center'}}>
                                            
                                            
                                            
                                        </td>
                                        
                                        
                                        
                                        <td className="btn-cell">
                                            <a className="btn btn-access" href="/courses/2019-03-02/R2/C7">
                                                Bet on Vivaro
                                            </a>
                                        </td>
                                    </tr>
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
