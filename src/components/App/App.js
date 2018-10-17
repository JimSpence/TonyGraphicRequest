import React, {Component} from 'react';
import PageHeader from "../PageHeader/PageHeader";
import Content from "../Content/Content";
import './App.css';
import AzureDataPopulationUtil from '../../utils/AzureDataPopulationUtil';
import {CosmosClient} from "@azure/cosmos";
import CosmosDBService from "../../services/CosmosDBService";

export default class App extends Component {
    render() {
        const config = {
            host: process.env.HOST || "https://localhost:8081/",
            authKey: process.env.AUTH_KEY || "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==",
            databaseId: "GraphicRequest"
        };

        const client = new CosmosClient({
            endpoint: config.host,
            auth: {
                masterKey: config.authKey
            }
        });

        const cosmosDBService = new CosmosDBService(client);
        cosmosDBService.setDatabase(config.databaseId)
            .then(() => {
                cosmosDBService.addItems('seasons', AzureDataPopulationUtil.getSeasons());
            })
            .then(() => {
                cosmosDBService.addItems('reasons', AzureDataPopulationUtil.getReasons());
            });

        return (
            <div>
                <PageHeader headerText="Graphic Request"/>
                <Content/>
            </div>
        );
    }
}
