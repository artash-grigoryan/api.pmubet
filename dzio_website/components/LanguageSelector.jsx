import _ from "lodash";
import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

export default class LanguageSelector extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            unselectedLanguages : _.without(['hy', 'ru', 'en'], props.lang),
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
                    <img src={"/img/flags/"+lang+".png"}/>
                </a>
            </li>
        );

        return <div className="language-selector">

            <a href="javascript:;" onClick={() => {this.toggleSelector()}}>
                <img src={"/img/flags/"+this.props.lang+".png"} alt=""/>
                <FontAwesomeIcon style={{marginLeft: '5px'}} icon="angle-down" />
            </a>
            <ul className="language-options" style={{display:!this.state.selectorOpened ? 'none' : 'block'}}>
                {unselectedLanguagesList}
            </ul>
        </div>
    }
}