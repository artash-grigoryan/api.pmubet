import _ from "lodash";
import React from "react";
import '@fortawesome/fontawesome';

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {Trans} from "react-i18next";
import Banner from "./Banner";
import InfoSection from "./InfoSection";
import Runners from "./Runners";
import Predictions from "./Predictions";
import PredictionTop from "./PredictionTop";
import NextQ5 from "./NextQ5";
import Results from "./Results";
import BetResults from "./BetResults";


export default class Race extends React.Component {

    render() {

        return <div>
            <Banner {...this.props}/>

            <InfoSection {...this.props}/>

            <section className="info-section">
                <div className="container">

                    {
                        this.props.race.comment
                            ?
                            <div className="race-comment">
                                <p>{this.props.race.comment}</p>
                            </div>
                            :
                            null
                    }

                    <div className="row">

                        <div className="col-lg-4 col-md-12">
                            <Runners {...this.props}/>
                        </div>

                        <div className="col-lg-5 col-md-12">
                        {
                            !this.props.race.bet_results
                                ?

                                    <PredictionTop {...this.props}/>
                                :
                                    <Results {...this.props}/>
                        }
                        </div>

                        <div className="col-lg-3 col-md-12" style={{marginTop: "61px"}}>
                            {
                                this.props.nextQ5
                                    ?
                                    <NextQ5 {...this.props}/>
                                    :
                                    ''
                            }

                        </div>

                        {
                            new Date(this.props.race.date).getTime() > Date.now()
                                ?
                                <div className="col-lg-12">
                                    <Predictions {...this.props}/>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
            </section>

            {
                this.props.race.bet_results
                    ?
                    <BetResults {...this.props}/>
                    :
                    null
            }
        </div>
    }
}