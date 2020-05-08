import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import {connect} from 'react-redux';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Routes />
            </Router>
        );
    }
}

export default App;