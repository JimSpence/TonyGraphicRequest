export default class CosmosDBService {
    constructor(client) {
        this.client = client;
    }

    setDatabase = async (databaseId) => {
        await this.client.databases.createIfNotExists({
            id: databaseId
        }).then((database) => {
            this.database = database.database;
        })
    };

    setContainer = async (container) => {
        await this.database.containers.createIfNotExists({
            id: container
        }).then((container) => {
            this.container = container.container;
        });
    };

    addItems = async (container, items) => {
        await this.setContainer(container)
            .then(() => {
                items.forEach((item) => {
                    this.addItem(item);
                });
            });
    };

    addItem = (item) => {
        return this.container.items.create(item);
    };


    // ToDo: Everything above this line is working i.e. up to "Add Items"

    // ToDo: Refactor and implement the methods below
    find = (querySpec, callback) => {
        this.client.queryDocuments(this.collection._self, querySpec).toArray((error, results) => {
            if (error) {
                callback(error);
            } else {
                callback(null, results);
            }
        });
    };

    updateItem = (itemId, callback) => {
        const self = this;

        self.getItem(itemId, (error, document) => {
            if (error) {
                callback(error);
            } else {
                document.completed = true;

                self.client.replaceDocument(document._self, document, (error, replaced) => {
                    if (error) {
                        callback(error);
                    } else {
                        callback(null, replaced);
                    }
                });
            }
        });
    };

    getItem = (itemId, callback) => {
        const self = this;

        const querySpec = {
            query: 'SELECT * FROM root r WHERE r.id = @id',
            parameters: [{
                name: '@id',
                value: itemId
            }]
        };

        self.client.queryDocuments(self.collection._self, querySpec).toArray((error, results) => {
            if (error) {
                callback(error);
            } else {
                callback(null, results[0]);
            }
        });
    }
};
