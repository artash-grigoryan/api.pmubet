import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import PrivateRoute from "./PrivateRoute";
import HomePage from "./containers/HomePage";
import NotFoundPage from "./containers/NotFoundPage";

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/:reunionId/:raceNumber' component={HomePage}/>
            {/*<PrivateRoute path='/trip' component={TripLayout}/>*/}
            <Route path='*' exact={true} component={NotFoundPage}/>
        </Switch>
    </Router>
);

export default Routes;