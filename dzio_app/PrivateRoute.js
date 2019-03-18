import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux";

const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route {...rest}  render={(props) => (
        rest.loggedIn &&
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
);

const mapStateToProps = (state) => {
    return {
        loggedIn: state.authentication.loggedIn
    };
};

export default connect(mapStateToProps, null)(PrivateRoute);