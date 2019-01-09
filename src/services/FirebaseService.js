import firebase from 'firebase/app';
import 'firebase/database';
// import 'firebase/auth';

const config = {
    databaseURL: 'https://tyres-direct-2-u.firebaseio.com'
};

firebase.initializeApp(config);

const dealerOrdersUri = 'dealerOrders/';

export default class FirebaseService {
    static getDealerOrders(dealerOrderId) {
        // firebase.auth().signInWithEmailAndPassword('tony.ruddock@arcadiagroup.co.uk', 'Arcadia01')
        // firebase.auth().createUserWithEmailAndPassword('tony.ruddock@arcadiagroup.co.uk', 'Arcadia01')
        //     .then((response) => {
        //         console.log(response);
        //         })
        //     .catch(error => {
        //         console.log(error);
        //     });
        return new Promise((resolve) => {
            const uri = dealerOrderId ? dealerOrdersUri + dealerOrderId : dealerOrdersUri;
            const dealerOrdersDB = firebase.database().ref(uri);

            return dealerOrdersDB.on('value', (data) => {
                resolve(data.val());
            });
        });
    }

    static getDropdownData() {
        return new Promise(resolve => {
            const screenData = {};
            this.getData('dealers/')
                .then(dealers => {
                    screenData.dealers = dealers;
                    this.getData('brands/')
                        .then(brands => {
                            screenData.vehicleMakes = brands;
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
        });
    }

    static getData(entity) {
        return new Promise((resolve) => {
            const dealerOrdersDB = firebase.database().ref(entity);

            return dealerOrdersDB.on('value', (data) => {
                resolve(data.val());
            })
        });
    }

    static updateDealerOrder(dealerOrderId, dealerOrder) {
        const dealerOrdersDB = firebase.database().ref(dealerOrdersUri);
        return dealerOrdersDB.child(dealerOrderId).update(dealerOrder);
    }

    static writeDealerOrder(dealerOrder) {
        const dealerOrdersDB = firebase.database().ref(dealerOrdersUri);
        return dealerOrdersDB.push(dealerOrder);
    }

    static deleteDealerOrder(dealerOrderId) {
        const dealerOrdersDB = firebase.database().ref(dealerOrdersUri);
        return dealerOrdersDB.child(dealerOrderId).remove();
    }
};
