import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import App from './custom-components/App';
import * as serviceWorker from './serviceWorker';
import {HashRouter} from 'react-router-dom'

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));


serviceWorker.unregister();
