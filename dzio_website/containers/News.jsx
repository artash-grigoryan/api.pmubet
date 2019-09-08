import React, {Component} from "react";

import "./../assets/css/main.scss";

import { useTranslation, Trans } from "react-i18next";
const { t, i18n } = useTranslation();
const i18next = require('i18next');

export default class HomePage extends Component {

	render() {



		return <div>
            <iframe src="https://35.180.105.76:9000/" frameborder="0" width={'100%'} height={'100%'}></iframe>
		</div>;
	}
}
