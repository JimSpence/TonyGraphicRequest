import React, {Component} from 'react';
import PageHeader from "../PageHeader/PageHeader";
import Content from "../Content/Content";
import CosmosDBService from '../../services/CosmosDBService';
import './App.css';

export default class App extends Component {

    render() {
        const cosmosDBService = new CosmosDBService();

        const uri1 = 'https://graphic-requests.documents.azure.com/dbs/graphicrequest/colls/graphicrequestcollection/docs';
        cosmosDBService.getDBObject(uri1)
            .then((response) => {
                console.log(response);
            });

        const uri2 = 'https://graphic-requests.documents.azure.com/dbs/graphicrequest/colls/brands';
        cosmosDBService.getDBObject(uri2)
            .then((response) => {
                if (response.code === 'NotFound') {
                    const uri3 = 'https://graphic-requests.documents.azure.com/dbs/graphicrequest/colls';
                    const collection = 'brands';
                    cosmosDBService.createDBObject(uri3, collection);
                }
                console.log(response);
            });

        return (
            <div>
                <PageHeader headerText="Graphic Request - Tony 1"/>
                <Content/>
            </div>
        );
    }
}
