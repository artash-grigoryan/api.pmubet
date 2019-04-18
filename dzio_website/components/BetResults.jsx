import _ from "lodash";
import React from "react";
import '@fortawesome/fontawesome';


export default class BetResults extends React.Component {

    constructor(props) {

        super(props);
        this.state = {

            betSelected : 'Simple'
        }
    }

    render() {

        let listBets = [];

        if(this.props.race.betResults) {

            this.props.race.betResults.map((bet) => {

                let imgPath;
                switch (bet.name) {

                    //TODO Désordre, Super 4, Super 4, 1NP, Bonus, Bonus 4, Bonus 3, Pick 5, Spécial Pick 5
                    case('Simple'):
                        imgPath = "/img/bets/SG.png";
                        break;
                    case('Couplé'):
                        imgPath = "/img/bets/CG.png";
                        break;
                    case('Couplé ordre'):
                        imgPath = "/img/bets/CP.png";
                        break;
                    case('Trio Ordre'):
                        imgPath = "/img/bets/TR.png";
                        break;
                    case('2 sur 4'):
                        imgPath = "/img/bets/C4.png";
                        break;
                    case('Mini Multi en 6'):
                    case('Multi en 7'):
                        imgPath = "/img/bets/MI.png";
                        break;
                    case('tierce'):
                        imgPath = "/img/bets/T.png";
                        break;
                    case('quarte'):
                        imgPath = "/img/bets/QP.png";
                        break;
                    case('quintePlus'):
                        imgPath = "/img/bets/QN.png";
                        break;
                }
                listBets.push(
                    <td key={bet.name} className={"result-selector" +' '+ (this.state.betSelected === bet.name ? ' active' : '')}>
                        <a href="javascript:;" onClick={()=>this.setState({betSelected:bet.name})}>
                            <img src={imgPath} alt=""/>
                        </a>
                    </td>
                )
            });
        }

        return <section className="results-section">
            <div className="container">

                <div className="row">

                    <div className="col-md-12 m-b-10">
                        <div className="title m-b-0">
                            <h3>Reports</h3>
                        </div>
                        <div className="">
                            <table className="results-selection-tab">
                                <tbody>
                                <tr className="">
                                    {listBets}
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