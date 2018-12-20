import firebase from 'firebase/app';
import 'firebase/database';
// import 'firebase/auth';

const config = {
    databaseURL: 'https://graphic-requests.firebaseio.com'
};

firebase.initializeApp(config);

const graphicRequestsUri = 'graphicRequests/';

export default class FirebaseService {
    static getGraphicRequests(graphicRequestId) {
        // firebase.auth().signInWithEmailAndPassword('tony.ruddock@arcadiagroup.co.uk', 'Arcadia01')
        // firebase.auth().createUserWithEmailAndPassword('tony.ruddock@arcadiagroup.co.uk', 'Arcadia01')
        //     .then((response) => {
        //         console.log(response);
        //         })
        //     .catch(error => {
        //         console.log(error);
        //     });
        return new Promise((resolve) => {
            const uri = graphicRequestId ? graphicRequestsUri + graphicRequestId : graphicRequestsUri;
            const graphicRequestsDB = firebase.database().ref(uri);

            return graphicRequestsDB.on('value', (data) => {
                resolve(data.val());
            });
        });
    }

    static getDropdownData() {
        return new Promise(resolve => {
            const screenData = {};
            this.getData('stores/')
                .then(stores => {
                    screenData.stores = stores;
                    this.getData('seasons/')
                        .then(seasons => {
                        screenData.seasons = seasons;
                    this.getData('reasons/')
                        .then(reasons => {
                        screenData.reasons = reasons;
                        resolve(screenData);
                    });
                });
            });
        });
    }

    static getData(entity) {
        return new Promise((resolve) => {
            const graphicRequestsDB = firebase.database().ref(entity);

            return graphicRequestsDB.on('value', (data) => {
                resolve(data.val());
            })
        });
    }

    static updateGraphicRequest(graphicRequestId, graphicRequest) {
        const graphicRequestsDB = firebase.database().ref(graphicRequestsUri);
        return graphicRequestsDB.child(graphicRequestId).update(graphicRequest);
    }

    static writeGraphicRequest(graphicRequest) {
        const graphicRequestsDB = firebase.database().ref(graphicRequestsUri);
        return graphicRequestsDB.push(graphicRequest);
    }

    static
    deleteGraphicRequest(graphicRequestId) {
        const graphicRequestsDB = firebase.database().ref(graphicRequestsUri);
        return graphicRequestsDB.child(graphicRequestId).remove();
    }
};
