import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPencilAlt, faPlus, faSave, faTimes, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import './Button.css';

export default class Button extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        className: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    static defaultProps = {
        type: 'button'
    };

    render() {
        let icon;
        switch(this.props.type) {
            case 'add':
                icon = <span className="icon"><FontAwesomeIcon icon={faPlus} /></span>;
                break;
            case 'cancel':
                icon = <span className="icon"><FontAwesomeIcon icon={faTimes} /></span>;
                break;
            case 'confirm':
                icon = <span className="icon"><FontAwesomeIcon icon={faCheck} /></span>;
                break;
            case 'delete':
                icon = <span className="icon"><FontAwesomeIcon icon={faTrashAlt} /></span>;
                break;
            case 'edit':
                icon = <span className="icon"><FontAwesomeIcon icon={faPencilAlt} /></span>;
                break;
            case 'save':
                icon = <span className="icon"><FontAwesomeIcon icon={faSave} /></span>;
                break;
            default:
                icon = null;
        }

        return (
            <button type={this.props.type} className={this.props.className} onClick={this.props.onClick}>{icon}{this.props.text}</button>
        )
    }
}
