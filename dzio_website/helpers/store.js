import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/index';

// const loggerMiddleware = createLogger();

const preloadedState = JSON.parse(window.__PRELOADED_STATE__);

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const a = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    preloadedState,
    a(applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware
    ))
);