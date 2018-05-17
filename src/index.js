import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.css';
import updateAccount from './simulation/updateAccount';
import SetInterval from 'set-interval';

//SetInterval.start(updateAccount, 5000, 'updateAccount');


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
