import React from "react";
import MainMenu from "../components/MainMenu";

export default class NotFoundPage extends React.Component {
	static getProps() {
		return {};
	}
	render() {
		return <div>
			<header>
				<MainMenu {...this.state}/>
			</header>

			<div className="container-fluid">
				<div id="wrapper">
					<div id="main">
						<h2>Not found</h2>
						<p>The page you requested was not found.</p>
					</div>
				</div>
			</div>
		</div>;
	}
}
