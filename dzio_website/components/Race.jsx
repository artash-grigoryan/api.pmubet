
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

    constructor(props) {

        super(props);

        this.props.race.comment = (this.props.race.translation ? this.props.race.translation.comment : null) || this.props.race.comment;
        this.props.race.description = (this.props.race.translation ? this.props.race.translation.description : null) || this.props.race.description;

        let timezoneHours = parseInt(this.props.race.time.substring(0,2)) + parseInt(this.props.timezoneOffset);
        while (timezoneHours.toString().length < 2) {timezoneHours = "0" + timezoneHours;}
        let timezoneMinutes = parseInt(this.props.race.time.substring(3,5));
        while (timezoneMinutes.toString().length < 2) {timezoneMinutes = "0" + timezoneMinutes;}
        this.props.race.timezoneTime = timezoneHours + ':' + timezoneMinutes;
        this.props.race.date = new Date(this.props.race.day+' '+this.props.race.timezoneTime);

        let raceDate = new Date(this.props.race.date);
        this.state = {
            isOver : raceDate < new Date()
        }
    }
    componentWillReceiveProps(args) {

        this.props.race.comment = (this.props.race.translation ? this.props.race.translation.comment : null) || this.props.race.comment;
        this.props.race.description = (this.props.race.translation ? this.props.race.translation.description : null) || this.props.race.description;

        let raceDate = new Date(this.props.race.date);
        this.setState({isOver : raceDate < new Date()});
    }

    render() {

        return <div>
            <Banner {...this.props}/>

            <InfoSection {...this.props}/>

            <section className="info-section">
                <div className="container">

                    <div className="race-comment">
                        <p style={{textAlign:'justify'}}>{this.props.race.comment || this.props.race.description}</p>
                    </div>

                    <div className="row">

                        <div className="col-lg-4 col-md-12 runners-container">
                            <Runners {...this.props}/>
                        </div>

                        <div className="col-lg-5 col-md-12 top-container">
                        {
                            !this.state.isOver
                                ?

                                    <PredictionTop {...this.props}/>
                                :
                                    <Results {...this.props}/>
                        }
                        </div>

                        <div className="col-lg-3 col-md-12 nextQ5">
                            {
                                this.props.nextQ5
                                    ?
                                    <NextQ5 {...this.props}/>
                                    :
                                    ''
                            }

                        </div>

                        {
                            !this.state.isOver
                                ?
                                <div className="col-lg-12 prono-container">
                                    <Predictions {...this.props}/>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
            </section>

            {
                this.state.isOver
                    ?
                    <BetResults {...this.props}/>
                    :
                    null
            }
        </div>
    }
}