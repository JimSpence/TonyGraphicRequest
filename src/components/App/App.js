import React, {Component} from 'react';
import PageHeader from "../PageHeader/PageHeader";
import Content from "../Content/Content";
import AuthenticationService from "../../services/AuthenticationService";
// import AzurePopulationUtil from '../../services/AzureDataPopulationUtil';
import './App.css';

export default class App extends Component {
    render() {
        const authenticationService = new AuthenticationService();
        // AzurePopulationUtil.populateData(authenticationService);
        authenticationService.getToken();

        return (
            <div>
                <PageHeader headerText="Graphic Request Application" />
                <Content/>
            </div>
        );
    }
}
