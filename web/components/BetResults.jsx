import React from "react";
import {Trans} from "react-i18next";

import BetResultsDetails from "./BetResultsDetails"


export default class BetResults extends React.Component {

    render() {

        let listBets = [];

        if(this.props.race.betResults) {

            this.props.race.betResults.map((bet) => {

                listBets.push(
                    <div key={bet.name} className="" style={{marginBottom: 10}}>
                        <BetResultsDetails betSelected={bet.name} {...this.props} />
                    </div>
                )
            });
        }

        return <section className="results-section">
            <div className="container">

                <div className="row">

                    <div className="col-md-12 m-b-10">
                        <div className="title m-b-0">
                            <h3><Trans i18nKey="Reports">Reports</Trans></h3>
                        </div>

                        {listBets}
                    </div>
                </div>
            </div>
        </section>
    }
}
