import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import {connect} from 'react-redux';
import DialogMenu from "./components/DialogMenu";
import WhatsAppButton from "./components/WhatsAppButton";

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
                <WhatsAppButton/>
            </React.Fragment>
        );
    }
}

export default App;