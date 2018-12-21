import React from 'react';
import PropTypes from 'prop-types';
import BaseField from './BaseField';
import Utils from '../../../helpers/Utils'

export default class NumberField extends BaseField {
    constructor(props) {
        super(props);

        this.state = props;
        this.validate = this.validate.bind(this);
    }

    static propTypes = {
        minValue: PropTypes.number,
        zeroPad: PropTypes.bool
    };

    validate = (event) => {
        if (!this.props.readOnly) {
            let fieldValue = event.value.replace(/[^0-9/]/g, '');

            if (event.type === 'blur' && this.props.zeroPad) {
                fieldValue = Utils.padWithZeros(fieldValue, this.props.maxLength);
            }

            const valid = fieldValue.length > 0 && (!this.props.minValue || (this.props.minValue && fieldValue >= this.props.minValue));

            this.setState({value: fieldValue, isValid: valid}, () => {
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
