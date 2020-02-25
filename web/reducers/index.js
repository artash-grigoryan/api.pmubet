import { combineReducers } from 'redux';
import {trip}  from "./trip";
import {geoLocation}  from "./location";
import {authentication}  from "./authentication";
import {registration}  from "./registration";
import {place}  from "./place";
import {languages}  from "./language";
import {criterion}  from "./criterion";
import {group, join}  from "./group";
import {chat}  from "./chat";
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    languages,
    criterion,
    trip,
    place,
    geoLocation,
    authentication,
    registration,
    group,
    join,
    chat,
    form: formReducer
});

export default rootReducer;