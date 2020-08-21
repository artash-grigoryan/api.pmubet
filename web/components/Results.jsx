import _ from "lodash";
import React from "react";
import {Trans} from "react-i18next";


export default class Results extends React.Component {

    constructor(props) {

        super(props);

        let runnerSelected = _.find(props.race.results, function(runner){ return parseInt(runner.rank) === parseInt(1); });

        this.state = {

            runnerSelected : runnerSelected
        }
    }

    componentWillReceiveProps(props) {

        let runnerSelected = _.find(props.race.results, function(runner){ return parseInt(runner.rank) === parseInt(1); });
        this.setState({runnerSelected : runnerSelected});
    }

    setRunnerSelected(number) {

        let runnerSelected = _.find(this.props.race.results, function(runner){ return parseInt(runner.number) === parseInt(number); });
        this.setState({runnerSelected : runnerSelected});
    }

    render() {

        return <div className="prediction-top">
            <div className="title m-b-0">
                <h3><Trans i18nKey="Final arrival">Final arrival</Trans></h3>
            </div>
            <div className="prediction">
                <div className="prediction-header">
                    <ul className={this.props.race.results.length > 6 ? 'minimized' : ''}>
                        {
                            this.props.race.results.slice(0, 8).map((runner) =>
                                <li key={parseInt(runner.number)} className={parseInt(runner.number)===parseInt(this.state.runnerSelected.number)?'active' : '' }><a onClick={() => this.setRunnerSelected(runner.number)}>{runner.number}</a></li>
                            )
                        }
                    </ul>
                </div>
                <div className="prediction-body tab-content race-time">

                    {
                        this.state.runnerSelected
                        ?
                            <div>
                                <h2 className="text-uppercase">
                                    <b style={{color: "#000"}}><Trans i18nKey="Race time">Race time</Trans> <br/></b> <b className="primary-color">{this.props.race.raceTime}</b>
                                </h2>
                            </div>
                        :
                            null
                    }


                </div>
            </div>
        </div>
    }
}
