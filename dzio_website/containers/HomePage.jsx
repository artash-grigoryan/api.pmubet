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
                <div className="bar-selector">
                    <div className="day-selector">
                        <ul>

                            <li>
                                <a className="active" href="#">Yesterday</a>
                            </li>
                            <li>
                                <a href="#">Today</a>
                            </li>
                            <li>
                                <a href="#">Tomorrow</a>
                            </li>
                        </ul>
                        <ul className="calendar-selector">
                            <li>
                                <a href="#"><i className="far fa-calendar-alt"></i></a>
                            </li>
                        </ul>
                    </div>
                    <div className="meeting-selector">
                        <ul>
                            <li>
                                <a href="#">
                                    <img src="https://www.equidia.fr/assets/img/icons-png/discipline_attele_w.png"/> <b>R1</b> - Paris Vincennes
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="race-selector">
                        <ul className="">
                            <li>
                                <a className="active" href="#">C1</a>
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

                <div className="banner inner-banner">

                    <div className="container">
                        <div className="text-holder">
                            <h1>
                                <time>
                                    13:47 - 20 décembre 2018
                                </time>
                                <b>R1C1</b>
                                PRIX DES SAPONAIRES
                            </h1>

                            <div className="btn-holder">
                                Départ dans 5 minutes

                            </div>

                            <div style={{marginTop: "30px"}}><a className="btn btn-md" href="#">Parier sur Vivaro</a></div>
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
                                        Participants :<br/>
                                        <b>16 Partants</b>
                                    </div>
                                    <div className="info-line-2">
                                        Distance :<br/>
                                        <b>2750m</b>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="info-line-1">
                                        Discipline :<br/>
                                        <b>Attelé</b>
                                    </div>
                                    <div className="info-line-2">
                                        Diffusion :<br/>
                                        <b>Equidia Racing 1</b>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="bet-selector">
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
                                <div className="col-md-3">
                                    <div className="info-line-1">
                                    </div>
                                    <div className="info-line-2">
                                        <div className="text-right">
                                            <b>12° Peu Nuageux / 27km/h<br/>
                                                Sud-Ouest</b>
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
                                    <span className="add-value"><img src="https://www.equidia.fr/assets/img/icons-png/discipline_trot.png" alt="Monté"/><span>R1 C2</span></span>
                                </div>
                                <div className="runners-tab">
                                    <table className="table-striped">
                                        <tbody>
                                        <tr className="runner">
                                            <td className="runner-rank">1</td>
                                            <td className="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td className="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td className="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr className="runner">
                                            <td className="runner-rank">2</td>
                                            <td className="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td className="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td className="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr className="runner">
                                            <td className="runner-rank">3</td>
                                            <td className="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td className="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td className="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr className="runner">
                                            <td className="runner-rank">4</td>
                                            <td className="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td className="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td className="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr className="runner">
                                            <td className="runner-rank">5</td>
                                            <td className="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td className="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td className="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr className="runner">
                                            <td className="runner-rank">6</td>
                                            <td className="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td className="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td className="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr className="runner">
                                            <td className="runner-rank">7</td>
                                            <td className="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td className="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td className="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr className="runner">
                                            <td className="runner-rank">8</td>
                                            <td className="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td className="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td className="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr className="runner">
                                            <td className="runner-rank">9</td>
                                            <td className="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td className="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td className="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr className="runner">
                                            <td className="runner-rank">10</td>
                                            <td className="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td className="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td className="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr className="runner">
                                            <td className="runner-rank">11</td>
                                            <td className="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td className="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td className="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr className="runner">
                                            <td className="runner-rank">12</td>
                                            <td className="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td className="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td className="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr className="runner">
                                            <td className="runner-rank">13</td>
                                            <td className="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td className="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td className="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr className="runner">
                                            <td className="runner-rank">14</td>
                                            <td className="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td className="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td className="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr className="runner">
                                            <td className="runner-rank">15</td>
                                            <td className="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td className="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td className="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        <tr className="runner">
                                            <td className="runner-rank">16</td>
                                            <td className="runner-img">
                                                <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                                            </td>
                                            <td className="runner-name">
                                                <a href="#">FULL STAR VOIRONS</a>
                                                <span>JULIEN RAFFESTIN</span>
                                            </td>
                                            <td className="runner-cote">
                                                <span>5.6</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            <div className="col-lg-5 col-md-12">
                                <div className="title" style={{marginBottom: 0}}>
                                    <h3>DZIO Predictions</h3>
                                </div>
                                <div className="previsions">
                                    <div className="previsions-header">
                                        <ul>
                                            <li><a href="#">7</a></li>
                                            <li className="active"><a href="#">12</a></li>
                                            <li><a href="#">3</a></li>
                                            <li><a href="#">4</a></li>
                                            <li><a href="#">19</a></li>
                                        </ul>
                                    </div>
                                    <div className="previsions-body tab-content">


                                        <h2 className="text-uppercase">
                                            <b className="primary-color">12</b> -
                                            <a href="/chevaux/carla-du-houlme">CARLA DU HOULME</a>
                                        </h2>
                                        <p><span>Pieds nues, Carla du Houlme fait face à son objectif. Ses dernières sorties sont bonnes et sur sa forme, elle devrait jouer les premiers rôles. </span></p>

                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-12" style={{marginTop: "61px"}}>
                                <div className="adv-1">
                                    <a className="widget widget__quinte" href="#">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="widget__top">
                                                    <p className="widget__sub-title" data-reactid="1067">aujourd'hui</p>
                                                    <i className="widget__icon widget__icon--quinte" data-reactid="1068"></i>
                                                </div>
                                                <header className="widget-flex-wrap">
                                                    <p className="widget-race__text">R1 C3 PRIX DE MAUREPAS - 15:15</p>
                                                </header>
                                                <div className="widget__link">Pariez maintenant
                                                    <i className="widget__link-icon"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="adv-1">
                                    <a className="widget widget__quinte" href="#">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="widget__top">
                                                    <p className="widget__sub-title" data-reactid="1067">aujourd'hui</p>
                                                    <i className="widget__icon widget__icon--quinte" data-reactid="1068"></i>
                                                </div>
                                                <header className="widget-flex-wrap">
                                                    <p className="widget-race__text">R1 C3 PRIX DE MAUREPAS - 15:15</p>
                                                </header>
                                                <div className="widget__link">Pariez maintenant
                                                    <i className="widget__link-icon"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

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
            </div>

            <Footer />
		</div>;
	}
}
