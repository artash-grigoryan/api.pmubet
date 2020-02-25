import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import { store } from './helpers/store';
import './i18n/i18n';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);