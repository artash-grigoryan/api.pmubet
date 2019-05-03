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

export default class HowToBetPage extends Component {

    constructor(props) {

        super(props);
        this.state = {

        };
    }

    async componentWillMount() {

    }

	render() {

		return <div id="how-to-bet">
            <header>
                <MainMenu/>
            </header>

            <div className="container-fluid">
                <div id="wrapper">
                    <div id="main">

                        <div className="banner inner-banner">

                            <div className="container">
                                <div className="text-holder">
                                    <h1>
                                        HOW TO BET
                                    </h1>

                                    <div style={{marginTop: '30px'}}><a className="btn btn-md" href="#">Parier sur
                                        Vivaro</a></div>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <section>

                                <div className="row">
                                    <div className="col-md-8">

                                        <div className="title m-b-0">
                                            <h3>How to bet</h3>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div>
                                                    <h4>Qu’est-ce que le Quinté+ ?</h4>
                                                    <p>Au Quinté+ il faut trouver les cinq premiers chevaux de la
                                                        course. C’est le pari qui rencontre le plus gros succès car il
                                                        offre les plus gros gains. Il met enjeu une tirelire
                                                        hebdomadaire, à partager entre tous les parieurs ayants trouvés
                                                        les cinq premiers chevaux dans l'ordre exacte. Elle est
                                                        proposée, en principe, le dimanche, jour des plus prestigieuses
                                                        réunions. Le Quinté+ a lieu une fois par jour sur la plus belle
                                                        course de la journée. On y retrouve les meilleurs chevaux et un
                                                        suspens incroyable.</p>
                                                </div>
                                                <div>
                                                    <h4>Que signifient les cotes ?</h4>
                                                    <p>Elles représentent les chances de victoire du cheval et sont
                                                        calculées en fonction de la masse totale des enjeux. Les cotes
                                                        permettent de connaître les chevaux les plus joués. Un cheval
                                                        favori aura une cote faible (ex : 1.5). En misant sur lui, vos
                                                        chances de gagner sont importantes mais vous risquez de gagner
                                                        peu. Inversement, un cheval peu joué aura une grosse cote (ex :
                                                        35). C’est un outsider et, en misant sur lui, vous avez moins de
                                                        chances de gagner mais il vous rapportera gros en cas de
                                                        victoire.</p>
                                                </div>
                                                <div>
                                                    <h4>Où puis-je voir le direct ?</h4>
                                                    <p>En allant sur la page de la course vous pouvez cliquez sur voir
                                                        le live dans l'en tête de la course en haut de la page</p>
                                                </div>
                                                <div>
                                                    <h4>COMMENT JOUER ?</h4>
                                                    <div className="youtube-embed-wrapper"
                                                         style={{position:'relative',paddingBottom:'56.25%',paddingTop:'30px',height:0,overflow:'hidden'}}>
                                                        <iframe allowFullScreen="" frameBorder="0" height="360"
                                                                src="https://www.youtube.com/embed/QK12FTeU2tk"
                                                                style={{position: 'absolute',top: 0,left: 0,width: '100%',height: '100%'}}
                                                                width="640"></iframe>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4>3 FAÇONS DE CHOISIR SES CHEVAUX</h4>
                                                    <ul>
                                                        <li>
                                                            <h5>1. La chance</h5>
                                                            <p>Certains parieurs jouent leurs numéros au hasard, parfois
                                                                selon le nom ou la couleur du cheval. Les plus malins
                                                                font confiance au système spOt. Avec cette technique
                                                                intelligente, nul besoin de s’y connaître dans le
                                                                domaine des courses. Les chevaux sont sélectionnés
                                                                automatiquement en fonction des paris effectués par les
                                                                autres joueurs. Il est possible de laisser spOt choisir
                                                                tous les chevaux du pari ou de ne lui en demander qu’une
                                                                partie en guise de complément dans un pari préparé
                                                                soi-même.</p>
                                                        </li>
                                                        <li>
                                                            <h5>2. La méthode classique</h5>
                                                            <p>Le joueur choisit de parier sur des chevaux favoris. Il
                                                                peut intégrer à ses paris quelques outsiders pour
                                                                augmenter potentiellement ses gains. La base de cette
                                                                méthode est la cote. Il ne reste plus qu’à définir si on
                                                                souhaite prendre des risques ou jouer la prudence.</p>
                                                        </li>
                                                        <li>
                                                            <h5>3. La méthode des pros</h5>
                                                            <p>Certains joueurs sont des spécialistes qui connaissent
                                                                très bien le monde des courses. Ils s’intéressent aux
                                                                chevaux, aux jockeys et aux entraîneurs. Ils effectuent
                                                                leurs paris en fonction d’une multitude de critères. Ils
                                                                passent du temps sur les hippodromes et étudient la
                                                                course pour établir leurs pronostics. Un turfiste, en
                                                                fin stratège, pondère risque et gain. Ces enjeux de
                                                                spécialistes apportent une contribution importante aux
                                                                sélections spOt et font varier les cotes.</p>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">

                                        <div className="title m-b-0">
                                            <h3>BESOIN D'AIDE ?</h3>
                                        </div>
                                        <div className="card">

                                            <div className="card-body">
                                                <p>Si vous n'avez pas trouvé de réponses dans la FAQ ou dans nos guides
                                                    de jeux vous pouvez utiliser notre formulaire de contact. Notre
                                                    service clients est à votre disposition pour répondre à vos
                                                    questions.</p>
                                                <a href="#">NOUS CONTACTER</a>
                                            </div>
                                        </div>

                                        <div className="title m-b-0">
                                            <h3>LIENS UTILES</h3>
                                        </div>
                                        <div className="card">

                                            <div className="card-body">
                                                <a href="#">FAQ </a>
                                                <a href="#">RÈGLEMENTS </a>
                                            </div>
                                        </div>

                                        <div className="title m-b-0">
                                            <h3>DOCUMENTS UTILES</h3>
                                        </div>
                                        <div className="card">

                                            <div className="card-body">
                                                <a href="#">- GUIDE DES PARIS (PDF) </a><br/>
                                                <a href="#">- CALENDRIER 2019 </a><br/>
                                                <a href="#">- CALENDRIER DES COURSES SUISSES (PDF) </a><br/>
                                                <a href="#">- LISTE DES POINTS DE VENTE (PDF) </a><br/>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </section>

                        </div>

                    </div>
                </div>
            </div>

            <Footer />
		</div>;
	}
}
