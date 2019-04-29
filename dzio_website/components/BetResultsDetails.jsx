import _ from "lodash";
import React from "react";
import '@fortawesome/fontawesome';
import {Trans} from "react-i18next";


export default class BetResultsDetails extends React.Component {

    render() {

        let betSeleted = this.props.betSelected;
        if(betSeleted === 'Simple' || betSeleted === 'Couplé' || betSeleted === 'Couplé ordre' || betSeleted === 'Trio Ordre') {

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
                        <td className="arrivee" rowSpan="2"><Trans i18nKey="Arrival">Arrival</Trans></td>
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
        else if(betSeleted === '2 sur 4') {

            let betResult = _.find(this.props.race.betResults, function (betResult) {
                return betResult.name === betSeleted;
            });

            let trResults = betResult.results.map(function (result) {

                return <tr key={result.id} className="odd">
                    <td>{result.combinaisonRapDef}</td>
                    <td>{result.gagnantMb ? result.gagnantMb + ' €': '-'}</td>
                    <td>{result.sumMisesGagn ? result.sumMisesGagn: '-'}</td>
                </tr>
            });
            return <table className="results">
                <thead className="double">
                    <tr>
                        <td className="arrivee" rowSpan="2"><Trans i18nKey="Arrival">Arrival</Trans></td>
                        <td className="forceLeftBorder"><Trans i18nKey="Report">Report</Trans></td>
                        <td><Trans i18nKey="Nb winning bets">Nb winning bets</Trans></td>
                    </tr>
                </thead>
                <tbody>
                    {trResults}
                </tbody>

            </table>
        }
        else if(betSeleted === 'Multi' || betSeleted === 'Tiercé' || betSeleted === 'Quarté' || betSeleted === 'Quinté+') {

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
                        <td className="arrivee" rowSpan="2"><Trans i18nKey="Arrival">Arrival</Trans></td>
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