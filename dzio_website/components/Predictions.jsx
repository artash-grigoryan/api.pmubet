import _ from "lodash";
import React from "react";
import '@fortawesome/fontawesome';

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {Trans} from "react-i18next";


export default class Predictions extends React.Component {

    render() {

        let listPredictions = [];
        if(this.props.race) {
            listPredictions = this.props.predictions.map((reporter, key) =>

                <div key={reporter.id} className="predictions">
                    <p className="reporter-key">
                        {key+1}.
                    </p>
                    <p className="reporter">
                        <b>{reporter.reporter}</b> <br/>
                        <a target="_blank" href={reporter.societe === 'AIP' ? 'http://www.turf-fr.com/' : (reporter.societe === 'geny.com' ? 'http://www.geny.com/' : 'javascript:;')}>{reporter.societe === 'AIP' ? 'www.turf-fr.com' : (reporter.societe === 'geny.com' ? 'www.geny.com' : reporter.societe)}</a>
                    </p>
                    <ul>
                        {
                            reporter.predictions.map((prediction) =>
                                <li key={prediction.id}><span>{prediction.number}</span></li>
                            )
                        }
                    </ul>
                </div>
            );
        }
        
        return <div className="predictions">
            <div className="title" style={{marginBottom: 0}}>
                <h3>{this.props.predictions.length} <Trans i18nKey="Best Predictions"> Best Predictions</Trans>
                </h3>
            </div>
            <div className="predictions-container">
                {listPredictions}
            </div>
        </div>
    }
}