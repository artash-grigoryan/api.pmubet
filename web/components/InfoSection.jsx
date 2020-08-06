import _ from "lodash";
import React from "react";
import {Trans} from "react-i18next";


export default class InfoSection extends React.Component {

    componentWillReceiveProps(args) {

        this.props.race.discipline = (this.props.race.translation ? this.props.race.translation.discipline : null) || this.props.race.discipline;
    }

    getHippodromeImgPath(race) {

        let date = new Date(this.props.race.date);
        return '/img/hippodromes/'+date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2)+'_'+race.reunion.code+'-R'+race.reunion.number+'C'+race.number+'.png';
    }

    render() {

        let listBets = [];
        if(this.props.race) {

            let simple = false;
            let couple = false;
            let coupleOrdre = false;
            let trio = false;
            let twoOnFour = false;
            let multi = false;
            let tierce = false;
            let quarte = false;
            let quintePlus = false;

            this.props.race.bets.map((bet) => {

                switch (bet.lib) {

                    case 'SG':
                    case 'SP':
                    case 'ESG':
                        simple = true;
                        break;
                    case 'CG':
                    case 'ECG':
                        couple = true;
                        break;
                    case 'CP':
                    case 'ECP':
                        coupleOrdre = true;
                        break;
                    case 'TR':
                    case 'ETR':
                        trio = true;
                        break;
                    case 'C4':
                    case 'EC4':
                        twoOnFour = true;
                        break;
                    case 'MI':
                    case 'EMI':
                        multi = true;
                        break;
                    case 'T':
                    case 'ET':
                        tierce = true;
                        break;
                    case 'QP':
                    case 'EQP':
                        quarte = true;
                        break;
                    case 'QN':
                    case 'EQN':
                        quintePlus = true;
                        break;
                }
            });

            if(simple) {
                listBets.push(
                    <img key="SG" src="/img/bets/SG.png" alt=""/>
                );
            }
            if(couple) {
                listBets.push(
                    <img key="CG" src="/img/bets/CG.png" alt=""/>
                );
            }
            if(coupleOrdre) {
                listBets.push(
                    <img key="CP" src="/img/bets/CP.png" alt=""/>
                );
            }
            if(trio) {
                listBets.push(
                    <img key="TR" src="/img/bets/TR.png" alt=""/>
                );
            }
            if(twoOnFour) {
                listBets.push(
                    <img className="hide-elem" key="C4" src="/img/bets/C4.png" alt=""/>
                );
            }
            if(multi) {
                listBets.push(
                    <img className="hide-elem" key="MI" src="/img/bets/MI.png" alt=""/>
                );
            }
            if(tierce) {
                listBets.push(
                    <img className="hide-elem" key="T" src="/img/bets/T.png" alt=""/>
                );
            }
            if(quarte) {
                listBets.push(
                    <img className="hide-elem" key="QP" src="/img/bets/QP.png" alt=""/>
                );
            }
            if(quintePlus) {
                listBets.push(
                    <img key="QN" src="/img/bets/QN.png" alt=""/>
                );
            }
        }

        return <section className="info-section">
            <div className="container" style={{paddingTop: 50}}>

                <div className="block-race-condition">

                    <div className="row m-b-10">
                        <div className="col-md-3">
                            <div className="info-line-1">
                                <Trans i18nKey="Participants">Participants</Trans> :<br/>
                                <b>{this.props.race.runners.length} <Trans i18nKey="Runners">Runners</Trans></b>
                            </div>
                            <div className="info-line-2">
                                <Trans i18nKey="Distance">Distance</Trans> :<br/>
                                <b>{this.props.race.distance} <Trans i18nKey="meters">meters</Trans></b>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="info-line-1">
                                <Trans i18nKey="Sport">Sport</Trans> :<br/>
                                <b>{this.props.race.discipline}</b>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="bet-selector">
                                {listBets}
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="hippodrome-img" style={{backgroundImage:'url('+this.getHippodromeImgPath(this.props.race)+')'}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    }
}
