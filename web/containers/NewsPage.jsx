import React, {Component} from "react";
import MainMenu from "../components/MainMenu.jsx";
import Footer from "../components/shared/footer/footer";
import { useTranslation, Trans } from "react-i18next";
const { t, i18n } = useTranslation();

export default class NewsPage extends Component {

    constructor(props) {

        super(props);
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
                        <iframe src="//35.180.105.76:9000/" frameBorder="0" width={'100%'} height={'100%'}
                                frameBorder={0}></iframe>
                    </div>
                </div>
            </div>
            <Footer />
		</div>;
	}
}
