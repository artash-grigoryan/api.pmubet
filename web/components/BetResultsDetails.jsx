import _ from "lodash";
import React from "react";
import {Trans} from "react-i18next";


export default class BetResultsDetails extends React.Component {

    getBetLogo(bet) {

        let imgPath;
        switch (bet) {

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
            case('Trio'):
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
        return imgPath;
    }

    render() {

        let betSeleted = this.props.betSelected;
        if(betSeleted === 'Simple' || betSeleted === 'Couplé' || betSeleted === 'Couplé ordre' || betSeleted === 'Trio Ordre' || betSeleted === 'Trio') {

            let betResult = _.find(this.props.race.betResults, function (betResult) {
                return betResult.name === betSeleted;
            });

            let trResults = betResult.results.map(function (result) {

                return <tr key={result.id} className="odd">
                    <td>{result.combinaisonRapDef}</td>
                    <td>{result.gagnant ? result.gagnant + ' €': '-'}</td>
                    <td>{result.sumMisesGagn ? result.sumMisesGagn: '-'}</td>
                    <td>{result.place ? result.place + ' €': '-'}</td>
                    <td>{result.sumMisesPlace ? result.sumMisesPlace: '-'}</td>
                </tr>
            });
            return <table className="results">
                <thead className="double">
                    <tr>
                        <td className="bet-logo" colSpan="5">
                            <a href="javascript:;">
                                <img src={`${process.env.API_URL}${this.getBetLogo(betSeleted)}`} alt=""/>
                                {
                                    betSeleted === 'Simple'
                                    ?
                                        <span className="bet-calibrate"><Trans i18nKey="FOR 1 EURO">FOR 1 EURO</Trans></span>
                                    :
                                        null
                                }
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td className="arrivee" rowSpan="2">N</td>
                        <td colSpan="2"><Trans i18nKey="Winner">Winner</Trans></td>
                        <td colSpan="2"><Trans i18nKey="Placed">Placed</Trans></td>
                    </tr>
                    <tr>
                        <td className="forceLeftBorder"><Trans i18nKey="Report">Report</Trans></td>
                        <td><Trans i18nKey="Nb winning bets">Nb winning bets</Trans></td>
                        <td className="forceLeftBorder">Report</td>
                        <td><Trans i18nKey="Nb winning bets">Nb winning bets</Trans></td>
                    </tr>
                </thead>
                <tbody>
                    {trResults}
                </tbody>

            </table>
        }
        else if(betSeleted === 'Quinté+') {

            let betResult = _.find(this.props.race.betResults, function (betResult) {
                return betResult.name === betSeleted;
            });

            let trResults = betResult.results.map(function (result) {

                return <tr key={result.id} className="odd">
                    <td>{result.combinaisonRapDef}</td>
                    <td>{result.typeReserveRapDef}</td>
                    <td>{result.gagnantMb ? result.gagnantMb + ' €': '-'}</td>
                    <td>{result.sumMisesGagn ? result.sumMisesGagn: '-'}</td>
                </tr>
            });
            return <table className="results">
                <thead className="double">
                    <tr>
                        <td className="bet-logo" colSpan="4">
                            <a href="javascript:;">
                                <img src={`${process.env.API_URL}${this.getBetLogo(betSeleted)}`} alt=""/>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td className="arrivee" rowSpan="2">N</td>
                        <td className="type" rowSpan="2"><Trans i18nKey="Type">Type</Trans></td>
                        <td className="forceLeftBorder"><Trans i18nKey="Report">Report</Trans></td>
                        <td><Trans i18nKey="Nb winning bets">Nb winning bets</Trans></td>
                    </tr>
                </thead>
                <tbody>
                    {trResults}
                </tbody>

            </table>
        }
        else {

            return null;
        }
    }
}
