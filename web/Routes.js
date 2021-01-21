import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import HomePage from "./containers/HomePage";
import PredictionsPage from "./containers/PredictionsPage";
import CalendarResultsPage from "./containers/CalendarResultsPage";
import HowToBetPage from "./containers/HowToBetPage";
import NotFoundPage from "./containers/NotFoundPage";

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={CalendarResultsPage}/>
            <Route exact path='/:lang' component={CalendarResultsPage}/>

            <Route exact path='/:lang/predictions' component={PredictionsPage}/>
            <Route exact path='/:lang/calendar-results' component={CalendarResultsPage}/>
            <Route exact path='/:lang/calendar-results/:date' component={CalendarResultsPage}/>
            <Route exact path='/:lang/comment-jouer' component={HowToBetPage}/>
            <Route exact path='/:lang/:date' component={HomePage}/>
            <Route exact path='/:lang/:date/R:reunionNumber' component={HomePage}/>
            <Route exact path='/:lang/:date/R:reunionNumber/C:raceNumber' component={HomePage}/>
            <Route path='*' exact={true} component={NotFoundPage}/>
        </Switch>
    </Router>
);

export default Routes;
