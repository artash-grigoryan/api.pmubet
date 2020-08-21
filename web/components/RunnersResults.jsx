import React from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans} from "react-i18next";

import Carousel from 'react-bootstrap/Carousel'
import {faInfoCircle, faUserSlash, faTrophy} from "@fortawesome/free-solid-svg-icons";


export default class RunnersResults extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            runnerSelected : null,
            runners: [...props.race.runners.filter(runner => !runner.doNotRun).sort((a, b) => {
                if(a.rank === null) {
                    return 1;
                }
                if(b.rank === null) {
                    return -1;
                }
                return parseInt(a.rank) - parseInt(b.rank)
            }), ...props.race.runners.filter(runner => runner.doNotRun)]
        }
    }

    componentWillReceiveProps(props) {
        this.setState({runnerSelected : null});
        this.setState({runners: [...props.race.runners.filter(runner => !runner.doNotRun).sort((a, b) => {
            if(a.rank === null) {
                return 1;
            }
            if(b.rank === null) {
                return -1;
            }
            return parseInt(a.rank) - parseInt(b.rank)
        }), ...props.race.runners.filter(runner => runner.doNotRun)]});
    }

    getCasaqueImgPath(race, runner) {

        let date = new Date(this.props.race.date);
        return process.env.API_URL+'/img/casaques/'+date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2)+'-R'+race.reunion.number+'C'+race.number+'P'+runner.number+'.png';
    }

    selectRunner(runner) {

        if(runner === this.state.runnerSelected) {
            this.setState({runnerSelected : null});
        }
        else {
            this.setState({runnerSelected : runner})
        }
    }

    render() {

        let listRunners = [];
        if(this.props.race) {
            listRunners = this.state.runners.map((runner) =>
                <div key={runner.number} >
                    <div className="runner" onClick={() => this.selectRunner(runner)} style={{border:runner.doNotRun?'1px solid rgb(222, 43, 37)':0}}>
                        <div style={{display:'flex'}}>
                            <span className="info-runner-icon">
                                <FontAwesomeIcon icon={faInfoCircle}/>
                            </span>
                            <span className="runner-rank trophy">
                                {parseInt(runner.rank) <= 3 && (
                                    <FontAwesomeIcon icon={faTrophy} style={{fontSize: 30,color: parseInt(runner.rank) === 1 ? '#FFD700' : parseInt(runner.rank) === 2 ? '#D3D3D3' : '#CD7F32'}}/>
                                )}
                                <span>
                                    {!runner.doNotRun && !runner.time ? "DAI" : runner.rank}
                                </span>
                            </span>
                            <span className="runner-img">
                                {
                                    !runner.doNotRun
                                    ?
                                        <img src={this.getCasaqueImgPath(this.props.race, runner)}/>
                                    :
                                        <FontAwesomeIcon icon={faUserSlash} style={{color:'#de2b25',fontSize:26}} />
                                }

                            </span>
                            <span className="runner-name">
                                <p>{runner.number}. {(runner.translation ? runner.translation.name : null) || runner.name}</p>
                                <span>{(runner.translation ? runner.translation.jokey : null) || runner.jokey}</span>
                                <span className="music-divider">{runner.music && ' - '} </span>
                                <span className="music">{runner.music && runner.music} </span>
                            </span>
                        </div>
                        <span className="runner-cote">
                            <span>{runner.time}</span>
                        </span>
                    </div>
                    {
                        this.state.runnerSelected && this.state.runnerSelected.number === runner.number
                        ?
                            <div className="runner-details">
                                <Carousel interval={null} fade={true}>
                                    <Carousel.Item>
                                        <Carousel.Caption>
                                            <h3><Trans i18nKey="Performances">Performances</Trans></h3>
                                            <ul>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Number of races">Number of races</Trans></span>
                                                    <span className="runner-detail-value">{runner.nbRaces}</span>
                                                </li>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Number of races won">Number of races won</Trans></span>
                                                    <span className="runner-detail-value">{runner.nbRacesWon}</span>
                                                </li>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Number of places">Number of places</Trans></span>
                                                    <span className="runner-detail-value">{runner.nbPlaces}</span>
                                                </li>
                                            </ul>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <Carousel.Caption>
                                            <h3><Trans i18nKey="Runner details">Runner details</Trans></h3>
                                            <ul>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Coach">Coach</Trans></span>
                                                    <span className="runner-detail-value">{(runner.translation ? runner.translation.coach : null) || runner.coach}</span>
                                                </li>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Owner">Owner</Trans></span>
                                                    <span className="runner-detail-value">{(runner.translation ? runner.translation.owner : null) || runner.owner}</span>
                                                </li>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Farmer">Farmer</Trans></span>
                                                    <span className="runner-detail-value">{(runner.translation ? runner.translation.farmer : null) || runner.farmer}</span>
                                                </li>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Breed">Breed</Trans></span>
                                                    <span className="runner-detail-value">{(runner.translation ? runner.translation.breed : null) || runner.breed}</span>
                                                </li>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Gender">Gender</Trans></span>
                                                    <span className="runner-detail-value">{runner.sex==='H'?<Trans i18nKey="Male">Male</Trans>:<Trans i18nKey="Female">Female</Trans>}</span>
                                                </li>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Birthday">Birthday</Trans></span>
                                                    <span className="runner-detail-value">{runner.birthday}</span>
                                                </li>
                                            </ul>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <Carousel.Caption>
                                            <h3><Trans i18nKey="Ancestry">Ancestry</Trans></h3>
                                            <ul>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Name of the mother">Name of the mother</Trans></span>
                                                    <span className="runner-detail-value">{(runner.translation ? runner.translation.mother : null) || runner.mother}</span>
                                                </li>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Name of the father">Name of the father</Trans></span>
                                                    <span className="runner-detail-value">{(runner.translation ? runner.translation.father : null) || runner.father}</span>
                                                </li>
                                            </ul>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        :
                            null
                    }
                </div>
            );
        }

        return <div>

            <div className="title double-title m-b-0">
                <h3><Trans i18nKey={"Ranking"}>Ranking</Trans></h3>
                <span className="add-value"><img src="https://www.equidia.fr/assets/img/icons-png/discipline_trot.png" alt="Monté"/><span>R{this.props.reunion.externNumber} C{this.props.race.number}</span></span>
            </div>
            <div className="runners-tab">
                <div className="table-striped">
                    {listRunners}
                </div>
            </div>
        </div>
    }
}
