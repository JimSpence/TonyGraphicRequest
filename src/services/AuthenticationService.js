import {adalConfig, authenticationContext} from './AdalConfig';
import CryptoJS from 'crypto-js';

export default class AuthenticationService {
    getCosmosDBToken = (url, verb) => {
        const masterKey = 'pj7Oe0rDErGVf3dJU4OMd8PPOrkx5JyjdaM3PxiRcuhsDbONvTuUlafUtiGJkGiq5cluZDuaJD1LgBd7M9GrrA==';

        const today = new Date();
        const UTCString = today.toUTCString();
        // const verb = 'get';

        const resource = this.getResource(url);
        const requestText = (verb || '') + '\n'
                          + (resource.resourceType || '') + '\n'
                          + (resource.resourceId || '') + '\n'
                          + (UTCString.toLowerCase() || '') + '\n\n';

        const signature = CryptoJS.HmacSHA256(requestText.toLowerCase(), CryptoJS.enc.Base64.parse(masterKey));
        const base64Bits = CryptoJS.enc.Base64.stringify(signature);

        console.log(base64Bits);

        const masterToken = 'master';
        const tokenVersion = '1.0';

        return {
            token: encodeURIComponent('type=' + masterToken + '&ver=' + tokenVersion + '&sig=' + base64Bits),
            UTCDate: UTCString
        }
    };

    getResource = (url) => {
        const strippedUrl = url.replace(new RegExp('^https?://[^/]+/'), '/');
        const strippedParts = strippedUrl.split('/');
        const strippedCount = (strippedParts.length - 1);
        let resourceId = null;
        let resourceType = null;

        if (strippedCount % 2) {
            resourceType = strippedParts[strippedCount];

            if (strippedCount > 1) {
                const lastPart = strippedUrl.lastIndexOf('/');
                resourceId = strippedUrl.substring(1, lastPart);
            }
        } else {
            resourceType = strippedParts[strippedCount - 1];
            resourceId = strippedUrl.substring(1);
        }

        return {resourceId, resourceType}
    };

    getToken = () => {
        const cachedToken = authenticationContext.getCachedToken(adalConfig.clientId, authenticationContext);
        const storedToken = localStorage.getItem(authenticationContext.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY + adalConfig.clientId);
        //
        // if (cachedToken !== storedToken) {
        //     authenticationContext.login();
        // }
        console.log(cachedToken === storedToken);
        console.log('CACHED: ' + cachedToken);
        console.log(localStorage.getItem(authenticationContext.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY + adalConfig.clientId));
        console.log(authenticationContext._getItem(authenticationContext.CONSTANTS.STORAGE.LOGIN_REQUEST));

        const froggy = localStorage.getItem(authenticationContext.CONSTANTS.STORAGE.EXPIRATION_KEY + adalConfig.clientId);
        console.log(froggy);
        const blobby = authenticationContext._now();
        console.log(blobby);
        console.log(froggy - blobby);
        return cachedToken ? cachedToken : this.refreshToken();
    };

    // getMasterKey = () => {
        // const masterKey = authenticationContext.getAuthorizationTokenUsingMasterKey('get','dbs','')
    // };

    acquireToken = () => {
        authenticationContext.acquireToken(adalConfig.clientId, (error, token) => {
            if (error || !token) {
                if (!token) {
                    authenticationContext.login();
                } else {
                    console.log(error);
                }
            }
        });
    };

    refreshToken = () => {
        console.log(authenticationContext.getCachedUser());
        console.log('REFRESHING TOKEN');
        authenticationContext._renewToken(adalConfig.clientId, (error, token) => {
            if (error) {
                console.log(error);
            } else {
                return token
            }
        });
    }
}