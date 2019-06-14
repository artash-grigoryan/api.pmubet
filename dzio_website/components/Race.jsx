
import React from "react";
import '@fortawesome/fontawesome';

import Banner from "./Banner";
import BannerAdmin from "./BannerAdmin";
import InfoSection from "./InfoSection";
import Runners from "./Runners";
import Predictions from "./Predictions";
import PredictionTop from "./PredictionTop";
import NextQ5 from "./NextQ5";
import Results from "./Results";
import BetResults from "./BetResults";


export default class Race extends React.Component {

    constructor(args) {
        super(args);
        this.props.race.comment = (this.props.race.translation ? this.props.race.translation.comment : null) || this.props.race.comment;
        this.props.race.description = (this.props.race.translation ? this.props.race.translation.description : null) || this.props.race.description;
    }

    render() {

        return <div>
            <Banner {...this.props}/>
            <BannerAdmin/>

            <InfoSection {...this.props}/>

            <section className="info-section">
                <div className="container">

                    <div className="race-comment">
                        <p style={{textAlign:'justify'}}>{this.props.race.comment || this.props.race.description}</p>
                    </div>

                    <div className="row">

                        <div className="col-lg-4 col-md-12">
                            <Runners {...this.props}/>
                        </div>

                        <div className="col-lg-5 col-md-12">
                        {
                            !this.props.race.betResults.length && this.props.predictionTop
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
                            !this.props.race.betResults.length && this.props.predictions
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
                this.props.race.betResults.length
                    ?
                    <BetResults {...this.props}/>
                    :
                    null
            }
        </div>
    }
}