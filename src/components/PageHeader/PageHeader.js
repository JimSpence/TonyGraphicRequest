import React, {Component} from 'react';
import PropTypes from 'prop-types';
import arcadiaLogo from '../../images/arcadia-logo.png';
import reactLogo from '../../images/react-logo.svg';
import './PageHeader.css';

export default class PageHeader extends Component {
    static propTypes = {
        headerText: PropTypes.string.isRequired
    };

    render() {
        return (
            <header>
                <img src={arcadiaLogo} className="arcadia-logo" alt="arcadia-logo.png" title="Arcadia logo" />
                <h1>{this.props.headerText}</h1>
                <img src={reactLogo} className="react-logo" alt="react-logo.svg" title="React logo" />
            </header>
        );
    }
}