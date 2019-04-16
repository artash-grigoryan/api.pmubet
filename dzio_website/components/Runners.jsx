import _ from "lodash";
import React from "react";
import '@fortawesome/fontawesome';

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {Trans} from "react-i18next";


export default class Runners extends React.Component {

    render() {

        let listRunners = [];
        if(this.props.race) {
            listRunners = this.props.race.runners.map((runner) =>
                <tr key={runner.number} className="runner">
                    <td className="runner-rank">{runner.number}</td>
                    <td className="runner-img">
                        <img src="https://api.equidia.fr/api/public/media/casaque_extra_small/20181227-r1c2p1-png-2?updated_at=2018-12-26T18:16:18+01:00"/>
                    </td>
                    <td className="runner-name">
                        <a href="#">{runner.name}</a>
                        <span>{runner.jokey}</span>
                    </td>
                    <td className="runner-cote">
                        <span>{runner.odds}</span>
                    </td>
                </tr>
            );
        }
        
        return <div>

            <div className="title double-title m-b-0">
                <h3>The runners</h3>
                <span className="add-value"><img src="https://www.equidia.fr/assets/img/icons-png/discipline_trot.png" alt="Monté"/><span>R{this.props.reunion.externNumber} C{this.props.race.number}</span></span>
            </div>
            <div className="runners-tab">
                <table className="table-striped">
                    <tbody>
                    {listRunners}
                    </tbody>
                </table>
            </div>
        </div>
    }
}