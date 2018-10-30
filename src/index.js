import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import registerServiceWorker from './services/registerServiceWorker';
import { runWithAdal } from 'react-adal';
import { authenticationContext } from './services/AdalConfig'

runWithAdal(authenticationContext, () => {
    ReactDOM.render(<App/>, document.getElementById('root'));
    registerServiceWorker();
});
