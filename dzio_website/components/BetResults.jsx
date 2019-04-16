import _ from "lodash";
import React from "react";
import '@fortawesome/fontawesome';


export default class BetResults extends React.Component {

    render() {

        return <section className="results-section">
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
    }
}