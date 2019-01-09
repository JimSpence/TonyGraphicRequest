import firebase from 'firebase/app';
import 'firebase/database';

const config = {
    databaseURL: 'https://tyreOrder-requests.firebaseio.com'
};

firebase.initializeApp(config);

export default class DataPopulationService {

    static writeBrannds() {
        const brands = [
            {
                id: 'AD',
                name: 'Audi'
            }, {
                id: 'BM',
                name: 'BMW'
            }, {
                id: 'DC',
                name: 'Dacia'
            }, {
                id: 'CT',
                name: 'Citroen'
            }, {
                id: 'FD',
                name: 'Ford'
            }, {
                id: 'MB',
                name: 'Mercedes Benz'
            }, {
                id: 'MT',
                name: 'Mitsubishi'
            }, {
                id: 'MZ',
                name: 'Mazda'
            }, {
                id: 'NI',
                name: 'Nissan'
            }, {
                id: 'RN',
                name: 'Renault'
            }, {
                id: 'TY',
                name: 'Toyota'
            }, {
                id: 'VW',
                name: 'Volkswagen'
            }
        ];

        const brandsRef = firebase.database().ref('brands/');
        brands.forEach((brand, index) => {
            brandsRef.child(brands[index].id).set({
                name: brand.name
            });
        });
    }

    static writeReasons() {
        const reasons = [
            'Wear and tear',
            'Quantity short',
            'Damaged on receipt',
            'Not received',
            'Fitting damage',
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
            });
        });
    }

    static writeStores() {
        const stores = [{
            dealerNumber: 'BM0001',
            number: '0001',
            brandCode: 'BM',
            brandName: 'BMW',
            name: 'Leeds Geldard Road',
            email: 'bm0001@tyresdirect2u.co.uk',
            phone: '0113 2265651'
        }, {
            dealerNumber: 'BM0002',
            number: '0002',
            brandCode: 'BM',
            brandName: 'BMW',
            name: 'Bristol Fishponds',
            email: 'bm0002@tyresdirect2u.co.uk',
            phone: '0117 7765421'
        }, {
            dealerNumber: 'BM0003',
            number: '0003',
            brandCode: 'BM',
            brandName: 'BMW',
            name: 'York Clifton Moor',
            email: 'bm0003@tyresdirect2u.co.uk',
            phone: '01904 456776'
        }, {
            dealerNumber: 'BM0004',
            number: '0004',
            brandCode: 'BM',
            brandName: 'BMW',
            name: 'Manchester Old Trafford',
            email: 'bm0004@tyresdirect2u.co.uk',
            phone: '0161 9876423'
        }, {
            dealerNumber: 'TY0001',
            number: '0001',
            brandCode: 'TY',
            brandName: 'Toyota',
            name: 'Oxford Peartree',
            email: 'ty0001@soparesdirect2u.co.uk',
            phone: '01865 654312'
        }, {
            dealerNumber: 'TY0002',
            number: '0002',
            brandCode: 'TY',
            brandName: 'Toyota',
            name: 'Birmingham Spaghetti Junction',
            email: 'ty0002@tyresdirect2u.co.uk',
            phone: '0121 9872345'
        }, {
            dealerNumber: 'TY0003',
            number: '0003',
            brandCode: 'TY',
            brandName: 'Toyota',
            name: 'Leeds Ringways',
            email: 'ty0003@tyresdirect2u.co.uk',
            phone: '0113 6677887'
        }, {
            dealerNumber: 'TY0004',
            number: '0004',
            brandCode: 'TY',
            brandName: 'Toyota',
            name: 'Edinburgh Castle',
            email: 'ty0004@tyresdirect2u.co.uk',
            phone: '0131 2275656'
        }];

        const dealersRef = firebase.database().ref('dealers/');
        dealers.forEach((dealer) => {
            dealersRef.child(dealer.dealerNumber).set({
                dealerNumber: dealer.dealerNumber,
                number: dealer.number,
                brandCode: dealer.brandCode,
                brandName: dealer.brandName,
                name: dealer.name,
                email: dealer.email,
                phone: dealer.phone
            }).then(data => {
                return(data);
            });
        });
    }
}