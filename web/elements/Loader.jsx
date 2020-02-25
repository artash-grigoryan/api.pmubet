import React from "react";
// import gif from "./Loader/Loader.gif";
import svg from "./Loader/Loader.svg";

export default class Loader extends React.Component {
	render() {
        const { type } = this.props;
		const url = {
			"svg": svg,
			// "gif": gif
		}[type];
		return <div>
			<img src={url} height="40" width="50" />
		</div>;
	}
}
