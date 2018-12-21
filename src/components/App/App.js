import React, {Component} from 'react';
import PageHeader from "../PageHeader/PageHeader";
import Content from "../Content/Content";
import './App.css';

export default class App extends Component {
    render() {
        return (
            <div>
                <PageHeader headerText="Dealer Orders" />
                <Content/>
            </div>
        );
    }
}
