import {authenticationContext} from './AdalConfig';
import Utils from './Utils';
import CryptoJS from 'crypto-js';
import {msGraphConfig} from './MsGraphConfig'

export default class AuthenticationService {

    getCosmosDBToken = (url, verb) => {

        // TODO: The Master Key needs to be stored somewhere - SharePoint list? to where users must authenticate in order to retrieve it.
        const masterKey = 'pj7Oe0rDErGVf3dJU4OMd8PPOrkx5JyjdaM3PxiRcuhsDbONvTuUlafUtiGJkGiq5cluZDuaJD1LgBd7M9GrrA==';
        const today = new Date();
        const UTCString = today.toUTCString();

        const resource = this.getResource(url);
        const requestText = (verb || '') + '\n'
                          + (resource.resourceType || '') + '\n'
                          + (resource.resourceId || '') + '\n'
                          + (UTCString.toLowerCase() || '') + '\n\n';

        const signature = CryptoJS.HmacSHA256(requestText.toLowerCase(), CryptoJS.enc.Base64.parse(masterKey));
        const base64Bits = CryptoJS.enc.Base64.stringify(signature);

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
        return new Promise(resolve => {
            // authenticationContext.clearCache();
            const cachedToken = authenticationContext.getCachedToken(msGraphConfig.graphApiUri, authenticationContext);
            // const storedToken = localStorage.getItem(authenticationContext.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY + adalConfig.clientId);
            // console.log(authenticationContext.getCachedUser());
            //
            // if (cachedToken !== storedToken) {
            //     authenticationContext.login();
            // }
            // console.log(cachedToken === storedToken);
            // console.log('CACHED: ' + cachedToken);
            // console.log(localStorage.getItem(authenticationContext.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY + adalConfig.clientId));
            // console.log(authenticationContext._getItem(authenticationContext.CONSTANTS.STORAGE.LOGIN_REQUEST));

            // const expirationKey = localStorage.getItem(authenticationContext.CONSTANTS.STORAGE.EXPIRATION_KEY + adalConfig.clientId);
            // console.log(expirationKey);
            // const currentKey = authenticationContext._now();
            // console.log(currentKey);
            // console.log(expirationKey - currentKey);
            // return cachedToken ? cachedToken : this.refreshToken();
            resolve(cachedToken ? cachedToken : this.acquireToken());
        });
    };

    acquireToken = () => {
        return new Promise((resolve) => {
            authenticationContext.acquireToken(msGraphConfig.graphApiUri, (error, token) => {
                if (error || !token) {
                    if (!token) {
                        authenticationContext.login();
                    } else {
                        console.log(error);
                    }
                } else {
                    resolve(token);
                }
            });
        });
    };

    logOut = () => {
        return authenticationContext.logOut();
    };

    getUserDetail = (token) => {
        return new Promise((resolve) => {
            const uri = msGraphConfig.graphApiUri + msGraphConfig.graphApiVersion + msGraphConfig.me;
            const config = {
                headers: {
                    authorization: 'Bearer ' + token
                }
            };

            fetch(uri, config)
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                });
        })
    };

    getUserPhoto = (token) => {
        return new Promise((resolve, reject) => {
            const uri = msGraphConfig.graphApiUri + msGraphConfig.graphApiVersion + msGraphConfig.me + '/photo/$value';
            const config = {
                headers: {
                    authorization: 'Bearer ' + token
                }
            };

            fetch(uri, config)
                .then((response) => {
                    if (response.ok) {
                        console.log(response);
                        response.arrayBuffer()
                            .then(buffer => Utils.arrayBufferToBase64(buffer))
                            .then(base64Encoded => 'data:image/jpeg;base64,' + base64Encoded)
                            .then(image => {
                                resolve(image);
                            });
                    } else {
                        reject('No user photo found');
                    }
                });
        });
    }
}
