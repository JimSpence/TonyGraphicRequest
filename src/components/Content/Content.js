import React, {Component} from 'react';
import Summary from "../Summary/Summary";
import './Content.css';

export default class Content extends Component {
    render() {
        return (
            <section className="content">
                <Summary/>
            </section>
        );
    }
}
