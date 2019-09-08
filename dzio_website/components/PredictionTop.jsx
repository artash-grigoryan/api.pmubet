import _ from "lodash";
import React from "react";
import '@fortawesome/fontawesome';

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {Trans} from "react-i18next";
import {reunionActions} from "../actions/reunion";
import {raceActions} from "../actions/race";


export default class PredictionTop extends React.Component {

    constructor(props) {

        super(props);

        if(props.predictionTop) {
            let runnerRank = _.find(props.predictionTop.predictions, function(runner){ return parseInt(runner.rank) === parseInt(1); });
            let runnerSelected = _.find(props.race.runners, function(runner){ return parseInt(runner.number) === parseInt(runnerRank.number); });

            runnerSelected.name = (runnerSelected.translation ? runnerSelected.translation.name : null) || runnerSelected.name;
            runnerSelected.comment = (runnerSelected.translation ? runnerSelected.translation.comment : null) || runnerSelected.comment;

            this.state = {runnerSelected : runnerSelected}
        }
    }

    componentWillReceiveProps(props) {

        if(props.predictionTop) {
            let runnerRank = _.find(props.predictionTop.predictions, function(runner){ return parseInt(runner.rank) === parseInt(1); });
            let runnerSelected = _.find(props.race.runners, function(runner){ return parseInt(runner.number) === parseInt(runnerRank.number); });

            runnerSelected.name = (runnerSelected.translation ? runnerSelected.translation.name : null) || runnerSelected.name;
            runnerSelected.comment = (runnerSelected.translation ? runnerSelected.translation.comment : null) || runnerSelected.comment;

            this.setState({runnerSelected : runnerSelected});
        }
    }

    setRunnerSelected(number) {

        let runnerRank = _.find(this.props.predictionTop.predictions, function(runner){ return parseInt(runner.number) === parseInt(number); });
        let runnerSelected = _.find(this.props.race.runners, function(runner){ return parseInt(runner.number) === parseInt(runnerRank.number); });

        runnerSelected.name = (runnerSelected.translation ? runnerSelected.translation.name : null) || runnerSelected.name;
        runnerSelected.comment = (runnerSelected.translation ? runnerSelected.translation.comment : null) || runnerSelected.comment;

        this.setState({runnerSelected : runnerSelected});
    }

    render() {

        return <div className="prediction-top">
            <div className="title m-b-0">
                <h3><Trans i18nKey="Last Predictions">Last Prediction</Trans></h3>
            </div>
            <div className="prediction">
                <div className="prediction-header">
                    {
                        this.props.predictionTop
                        ?
                            <ul className={this.props.predictionTop.predictions.length > 6 ? 'minimize' : ''}>
                                {
                                    this.props.predictionTop.predictions.map((runner) =>
                                        <li key={parseInt(runner.number)} className={parseInt(runner.number)===parseInt(this.state.runnerSelected.number)?'active' : '' }><a onClick={() => this.setRunnerSelected(runner.number)}>{runner.number}</a></li>
                                    )
                                }
                            </ul>
                        :
                            null
                    }
                </div>
                <div className="prediction-body tab-content">

                    {
                        this.props.predictionTop
                        ?
                            <div>
                                <h2 className="text-uppercase">
                                    <b className="primary-color">{this.state.runnerSelected.number}</b> -
                                    <a href="">{this.state.runnerSelected.name}</a>
                                </h2>
                                <p><span>{this.state.runnerSelected.comment}</span></p>
                                <div className="prediction-info">
                                    <p className="reporter">
                                        <b>{this.props.predictionTop.reporter}</b> <br/>
                                        <a href={this.props.predictionTop.societe === 'AIP' ? 'http://www.turf-fr.com/' : (this.props.predictionTop.societe === 'geny.com' ? 'http://www.geny.com/' : 'javascript:;')}>{this.props.predictionTop.societe === 'AIP' ? 'www.turf-fr.com' : (this.props.predictionTop.societe === 'geny.com' ? 'www.geny.com' : this.props.predictionTop.societe)}</a>
                                    </p>
                                </div>
                            </div>
                        :
                            null
                    }


                </div>
            </div>
        </div>
    }
}