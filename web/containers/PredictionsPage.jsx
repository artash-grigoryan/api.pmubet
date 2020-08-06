import React, {Component} from "react";
import MainMenu from "../components/MainMenu.jsx";
import Footer from "../components/shared/footer/footer";
import { useTranslation, Trans } from "react-i18next";

export default class PredictionsPage extends Component {

    constructor(props) {

        super(props);
        const { t, i18n } = useTranslation();
        this.state = {
            lang: this.props.match.params.lang,
        };
    }

    async componentWillMount() {

    }

	render() {

		return <div>
            <header>
                <MainMenu {...this.state}/>
            </header>

            <div className="container-fluid">
                <div id="wrapper">
                    <div id="main">
                        <p>PRESICTIONS TOTO WITH PHILIPPE</p>
                    </div>
                </div>
            </div>

            <Footer />
		</div>;
	}
}
