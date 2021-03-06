import CosmosDBService from "./CosmosDBService";

export default class AzureDataPopulationUtil {

    static populateData(authenticationService) {
        const cosmosDBService = new CosmosDBService();

        // cosmosDBService.createCollectionIfNotExists('brands', authenticationService)
        //     .then(() => {
        //         this.createDocuments('brands', authenticationService, AzureDataPopulationUtil.getBrands(), cosmosDBService);
        //     });
        //
        // cosmosDBService.createCollectionIfNotExists('reasons', authenticationService)
        //     .then(() => {
        //         this.createDocuments('reasons', authenticationService, AzureDataPopulationUtil.getReasons(), cosmosDBService);
        //     });
        //
        // cosmosDBService.createCollectionIfNotExists('seasons', authenticationService)
        //     .then(() => {
        //         this.createDocuments('seasons', authenticationService, AzureDataPopulationUtil.getSeasons(), cosmosDBService);
        //     });
        //
        // cosmosDBService.createCollectionIfNotExists('stores', authenticationService)
        //     .then(() => {
        //         this.createDocuments('stores', authenticationService, AzureDataPopulationUtil.getStores(), cosmosDBService);
        //     });
        cosmosDBService.createCollectionIfNotExists('dealerorders', authenticationService)
            .then(() => {
                console.log('RIGHT ALL DONE');
            })
    };

    static createDocuments = (collection, authenticationService, records, cosmosDBService) => {
        records.forEach((record) => {
            cosmosDBService.createDocument(collection, authenticationService, record);
                // .then((response) => {
                //     resolve(response);
                // })
                // .catch((error) => {
                //     reject(error)
                // });
        });
    };

    static getBrands() {
        return [{
                id: 'BR',
                name: 'Burton Menswear'
            }, {
                id: 'DP',
                name: 'Dorothy Perkins'
            }, {
                id: 'EV',
                name: 'Evans'
            }, {
                id: 'MS',
                name: 'Miss Selfridge'
            }, {
                id: 'OU',
                name: 'Outfit'
            }, {
                id: 'TM',
                name: 'Topman'
            }, {
                id: 'TS',
                name: 'Topshop'
            }, {
                id: 'WL',
                name: 'Wallis'
            }];
    }

    static getReasons() {
        return [{
                id: 'Shortage'
            }, {
                id: 'Damaged on receipt'
            }, {
                id: 'Not received'
            }, {
                id: 'Damaged in dealer'
            }, {
                id: 'Flood'
            }, {
                id: 'Fire'
            }, {
                id: 'Other'
            }];
    }

    static getSeasons() {
        return [{
                id: 'SS',
                description: 'Spring/Summer'
            }, {
                id: 'AW',
                description: 'Autumn/Winter'
            }];
   }

    static getStores() {
        return [{
            id: 'BR0001',
            storeNumber: 'BR0001',
            number: '0001',
            brandCode: 'BR',
            brandName: 'Burton Menswear',
            name: 'Leeds White Rose',
            email: 'br0001@arcadiagroup.co.uk',
            phone: '0113 2265651'
        }, {
            id: 'BR0002',
            storeNumber: 'BR0002',
            number: '0002',
            brandCode: 'BR',
            brandName: 'Burton Menswear',
            name: 'Bristol Cabot Centre',
            email: 'br0002@arcadiagroup.co.uk',
            phone: '0117 7765421'
        }, {
            id: 'BR0003',
            storeNumber: 'BR0003',
            number: '0003',
            brandCode: 'BR',
            brandName: 'Burton Menswear',
            name: 'York Coney Street',
            email: 'br0003@arcadiagroup.co.uk',
            phone: '01904 456776'
        }, {
            id: 'BR0004',
            storeNumber: 'BR0004',
            number: '0004',
            brandCode: 'BR',
            brandName: 'Burton Menswear',
            name: 'Manchester Trafford Centre',
            email: 'br0004@arcadiagroup.co.uk',
            phone: '0161 9876423'
        }, {
            id: 'TS0001',
            storeNumber: 'TS0001',
            number: '0001',
            brandCode: 'TS',
            brandName: 'Topshop',
            name: 'Oxford Circus',
            email: 'ts0001@arcadiagroup.co.uk',
            phone: '020 6543312'
        }, {
            id: 'TS0002',
            storeNumber: 'TS0002',
            number: '0002',
            brandCode: 'TS',
            brandName: 'Topshop',
            name: 'Birmingham Bullring',
            email: 'ts0002@arcadiagroup.co.uk',
            phone: '0121 9872345'
        }, {
            id: 'TS0003',
            storeNumber: 'TS0003',
            number: '0003',
            brandCode: 'TS',
            brandName: 'Topshop',
            name: 'Leeds Trinity',
            email: 'ts0003@arcadiagroup.co.uk',
            phone: '0113 6677887'
        }, {
            id: 'TS0004',
            storeNumber: 'TS0004',
            number: '0004',
            brandCode: 'TS',
            brandName: 'Topshop',
            name: 'Edinburgh Princes Street',
            email: 'ts00014@arcadiagroup.co.uk',
            phone: '0131 2275656'
        }];
    }
}
