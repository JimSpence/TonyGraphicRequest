import AzureConfig from './AzureConfig';
import AuthenticationService from "./AuthenticationService";
import Utils from "../helpers/Utils";

export default class CosmosDBService {
    azureConfig = new AzureConfig();
    collection = 'dealerorders';

    getDealerOrders = (authenticationService, dealerOrderId) => {
        return new Promise((resolve) => {
            if (dealerOrderId) {
                this.getDocument(this.collection, authenticationService, dealerOrderId)
                    .then((data) => {
                        // resolve(Utils.arrayToObject(data.Documents, 'id'));
                    })
            } else {
                this.getDocuments(this.collection, authenticationService)
                    .then((data) => {
                        resolve(Utils.arrayToObject(data.Documents, 'id'));
                    });
            }
            // const dealerOrdersDB = firebase.database().ref(uri);
            //
            // return dealerOrdersDB.on('value', (data) => {
            //     resolve(data.val());
            // });
        });
    };

    deleteDealerOrder = (authenticationService, dealerOrderId) => {
        return this.deleteDocument(this.collection, authenticationService, null, dealerOrderId)
    };

    createCollectionIfNotExists = (collection, authenticationService) => {
        return new Promise((resolve) => {
            this.getCollection(collection, authenticationService)
                .then(response => {
                    if (response.code === 'NotFound') {
                        this.createCollection(collection, authenticationService)
                            .then(response => {
                                resolve(response);
                            });
                    } else {
                        resolve(response);
                    }
                });
        });
    };

    getCollection = (collection, authenticationService) => {
        return new Promise(resolve => {
            const uri = this.azureConfig.getCollectionUri(collection);

            this.getDBObject(uri, authenticationService)
                .then(response => {
                    resolve(response);
                });
        });
    };

    createCollection = (collection, authenticationService) => {
        return new Promise((resolve, reject) => {
            const uri = this.azureConfig.getCollectionsUri();
            const {token, UTCDate} = authenticationService.getCosmosDBToken(uri, 'POST');
            const body = {
                id: collection
            };

            this.postData(token, UTCDate, uri, 'POST',  body)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)
                });
        });
    };

    createDocument = (collection, authenticationService, data) => {
        return this.processRequest(collection, authenticationService, 'POST', data);
    };

    updateDocument = (collection, authenticationService, data, documentId) => {
        return this.processRequest(collection, authenticationService, 'PUT', data, documentId);
    };

    deleteDocument = (collection, authenticationService, data, documentId) => {
        return this.processRequest(collection, authenticationService, 'DELETE', data, documentId);
    };

    processRequest = (collection, authenticationService, method, data, documentId) => {
        const uri = documentId ? this.azureConfig.getDocumentUri(collection, documentId) : this.azureConfig.getDocumentsUri(collection);
        const {token, UTCDate} = authenticationService.getCosmosDBToken(uri, method);

        return new Promise((resolve, reject) => {
            this.postData(token, UTCDate, uri, method, data, documentId)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)
                });
        });
    };

    getDBObject = (uri, authenticationService) => {
        const {token, UTCDate} = authenticationService.getCosmosDBToken(uri, 'GET');

        return new Promise((resolve, reject) => {
            this.getData(token, UTCDate, uri)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)
                });
        });
    };

    getDocuments = (collection, authenticationService) => {
        const uri = this.azureConfig.getDocumentsUri(collection);
        const {token, UTCDate} = authenticationService.getCosmosDBToken(uri, 'GET');

        return new Promise((resolve, reject) => {
            this.getData(token, UTCDate, uri)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)
                });
        });
    };

    getDocument = (collection, authenticationService, document) => {
        const uri = this.azureConfig.getDocumentUri(collection, document);
        const {token, UTCDate} = authenticationService.getCosmosDBToken(uri, 'GET');

        return new Promise((resolve, reject) => {
            this.getData(token, UTCDate, uri)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)
                });
        });
    };

    getDropdownData() {
        const screenData = {};
        const authenticationService = new AuthenticationService();

        return new Promise(resolve => {
            this.getDocuments('stores', authenticationService)
                .then(stores => {
                    screenData.stores = Utils.arrayToObject(stores.Documents, 'id');
                    const authenticationService = new AuthenticationService();
                    return this.getDocuments('seasons', authenticationService)
                })
                .then(seasons => {
                    screenData.seasons = Utils.arrayToObject(seasons.Documents, 'id');
                    const authenticationService = new AuthenticationService();
                    return this.getDocuments('reasons', authenticationService)
                })
                .then(reasons => {
                    screenData.reasons = Utils.arrayToObject(reasons.Documents, 'id');
                    resolve(screenData);
                });
        });
    }

    getData(token, UTCDate, uri) {const config = this.getConfig(token, UTCDate);
        return new Promise((resolve, reject) => {
            fetch(uri, config)
                .then((response, error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(response.json());
                    }
                });
        });
    }

    postData(token, UTCDate, uri, method, body, id) {
        return new Promise((resolve, reject) => {
            const config = this.getConfig(token, UTCDate);
            config.method = method;

            if (body) {
                config.body = JSON.stringify(body);
            }

            fetch(uri, config)
                .then((response, error) => {
                    if (error) {
                        reject(error);
                    } else {
                        response.json()
                            .then(json => resolve(json))
                            .catch(() => resolve(null));
                    }
                });
        });
    }

    getConfig = (token, UTCDate) => {
        return {
            headers: {
                authorization: token,
                'x-ms-version': '2016-07-11',
                'x-ms-date': UTCDate,
                accept: 'application/json'
            }
        }
    };
}
