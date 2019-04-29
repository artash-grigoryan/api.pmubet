import _ from "lodash";
import React from "react";
import '@fortawesome/fontawesome';
import {Trans} from "react-i18next";

import BetResultsDetails from "./BetResultsDetails"


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
                    case('Multi'):
                        imgPath = "/img/bets/MI.png";
                        break;
                    case('Tiercé'):
                        imgPath = "/img/bets/T.png";
                        break;
                    case('Quarté'):
                        imgPath = "/img/bets/QP.png";
                        break;
                    case('Quinté+'):
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
                            <h3><Trans i18nKey="Reports">Reports</Trans></h3>
                        </div>
                        <div className="">
                            <table className="results-selection-tab">
                                <tbody>
                                <tr className="">
                                    {listBets}
                                </tr>
                                </tbody>
                            </table>
                            <BetResultsDetails betSelected={this.state.betSelected} {...this.props} />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    }
}