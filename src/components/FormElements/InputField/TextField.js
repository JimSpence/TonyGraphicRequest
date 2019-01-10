import React from 'react';
import PropTypes from 'prop-types';
import BaseField from './BaseField';

export default class TextField extends BaseField {
    state = this.props;

    static propTypes = {
        capitalise: PropTypes.bool,
        uppercase: PropTypes.bool
    };

    validate = (event) => {
        if (!this.props.readOnly) {
            let fieldValue = event.value;

            if (this.props.uppercase) {
                fieldValue = fieldValue.toUpperCase();
            }

            if (this.props.alphaOnly) {
                fieldValue = fieldValue.replace(/[^a-zA-Z]/g, '');
            }

            if (this.props.capitalise) {
                fieldValue = fieldValue.replace(/[^a-zA-Z'\s]/g, '');
                const words = fieldValue.split(' ');

                words.forEach((name, index) => {
                    words[index] = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
                });
                fieldValue = words.join(' ');
            }

            this.setState({value: fieldValue, isValid: event.isValid}, () => {
                if (this.props.onChange) {
                    this.props.onChange(this.state);
                }
            });
        }
    };

    render() {
        return (
            <BaseField {...this.state} onChange={this.validate} />
        )
    }
}
