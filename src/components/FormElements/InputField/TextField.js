import React from 'react';
import PropTypes from 'prop-types';
import BaseField from './BaseField';
import './InputField.css';

export default class TextField extends BaseField {
    constructor(props) {
        super(props);

        this.validate = this.validate.bind(this);
    }

    propTypes = super.propTypes;

    static propTypes = {
        capitalise: PropTypes.bool,
        uppercase: PropTypes.bool,
    };

    validate = (event) => {
        super.validate(event);
        if (!this.props.readOnly) {
            let fieldValue = this.props.maxLength ? event.target.value.substring(0, this.props.maxLength) : event.target.value;

            if (this.props.uppercase) {
                fieldValue = fieldValue.toUpperCase();
            }

            if (this.props.capitalise) {
                fieldValue = fieldValue.replace(/[^a-zA-Z'\s]/g, '');
                const words = fieldValue.split(' ');

                words.forEach((name, index) => {
                    words[index] = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
                });
                fieldValue = words.join(' ');
            }

            this.setState({value: fieldValue}, () => {
                if (this.props.onChange) {
                    this.props.onChange(this.state);
                }
            });
        }
    };

    render() {
        return (
            <BaseField id={this.props.id} title={this.props.title} />
        )
    }
}
