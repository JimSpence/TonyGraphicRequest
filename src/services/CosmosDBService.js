import AuthenticationService from "./AuthenticationService";

export default class CosmosDBService {

    getDBObject = (uri) => {
        const authenticationService = new AuthenticationService();
        console.log(authenticationService.getToken());
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

    createDBObject = (uri, collection) => {
        const authenticationService = new AuthenticationService();
        const {token, UTCDate} = authenticationService.getCosmosDBToken(uri, 'POST');
        console.log(token);
        return new Promise((resolve, reject) => {
            this.postData(token, UTCDate, uri, collection)
                .then((response) => {
                    console.log('CREATE RESPONSE');
                    console.log(response);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)
                });
        });
    };

    getData(token, UTCDate, uri) {
        return new Promise((resolve, reject) => {
            const config = this.getConfig(token, UTCDate);

            fetch(uri, config)
                .then((response, error) => {
                    console.log(config);
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        resolve(response.json());
                    }
                })
        });
    }

    postData(token, UTCDate, uri, collection) {
        return new Promise((resolve, reject) => {
            const config = this.getConfig(token, UTCDate);

            config.method = 'POST';
            config.body = {
                id: 'graphicrequestcollection'
            };
            // config.body = 'brands';
            fetch(uri, config)
                .then((response, error) => {
                    console.log(config);
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        resolve(response.json());
                    }
                })
        });
    }

    getConfig = (token, UTCDate) => {
        return {
            headers: {
                authorization: token,
                'x-ms-version': '2016-07-11',
                'x-ms-date': UTCDate,
                accept: 'application/json'
                // 'Content-Type': 'application/json'
            }
        }
    };
}
