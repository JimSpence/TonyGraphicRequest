import React, {Component} from 'react';
import arcadiaLogo from '../../images/arcadia-logo.png';
import reactLogo from '../../images/react-logo.svg';
import './PageHeader.css';

export default class PageHeader extends Component {
    render() {
        return (
            <header>
                <img src={arcadiaLogo} className="arcadia-logo" alt="arcadia-logo.png" title="Arcadia logo" />
                <h1>Graphic Request</h1>
                <img src={reactLogo} className="react-logo" alt="react-logo.svg" title="React logo" />
            </header>
        );
    }
}