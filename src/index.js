import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import registerServiceWorker from './services/registerServiceWorker';
import { runWithAdal } from 'react-adal';
import { authenticationContext, useAuthentication } from './services/AdalConfig'
import AuthenticationService from "./services/AuthenticationService";

if (useAuthentication) {
    runWithAdal(authenticationContext, () => {
        const authenticationService = new AuthenticationService();
        authenticationService.getToken()
            .then(() => {
                ReactDOM.render(<App authenticationContext={authenticationContext}/>, document.getElementById('root'));
                registerServiceWorker();
            });
    }, true);
} else {
    ReactDOM.render(<App/>, document.getElementById('root'));
    registerServiceWorker();
}
