import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Utils from "../../../services/Utils";
import './InputField.css';

export default class InputField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // id: props.id,
            // readOnly: props.readOnly,
            touched: false,
            value: props.value ? props.value : ''
        };

        this.validate = this.validate.bind(this);
    }

    static propTypes = {
        type: PropTypes.oneOf(['text', 'alphaOnly', 'number']).isRequired,
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,

        autoFocus: PropTypes.bool,
        className: PropTypes.string,
        maxLength: PropTypes.number,
        minLength: PropTypes.number,
        minValue: PropTypes.number,
        name: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        readOnly: PropTypes.bool,
        value: PropTypes.string,

        capitalise: PropTypes.bool,
        uppercase: PropTypes.bool,
        zeroPad: PropTypes.bool
    };

    static defaultProps = {
        minLength: 0,
        type: 'text'
    };

    validate = (event) => {
        if (!this.props.readOnly) {
            let fieldValue = this.props.maxLength ? event.target.value.substring(0, this.props.maxLength) : event.target.value;

            if (this.props.type === 'number') {
                fieldValue = fieldValue.replace(/[^0-9/]/g, '');

                if (event.type === 'blur' && this.props.zeroPad) {
                    fieldValue = Utils.padWithZeros(fieldValue, this.props.maxLength);
                }
            }

            if (this.props.alphaOnly) {
                fieldValue = fieldValue.replace(/[^a-zA-Z]/g, '');
            }

            if (this.props.alphaOnly || this.props.type === 'text') {
                if (this.props.uppercase) {
                    fieldValue = fieldValue.toUpperCase();
                }

                if (this.props.capitalise) {
                    fieldValue = fieldValue.replace(/[^a-zA-Z'\s]/, '');
                    const names = fieldValue.split(' ');

                    names.forEach((name, index) => {
                        names[index] = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
                    });
                    fieldValue = names.join(' ');
                }
            }

            let valid;
            if (!this.props.type === 'number' && !this.props.minLength) {
                console.log('MIN LENGTH');
                valid = true;
            // } else if (this.props.minLength && fieldValue.trim().length >= this.props.minLength) {
            //     console.log('FIELD VALUE LENGTH > MIN LENGTH');
            //     valid = true;
            } else if (this.props.type === 'number') {
                console.log('NUMBER');
                if (!this.props.minLength && !this.props.minValue) {
                    console.log('NOT NUMBER & NOT MIN VALUE');
                    valid = true;
                } else if (this.props.minValue && fieldValue > this.props.minValue) {
                    console.log('FIELD VALUE > MIN VALUE');
                    valid = true;
                } else {
                    valid = false;
                }
            } else {
                valid = false;
            }
            // const valid = (!this.props.minLength) ||
            //               (this.props.minLength && fieldValue.trim().length >= this.props.minLength) ||
            //               (this.props.type === 'number' && (!this.props.minLength && !this.props.minValue) ||
            //                                                (this.props.minValue && fieldValue > this.props.minValue))
            //               ? true : false;
            //
            this.setState({isValid: valid, touched: true, value: fieldValue}, () => {
                if (this.props.onChange) {
                    this.props.onChange(this.state);
                }
            });
        }
    };

    render() {
        const className = classnames({
            column: true,
            valid: this.state.isValid && this.state.touched,
            invalid: !this.state.isValid && this.state.touched
        });

        const input = this.props.readOnly ?
            <input
                className={this.props.className}
                id={this.props.id}
                name={this.props.name ? this.props.name : this.props.id}
                readOnly={this.props.readOnly}
                title={this.props.title}
                type="text"
                value={this.state.value}
            /> :
            <input
                autoFocus={this.props.autoFocus}
                className={this.props.className}
                id={this.props.id}
                maxLength={this.props.maxLength}
                minLength={this.props.minLength}
                name={this.props.name ? this.props.name : this.props.id}
                onBlur={this.validate}
                onChange={this.validate}
                placeholder={this.props.placeholder ? this.props.placeholder : this.props.title}
                readOnly={this.props.readOnly}
                title={this.props.title}
                type="text"
                value={this.state.value}
            />;

        return (
            <div className={className}>
                <label htmlFor={this.props.id}>{this.props.title}</label>
                {input}
            </div>
        )
    }
}
