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

        let runnerRank = _.find(props.predictionTop.predictions, function(runner){ return parseInt(runner.rank) === parseInt(1); });
        let runnerSelected = _.find(props.race.runners, function(runner){ return parseInt(runner.number) === parseInt(runnerRank.number); });

        this.state = {

            runnerSelected : runnerSelected
        }
    }

    componentWillReceiveProps(props) {
        let runnerRank = _.find(props.predictionTop.predictions, function(runner){ return parseInt(runner.rank) === parseInt(1); });
        let runnerSelected = _.find(props.race.runners, function(runner){ return parseInt(runner.number) === parseInt(runnerRank.number); });
        this.setState({runnerSelected : runnerSelected});
    }

    setRunnerSelected(rank) {

        let runnerRank = _.find(this.props.predictionTop.predictions, function(runner){ return parseInt(runner.rank) === parseInt(rank); });
        let runnerSelected = _.find(this.props.race.runners, function(runner){ return parseInt(runner.number) === parseInt(runnerRank.number); });
        this.setState({runnerSelected : runnerSelected});
    }

    render() {

        return <div className="prediction-top">
            <div className="title m-b-0">
                <h3><Trans i18nKey="Top Predictions">Top Prediction</Trans></h3>
            </div>
            <div className="prediction">
                <div className="prediction-header">
                    <ul className={this.props.predictionTop.predictions.length > 6 ? 'minimize' : ''}>
                        {
                            this.props.predictionTop.predictions.map((runner) =>
                                <li key={parseInt(runner.rank)} className={parseInt(runner.number)===parseInt(this.state.runnerSelected.number)?'active' : '' }><a onClick={() => this.setRunnerSelected(runner.rank)}>{runner.number}</a></li>
                            )
                        }
                    </ul>
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
                                <p><span>{this.state.runnerSelected.comment}</span>
                                </p>
                            </div>
                        :
                            null
                    }


                </div>
            </div>
        </div>
    }
}