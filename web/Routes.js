import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import PrivateRoute from "./PrivateRoute";
import HomePage from "./containers/HomePage";
import News from "./containers/News";
import PredictionsPage from "./containers/PredictionsPage";
import CalendarResultsPage from "./containers/CalendarResultsPage";
import HowToBetPage from "./containers/HowToBetPage";
import NewsPage from "./containers/NewsPage";
import NotFoundPage from "./containers/NotFoundPage";

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={HomePage}/>
            {/*<Route exact path='/news' component={NewsPage}/>*/}
            {/*<Route exact path='/news/:lang' component={NewsPage}/>*/}
            <Route exact path='/:lang' component={HomePage}/>

            <Route exact path='/:lang/predictions' component={PredictionsPage}/>
            <Route exact path='/:lang/calendar-results' component={CalendarResultsPage}/>
            <Route exact path='/:lang/calendar-results/:date' component={CalendarResultsPage}/>
            <Route exact path='/:lang/how-to-bet' component={HowToBetPage}/>
            {/*<Route exact path='/:lang/news' component={NewsPage}/>*/}
            <Route exact path='/:lang/:date' component={HomePage}/>
            <Route exact path='/:lang/:date/R:reunionNumber' component={HomePage}/>
            <Route exact path='/:lang/:date/R:reunionNumber/C:raceNumber' component={HomePage}/>
            {/*<PrivateRoute path='/trip' component={TripLayout}/>*/}
            <Route path='*' exact={true} component={NotFoundPage}/>
        </Switch>
    </Router>
);

export default Routes;