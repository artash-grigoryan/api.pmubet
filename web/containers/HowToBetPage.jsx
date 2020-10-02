import React, {Component} from "react";
import MainMenu from "../components/MainMenu.jsx";
import Footer from "../components/shared/footer/footer";
import { raceActions } from '../actions/race';
import Banner from "../components/Banner";
import { Trans } from "react-i18next";
const i18next = require('i18next');

export default class HowToBetPage extends Component {

    constructor(props) {

        super(props);

        let timezoneOffset = (new Date().getTimezoneOffset()*-1 - 120) / 60;

        this.state = {
            timezoneOffset: timezoneOffset,
            lang: this.props.match.params.lang,
            race: null
        };
    }

    async componentWillMount() {

        this.setNextRace()
    }

    setNextRace() {

        raceActions.getNext(this.state.lang).then((response) => {

            this.setState({
                date : response.race.datePath,
                dateCalendar : response.race.date,
                reunion : response.race.reunion,
                race : response.race,
            });
        });
    }

	render() {

		return <div id="how-to-bet">
            <header>
                <MainMenu {...this.state}/>
            </header>

            <div className="container-fluid">
                <div id="wrapper">
                    <div id="main">

                        {
                            this.state.race
                                ?
                                <Banner {...this.state}/>
                                :
                                null
                        }

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
                                                    <h4><Trans i18nKey="What is Quinte + ?">What is Quinté + ?</Trans></h4>
                                                    <p><Trans i18nKey="At Quinte + you have to find the first five horses of the race. This is the bet that meets the biggest success because it offers the biggest gains. It puts at stake a weekly piggy bank, to share among all the bettors having found the first five horses in the exact order. It is proposed, in principle, Sunday, day of the most prestigious meetings. The Quinte + takes place once a day on the most beautiful race of the day. We find the best horses and incredible suspense.">At Quinté + you have to find the first five horses of the race. This is the bet that meets the biggest success because it offers the biggest gains. It puts at stake a weekly piggy bank, to share among all the bettors having found the first five horses in the exact order. It is proposed, in principle, Sunday, day of the most prestigious meetings. The Quinté + takes place once a day on the most beautiful race of the day. We find the best horses and incredible suspense.</Trans></p>
                                                </div>
                                                <div>
                                                    <h4><Trans i18nKey="What do the odds mean ?">What do the odds mean ?</Trans></h4>
                                                    <p><Trans i18nKey="They represent the chances of victory of the horse and are calculated according to the total mass of the stakes. The odds allow to know the most played horses. A favorite horse will have a low rating (ex: 1.5). By betting on him, your chances of winning are important but you risk winning little. Conversely, a little played horse will have a big odds (ex: 35). It is an outsider and, by betting on him, you have less chances to win but he will pay you big in case of victory.">They represent the chances of victory of the horse and are calculated according to the total mass of the stakes. The odds allow to know the most played horses. A favorite horse will have a low rating (ex: 1.5). By betting on him, your chances of winning are important but you risk winning little. Conversely, a little played horse will have a big odds (ex: 35). It is an outsider and, by betting on him, you have less chances to win but he will pay you big in case of victory.</Trans></p>
                                                </div>
                                                <div>
                                                    <h4><Trans i18nKey="Where can I see the live ?">Where can I see the live ?</Trans></h4>
                                                    <p><Trans i18nKey="By going to the race page you can click on see the live in the top of the race at the top of the page">By going to the race page you can click on see the live in the top of the race at the top of the page</Trans></p>
                                                </div>
                                                <div>
                                                    <h4><Trans i18nKey="3 WAYS TO CHOOSE HIS HORSES">3 WAYS TO CHOOSE HIS HORSES</Trans></h4>
                                                    <ul>
                                                        <li>
                                                            <h5><Trans i18nKey="1. The chance">1. The chance</Trans></h5>
                                                            <p><Trans i18nKey="Some bettors play their numbers at random, sometimes according to the name or color of the horse. The smartest trust the spOt system. With this intelligent technique, you do not need to know anything about racing. The horses are automatically selected according to the bets made by the other players. It is possible to let all the horses of the bet choose to be chosen, or to ask only a part of it as a complement in a bet prepared by oneself.">Some bettors play their numbers at random, sometimes according to the name or color of the horse. The smartest trust the spOt system. With this intelligent technique, you do not need to know anything about racing. The horses are automatically selected according to the bets made by the other players. It is possible to let all the horses of the bet choose to be chosen, or to ask only a part of it as a complement in a bet prepared by oneself.</Trans></p>
                                                        </li>
                                                        <li>
                                                            <h5><Trans i18nKey="2. The classical method">2. The classical method</Trans></h5>
                                                            <p><Trans i18nKey="The player chooses to bet on favorite horses. He can integrate some outsiders into his bets to potentially increase his winnings. The basis of this method is the rating. It only remains to define whether one wishes to take risks or to exercise caution.">The player chooses to bet on favorite horses. He can integrate some outsiders into his bets to potentially increase his winnings. The basis of this method is the rating. It only remains to define whether one wishes to take risks or to exercise caution.</Trans></p>
                                                        </li>
                                                        <li>
                                                            <h5><Trans i18nKey="3. The pros method">3. The pros method</Trans></h5>
                                                            <p><Trans i18nKey="Some players are specialists who know the racing world very well. They are interested in horses, jockeys and coaches. They make their bets according to a multitude of criteria. They spend time on racetracks and study the race to make their predictions. A turfist, in the final strategist, weighting risk and gain. These specialist issues make an important contribution to the spOt selections and vary the ratings.">Some players are specialists who know the racing world very well. They are interested in horses, jockeys and coaches. They make their bets according to a multitude of criteria. They spend time on racetracks and study the race to make their predictions. A turfist, in the final strategist, weighting risk and gain. These specialist issues make an important contribution to the spOt selections and vary the ratings.</Trans></p>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">

                                        <div className="title m-b-0">
                                            <h3><Trans i18nKey="NEED HELP ?">NEED HELP ?</Trans></h3>
                                        </div>
                                        <div className="card">

                                            <div className="card-body">
                                                <p><Trans i18nKey="If you have not found answers in the FAQ or in our game guides you can use our contact form. Our customer service is at your disposal to answer your questions.">If you have not found answers in the FAQ or in our game guides you can use our contact form. Our customer service is at your disposal to answer your questions.</Trans></p>
                                                <a href="#"><Trans i18nKey="CONTACT US">CONTACT US</Trans></a>
                                            </div>
                                        </div>

                                        <div className="title m-b-0">
                                            <h3><Trans i18nKey="USEFUL LINKS">USEFUL LI</Trans></h3>
                                        </div>
                                        <div className="card">

                                            <div className="card-body">
                                                <a href="https://www.vivarobet.am">Vivaro</a>
                                                <a href="https://www.pmu.fr">PMU</a>
                                            </div>
                                        </div>

                                        <div className="title m-b-0">
                                            <h3><Trans i18nKey="USEFUL DOCUMENTS">USEFUL DOCUMENTS</Trans></h3>
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
