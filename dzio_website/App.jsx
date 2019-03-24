import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import {connect} from 'react-redux';

import {userActions} from "./actions/user.js";

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

const actionCreators = {...userActions};

export default connect((state) => {
    return {...state};
}, actionCreators)(App);