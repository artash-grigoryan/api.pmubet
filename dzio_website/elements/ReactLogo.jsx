import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class ReactLogo extends React.Component {
	render() {
		let { type } = this.props;
		let url = {
			"svg": require("./ReactLogo/logo.jpg"),
			"png": require("./ReactLogo/logo.jpg"),
			"jpg": require("./ReactLogo/logo.jpg")
		}[type];

		return <Link className={"navbar-brand"} to="/">
			<img className={"header-logo"} src={url} height="40" width="50" />;
		</Link>
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
