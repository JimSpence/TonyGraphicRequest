import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import BaseField from 'src/components/FormElements/InputField/BaseField';
import './InputField.css';
import Utils from "../../../services/Utils";

export default class NumberField extends BaseField {
    constructor(props) {
        super(props);

        this.validate = this.validate.bind(this);
    }

    propTypes = super.propTypes;

    static propTypes = {
        minValue: PropTypes.number,
        zeroPad: PropTypes.bool
    };

    validate = (event) => {
        let fieldValue = fieldValue.replace(/[^0-9/]/g, '');

        if (event.type === 'blur' && this.props.zeroPad) {
            fieldValue = Utils.padWithZeros(fieldValue, this.props.maxLength);
        }

        super.validate(event);

        if (!this.props.readOnly) {

                          (this.props.type === 'number' && (!this.props.minLength && !this.props.minValue) ||
                                                           (this.props.minValue && fieldValue > this.props.minValue))

            //     let fieldValue = this.props.maxLength ? event.target.value.substring(0, this.props.maxLength) : event.target.value;
        //
        //     if (this.props.uppercase) {
        //         fieldValue = fieldValue.toUpperCase();
        //     }
        //
        //     if (this.props.capitalise) {
        //         fieldValue = fieldValue.replace(/[^a-zA-Z'\s]/g, '');
        //         const words = fieldValue.split(' ');
        //
        //         words.forEach((name, index) => {
        //             words[index] = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
        //         });
        //         fieldValue = words.join(' ');
        //     }
        //
        //     const valid = (!this.props.minLength || (this.props.minLength && fieldValue.length >= this.props.minLength));
        //
        //     this.setState({isValid: valid, touched: true, value: fieldValue}, () => {
        //         if (this.props.onChange) {
        //             this.props.onChange(this.state);
        //         }
        //     });
        }
    };

    render() {
        // const className = classnames({
        //     column: true,
        //     valid: this.state.isValid && this.state.touched,
        //     invalid: !this.state.isValid && this.state.touched
        // });

        // const input = this.props.readOnly ?
        //     <input
        //         className={this.props.className}
        //         id={this.props.id}
        //         name={this.props.name ? this.props.name : this.props.id}
        //         readOnly={this.props.readOnly}
        //         title={this.props.title}
        //         type="text"
        //         value={this.state.value}
        //     /> :
        //     <input
        //         autoFocus={this.props.autoFocus}
        //         className={this.props.className}
        //         id={this.props.id}
        //         maxLength={this.props.maxLength}
        //         minLength={this.props.minLength}
        //         name={this.props.name ? this.props.name : this.props.id}
        //         onBlur={this.validate}
        //         onChange={this.validate}
        //         placeholder={this.props.placeholder ? this.props.placeholder : this.props.title}
        //         readOnly={this.props.readOnly}
        //         title={this.props.title}
        //         type="text"
        //         value={this.state.value}
        //     />;

        return (
            <div className={className}>
                <label htmlFor={this.props.id}>{this.props.title}</label>
                <BaseField id={this.props.id} title={this.props.title} />
            </div>
        )
    }
}
