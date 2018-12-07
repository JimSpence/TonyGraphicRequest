export default class AzureConfig {
    constructor() {
        this.azureConfig = AzureConfig.getAzureConfig();
    }

    static getAzureConfig = () => {
        return {
            dbHost: 'https://graphic-requests.documents.azure.com',
            database: '/graphicrequest',
            dbs: '/dbs',
            colls: '/colls',
            docs: '/docs',
            cacheLocation: 'localStorage'
        };
    };

    getDbHostUri = () => {
        return this.azureConfig.dbHost;
    };

    getDatabaseUri = () => {
        return this.azureConfig.dbHost +
               this.azureConfig.dbs +
               this.azureConfig.database;
    };

    getCollectionsUri = () => {
        return this.getDatabaseUri() + this.azureConfig.colls;
    };

    getCollectionUri = (collection) => {
        return this.getCollectionsUri() + '/' + collection;
    };

    getDocumentsUri = (collection) => {
        return this.getCollectionUri(collection) + this.azureConfig.docs;
    };

    getDocumentUri = (collection, documentId) => {
        return this.getDocumentsUri(collection) + '/' + documentId;
    };
}
