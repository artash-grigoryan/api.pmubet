import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import FacebookAppButton from "./components/FacebookAppButton";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Router>
                    <Routes />
                </Router>
                <FacebookAppButton/>
            </React.Fragment>
        );
    }
}

export default App;
