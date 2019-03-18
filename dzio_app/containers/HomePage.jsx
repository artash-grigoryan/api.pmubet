import React, {Component} from "react";
import MainMenu from "../components/MainMenu.jsx";
import Footer from "../components/shared/footer/footer";

import "./../../html_css3/assets/css/main.scss";

export default class HomePage extends Component {
	render() {
		return <div>
            <header>
                <MainMenu/>
            </header>

            <div id="main">
                <div class="bar-selector">
                    <div class="day-selector">
                        <ul>

                            <li>
                                <a class="active" href="#">Yesterday</a>
                            </li>
                            <li>
                                <a href="#">Today</a>
                            </li>
                            <li>
                                <a href="#">Tomorrow</a>
                            </li>
                        </ul>
                        <ul class="calendar-selector">
                            <li>
                                <a href="#"><i class="far fa-calendar-alt"></i></a>
                            </li>
                        </ul>
                    </div>
                    <div class="meeting-selector">
                        <ul>
                            <li>
                                <a href="#">
                                    <img src="https://www.equidia.fr/assets/img/icons-png/discipline_attele_w.png"/> <b>R1</b> - Paris Vincennes
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="race-selector">
                        <ul class="">
                            <li>
                                <a class="active" href="#">C1</a>
                            </li>
                            <li>
                                <a href="#">C2</a>
                            </li>
                            <li>
                                <a href="#">C3</a>
                            </li>
                            <li>
                                <a href="#">C4</a>
                            </li>
                            <li>
                                <a href="#">C5</a>
                            </li>
                            <li>
                                <a href="#">C6</a>
                            </li>
                            <li>
                                <a href="#">C7</a>
                            </li>
                            <li>
                                <a href="#">C8</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="banner inner-banner">

                    <div class="container">
                        <div class="text-holder">
                            <h1>
                                <time datetime="2018-12-20">
                                    13:47 - 20 décembre 2018
                                </time>
                                <b>R1C1</b>
                                PRIX DES SAPONAIRES
                            </h1>

                            <div class="btn-holder">
                                Départ dans 5 minutes

                            </div>

                            <div style="margin-top: 30px;"><a class="btn btn-md" href="#">Parier sur Vivaro</a></div>
                        </div>
                    </div>
                </div>

                <section class="info-section" style="background:#fff">
                    <div class="container">

                        <div class="block-race-condition">

                            <div class="picto-meteo">
                                <img src="https://www.equidia.fr/assets/img/meteo/P4_grand.png"/>
                            </div>

                            <div class="row m-b-10">
                                <div class="col-md-3">
                                    <div class="info-line-1">
                                        Participants :<br/>
                                        <b>16 Partants</b>
                                    </div>
                                    <div class="info-line-2">
                                        Distance :<br/>
                                        <b>2750m</b>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="info-line-1">
                                        Discipline :<br/>
                                        <b>Attelé</b>
                                    </div>
                                    <div class="info-line-2">
                                        Diffusion :<br/>
                                        <b>Equidia Racing 1</b>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="bet-selector">
                                        <img src="https://www.equidia.fr/assets/img/paris/simple.png" alt=""/>
                                        <img src="https://www.equidia.fr/assets/img/paris/couple.png" alt=""/>
                                        <img src="https://www.equidia.fr/assets/img/paris/couple-ordre.png" alt=""/>
                                        <img src="https://www.equidia.fr/assets/img/paris/trio.png" alt=""/>
                                        <img src="https://www.equidia.fr/assets/img/paris/2sur4.png" alt=""/>
                                        <img src="https://www.equidia.fr/assets/img/paris/multi.png" alt=""/>
                                        <img src="https://www.equidia.fr/assets/img/paris/tierce.png" alt=""/>
                                        <img src="https://www.equidia.fr/assets/img/paris/quarte.png" alt=""/>
                                        <img src="https://www.equidia.fr/assets/img/paris/quinte-plus.png" alt=""/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="info-line-1">
                                    </div>
                                    <div class="info-line-2">
                                        <div class="text-right">
                                            <b>12° Peu Nuageux / 27km/h<br/>
                                                Sud-Ouest</b>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </section>


                <section class="info-section">
                    <div class="container">

                        <div class="row">

                            <div class="col-lg-4 col-md-12">
                                <div class="title double-title m-b-0">
                                    <h3>The runners</h3>
                                    <span class="add-value"><img src="https://www.equidia.fr/assets/img/icons-png/discipline_trot.png" alt="Monté"/><span>R1 C2</span></span>
                                </div>
                                <div class="runners-tab">
                                    <table class="table-striped">
                                        <tbody>
                                        <tr class="runner">
                                            <td class="runner-rank">1</td>
                                            <td class="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td class="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td class="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr class="runner">
                                            <td class="runner-rank">2</td>
                                            <td class="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td class="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td class="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr class="runner">
                                            <td class="runner-rank">3</td>
                                            <td class="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td class="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td class="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr class="runner">
                                            <td class="runner-rank">4</td>
                                            <td class="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td class="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td class="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr class="runner">
                                            <td class="runner-rank">5</td>
                                            <td class="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td class="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td class="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr class="runner">
                                            <td class="runner-rank">6</td>
                                            <td class="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td class="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td class="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr class="runner">
                                            <td class="runner-rank">7</td>
                                            <td class="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td class="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td class="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr class="runner">
                                            <td class="runner-rank">8</td>
                                            <td class="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td class="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td class="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr class="runner">
                                            <td class="runner-rank">9</td>
                                            <td class="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td class="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td class="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr class="runner">
                                            <td class="runner-rank">10</td>
                                            <td class="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td class="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td class="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr class="runner">
                                            <td class="runner-rank">11</td>
                                            <td class="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td class="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td class="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr class="runner">
                                            <td class="runner-rank">12</td>
                                            <td class="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td class="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td class="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr class="runner">
                                            <td class="runner-rank">13</td>
                                            <td class="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td class="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td class="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr class="runner">
                                            <td class="runner-rank">14</td>
                                            <td class="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td class="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td class="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr class="runner">
                                            <td class="runner-rank">15</td>
                                            <td class="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td class="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td class="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr class="runner">
                                            <td class="runner-rank">16</td>
                                            <td class="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td class="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td class="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            <div class="col-lg-5 col-md-12">
                                <div class="title" style="margin-bottom: 0;">
                                    <h3>DZIO Predictions</h3>
                                </div>
                                <div class="previsions">
                                    <div class="previsions-header">
                                        <ul>
                                            <li><a href="#">7</a></li>
                                            <li class="active"><a href="#">12</a></li>
                                            <li><a href="#">3</a></li>
                                            <li><a href="#">4</a></li>
                                            <li><a href="#">19</a></li>
                                        </ul>
                                    </div>
                                    <div class="previsions-body tab-content">


                                        <h2 class="text-uppercase">
                                            <b class="primary-color">12</b> -
                                            <a href="/chevaux/carla-du-houlme">CARLA DU HOULME</a>
                                        </h2>
                                        <p><span>Pieds nues, Carla du Houlme fait face à son objectif. Ses dernières sorties sont bonnes et sur sa forme, elle devrait jouer les premiers rôles. </span></p>

                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-3 col-md-12" style="margin-top: 61px;">
                                <div class="adv-1">
                                    <a class="widget widget__quinte" href="#">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="widget__top">
                                                    <p class="widget__sub-title" data-reactid="1067">aujourd'hui</p>
                                                    <i class="widget__icon widget__icon--quinte" data-reactid="1068"></i>
                                                </div>
                                                <header class="widget-flex-wrap">
                                                    <p class="widget-race__text">R1 C3 PRIX DE MAUREPAS - 15:15</p>
                                                </header>
                                                <div class="widget__link">Pariez maintenant
                                                    <i class="widget__link-icon"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div class="adv-1">
                                    <a class="widget widget__quinte" href="#">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="widget__top">
                                                    <p class="widget__sub-title" data-reactid="1067">aujourd'hui</p>
                                                    <i class="widget__icon widget__icon--quinte" data-reactid="1068"></i>
                                                </div>
                                                <header class="widget-flex-wrap">
                                                    <p class="widget-race__text">R1 C3 PRIX DE MAUREPAS - 15:15</p>
                                                </header>
                                                <div class="widget__link">Pariez maintenant
                                                    <i class="widget__link-icon"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <section class="results-section">
                    <div class="container">

                        <div class="row">

                            <div class="col-md-12 m-b-10">
                                <div class="title m-b-0">
                                    <h3>Results</h3>
                                </div>
                                <div class="">
                                    <table class="results-selection-tab">
                                        <tbody>
                                        <tr class="">
                                            <td class="result-selector">
                                                <a href="#">
                                                    <img src="https://www.equidia.fr/assets/img/paris/simple.png" alt=""/>
                                                </a>
                                            </td>
                                            <td class="result-selector">
                                                <a href="#">
                                                    <img src="https://www.equidia.fr/assets/img/paris/couple.png" alt=""/>
                                                </a>
                                            </td>
                                            <td class="result-selector">
                                                <a href="#">
                                                    <img src="https://www.equidia.fr/assets/img/paris/couple-ordre.png" alt=""/>
                                                </a>
                                            </td>
                                            <td class="result-selector">
                                                <a href="#">
                                                    <img src="https://www.equidia.fr/assets/img/paris/trio.png" alt=""/>
                                                </a>
                                            </td>
                                            <td class="result-selector active">
                                                <a href="#">
                                                    <img src="https://www.equidia.fr/assets/img/paris/2sur4.png" alt=""/>
                                                </a>
                                            </td>
                                            <td class="result-selector">
                                                <a href="#">
                                                    <img src="https://www.equidia.fr/assets/img/paris/multi.png" alt=""/>
                                                </a>
                                            </td>
                                            <td class="result-selector">
                                                <a href="#">
                                                    <img src="https://www.equidia.fr/assets/img/paris/tierce.png" alt=""/>
                                                </a>
                                            </td>
                                            <td class="result-selector">
                                                <a href="#">
                                                    <img src="https://www.equidia.fr/assets/img/paris/quarte.png" alt=""/>
                                                </a>
                                            </td>
                                            <td class="result-selector">
                                                <a href="#">
                                                    <img src="https://www.equidia.fr/assets/img/paris/quinte-plus.png" alt=""/>
                                                </a>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table class="results">
                                        <thead class="double">
                                        <tr>
                                            <td class="arrivee" rowspan="2">Arrivée</td>
                                            <td colspan="2">Gagnant</td>
                                            <td colspan="2">Placé</td>
                                        </tr>
                                        <tr>
                                            <td class="forceLeftBorder">Rapport</td>
                                            <td>Nb mises gagnantes</td>
                                            <td class="forceLeftBorder">Rapport</td>
                                            <td>Nb mises gagnantes</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr class="odd">
                                            <td>1</td>
                                            <td>6,80 ?</td>
                                            <td>3 425,63 </td>
                                            <td>2,10 ?</td>
                                            <td>4 930,23 </td>
                                        </tr>
                                        <tr class="even">
                                            <td>5</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>1,50 ?</td>
                                            <td>9 569,92 </td>
                                        </tr>
                                        <tr class="odd">
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
            </div>

            <Footer />
		</div>;
	}
}
