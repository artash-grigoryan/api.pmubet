import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n/i18n';

ReactDOM.hydrate(<App />, document.getElementById('app'));