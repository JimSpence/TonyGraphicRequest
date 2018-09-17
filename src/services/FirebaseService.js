import firebase from 'firebase/app';
import 'firebase/database';

const config = {
    databaseURL: 'https://graphic-requests.firebaseio.com'
};

firebase.initializeApp(config);

export default class FirebaseService {
    static getGraphicRequests(graphicRequestId) {
        // console.log(FirebaseService.writeStores());
        const uri = graphicRequestId ? 'graphicRequests/' + graphicRequestId : 'graphicRequests';
        const graphicRequestsDB = firebase.database().ref(uri);

        return new Promise((resolve, reject) => {
            return graphicRequestsDB.on('value', (data) => {
                resolve(data.val());
            })
        });
    }

    static getData(entity) {
        const graphicRequestsDB = firebase.database().ref(entity);
        return new Promise((resolve) => {
            return graphicRequestsDB.on('value', (data) => {
                resolve(data.val());
            })
        });
    }

    static updateGraphicRequest(graphicRequestId, graphicRequest) {
        const graphicRequestsDB = firebase.database().ref('graphicRequests/');
        graphicRequestsDB.child(graphicRequestId).update(graphicRequest)
            .then(data => {
                console.log(data);
            });
    }

    static writeGraphicRequest(graphicRequest) {
        const graphicRequestsDB = firebase.database().ref('graphicRequests/');
        graphicRequestsDB.push(graphicRequest)
            .then(data => {
                console.log(data);
            });
    }

    static deleteGraphicRequest(graphicRequestId) {
        const graphicRequestsDB = firebase.database().ref('graphicRequests/');
        return graphicRequestsDB.child(graphicRequestId).remove();
    }

    static writeBrands() {
        const brands = [
            {
                brand: 'BR',
                name: 'Burton Menswear'
            }, {
                brand: 'DP',
                name: 'Dorothy Perkins'
            }, {
                brand: 'EV',
                name: 'Evans'
            }, {
                brand: 'MS',
                name: 'Miss Selfridge'
            }, {
                brand: 'OU',
                name: 'Outfit'
            }, {
                brand: 'TM',
                name: 'Topman'
            }, {
                brand: 'TS',
                name: 'Topshop'
            }, {
                brand: 'WL',
                name: 'Wallis'
            }
        ];

        const brandsRef = firebase.database().ref('brands/');
        brands.forEach((brand, index) => {
             brandsRef.child(brands[index].brand).set({
                 name: brand.name
             }).then(data => {
                 console.log(data);
             });
        });
    }

    static writeReasons() {
        const reasons = [
            'Shortage',
            'Damaged on receipt',
            'Not received',
            'Damaged in store',
            'Flood',
            'Fire',
            'Other'
        ];

        const reasonsRef = firebase.database().ref('reasons/');
        reasons.forEach((reason, index) => {
             reasonsRef.child(reasons[index]).set({
                 reason: reasons[index]
             }).then(data => {
                 console.log(data);
             });
        });
    }

    static writeSeasons() {
        const seasons = [
            {
                code: 'SS',
                description: 'Spring/Summer'
            }, {
                code: 'AW',
                description: 'Autumn/Winter'
            }
        ];

        const seasonsRef = firebase.database().ref('seasons/');
        seasons.forEach((season, index) => {
             seasonsRef.child(seasons[index].code).set({
                 description: season.description
             }).then(data => {
                 return(data);
             });
        });
    }

    static writeStores() {
        const stores = [{
            storeNumber: 'BR0001',
            number: '0001',
            brandCode: 'BR',
            brandName: 'Burton Menswear',
            name: 'Leeds White Rose',
            email: 'br0001@arcadiagroup.co.uk',
            phone: '0113 2265651'
        }, {
            storeNumber: 'BR0002',
            number: '0002',
            brandCode: 'BR',
            brandName: 'Burton Menswear',
            name: 'Bristol Cabot Centre',
            email: 'br0002@arcadiagroup.co.uk',
            phone: '0117 7765421'
        }, {
            storeNumber: 'BR0003',
            number: '0003',
            brandCode: 'BR',
            brandName: 'Burton Menswear',
            name: 'York Coney Street',
            email: 'br0003@arcadiagroup.co.uk',
            phone: '01904 456776'
        }, {
            storeNumber: 'BR0004',
            number: '0004',
            brandCode: 'BR',
            brandName: 'Burton Menswear',
            name: 'Manchester Trafford Centre',
            email: 'br0004@arcadiagroup.co.uk',
            phone: '0161 9876423'
        }, {
            storeNumber: 'TS0001',
            number: '0001',
            brandCode: 'TS',
            brandName: 'Topshop',
            name: 'Oxford Circus',
            email: 'ts0001@arcadiagroup.co.uk',
            phone: '020 6543312'
        }, {
            storeNumber: 'TS0002',
            number: '0002',
            brandCode: 'TS',
            brandName: 'Topshop',
            name: 'Birmingham Bullring',
            email: 'ts0002@arcadiagroup.co.uk',
            phone: '0121 9872345'
        }, {
            storeNumber: 'TS0003',
            number: '0003',
            brandCode: 'TS',
            brandName: 'Topshop',
            name: 'Leeds Trinity',
            email: 'ts0003@arcadiagroup.co.uk',
            phone: '0113 6677887'
        }, {
            storeNumber: 'TS0004',
            number: '0004',
            brandCode: 'TS',
            brandName: 'Topshop',
            name: 'Edinburgh Princes Street',
            email: 'ts00014@arcadiagroup.co.uk',
            phone: '0131 2275656'
        }];

        const storesRef = firebase.database().ref('stores/');
        stores.forEach((store) => {
             storesRef.child(store.storeNumber).set({
                 storeNumber: store.storeNumber,
                 number: store.number,
                 brandCode: store.brandCode,
                 brandName: store.brandName,
                 name: store.name,
                 email: store.email,
                 phone: store.phone
             }).then(data => {
                 return(data);
             });
        });
    }
};
