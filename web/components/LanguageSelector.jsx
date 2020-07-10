import _ from "lodash";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";

export default class LanguageSelector extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            unselectedLanguages : _.without(['en', 'fr', 'pt', 'mg'], props.lang),
            selectorOpened : false
        };
    }

    componentWillReceiveProps(props) {

        let url = "";
        if(props.race !== 'undefined' && props.race) {

            url = "/"+props.race.datePath+"/R"+props.reunion.number+"/C"+props.race.number
        }
        this.setState({url : url});
    }

    toggleSelector() {

        this.setState({selectorOpened : !this.state.selectorOpened});
    }

    render() {
        let url = "";

        if(this.props.race !== 'undefined' && this.props.race) {

            url = "/"+this.props.race.datePath+"/R"+this.props.reunion.number+"/C"+this.props.race.number
        }
        let unselectedLanguagesList = this.state.unselectedLanguages.map((lang) =>
            <li key={lang}>
                <a href={"/"+lang+url} >
                    <img src={require('./../assets/images/flags/'+lang+'.png')} alt={lang}/>
                </a>
            </li>
        );

        if(!this.props.lang) {
            return null;
        }
        return <div className="language-selector">

            <a href="javascript:;" onClick={() => {this.toggleSelector()}}>
                <img src={require("./../assets/images/flags/"+this.props.lang+".png")} alt=""/>
                <FontAwesomeIcon style={{marginLeft: '5px'}} icon={faAngleDown} />
            </a>
            <ul className="language-options" style={{display:!this.state.selectorOpened ? 'none' : 'block'}}>
                {unselectedLanguagesList}
            </ul>
        </div>
    }
}
