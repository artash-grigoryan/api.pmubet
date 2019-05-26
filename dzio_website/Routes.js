import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import PrivateRoute from "./PrivateRoute";
import HomePage from "./containers/HomePage";
import PredictionsPage from "./containers/PredictionsPage";
import CalendarResultsPage from "./containers/CalendarResultsPage";
import HowToBetPage from "./containers/HowToBetPage";
import NewsPage from "./containers/NewsPage";
import NotFoundPage from "./containers/NotFoundPage";

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/:date' component={HomePage}/>
            <Route exact path='/:date/R:reunionNumber' component={HomePage}/>
            <Route exact path='/:date/R:reunionNumber/C:raceNumber' component={HomePage}/>
            <Route exact path='/predictions' component={PredictionsPage}/>
            <Route exact path='/calendar-results' component={CalendarResultsPage}/>
            <Route exact path='/how-to-bet' component={HowToBetPage}/>
            <Route exact path='/news' component={NewsPage}/>
            {/*<PrivateRoute path='/trip' component={TripLayout}/>*/}
            <Route path='*' exact={true} component={NotFoundPage}/>
        </Switch>
    </Router>
);

export default Routes;