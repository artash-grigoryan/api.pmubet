import _ from "lodash";
import React from "react";
import {connect} from "react-redux";

class ReactLogo extends React.Component {
	render() {
		let { type } = this.props;
		let url = {
			"svg": require("./ReactLogo/logo.jpg"),
			"png": require("./ReactLogo/logo.jpg"),
			"jpg": require("./ReactLogo/logo.jpg")
		}[type];

		return <img src={url} height="40" width="50" />;
	}
}
function mapStateToProps(state) {
    const { registering } = state.registration;
    const {predictionsLoading} = state.trip;
	let loading = registering || predictionsLoading;

	return {
        type: loading? "gif": "svg"
    };
}

export default connect(mapStateToProps)(ReactLogo);
