import React, {Component} from 'react';
import classnames from 'classnames';
import Utils from "../../services/Utils";
import './InputField.css';

export default class InputField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            readOnly: props.readOnly,
            touched: false,
            value: props.value ? props.value : ''
        };

        console.log(this.state);
        this.validate = this.validate.bind(this);
    }

    static defaultProps = {
        minLength: 0,
        // readOnly: false,
        type: 'text'
    };

    validate = (event) => {
        if (!this.state.readOnly) {
            let fieldValue = event.target.value;

            if (this.props.uppercase) {
                fieldValue =  fieldValue.toUpperCase();
            }

            if (this.props.numeric) {
                fieldValue = fieldValue.replace(/[^0-9/]/, '');
            }

            if (this.props.lettersOnly) {
                fieldValue = fieldValue.replace(/[^a-zA-Z]/, '');
            }

            if (this.props.nameField) {
                fieldValue = fieldValue.replace(/[^a-zA-Z'-\s]/, '');
                const names = fieldValue.split(' ');

                names.forEach((name, index) => {
                    names[index] = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
                });
                fieldValue = names.join(' ');
            }

            if (event.type === 'blur' && this.props.zeroPad) {
                fieldValue = Utils.padWithZeros(fieldValue, this.props.maxLength);
            }

            this.setState({isValid: fieldValue.trim().length >= this.props.minLength, touched: true, value: fieldValue}, () => {
                this.props.onChange(this.state);
            });
        }
    };

    render() {
        const className = classnames({
            column: true,
            valid: this.state.isValid && this.state.touched,
            invalid: !this.state.isValid && this.state.touched
        });

        return (
            <div className={className}>
                <label htmlFor={this.props.id}>{this.props.labelText}</label>
                <input
                    autoFocus={this.props.focus}
                    id={this.props.id}
                    maxLength={this.props.maxLength}
                    minLength={this.props.minLength}
                    onBlur={this.validate}
                    onChange={this.validate}
                    placeholder={this.props.placeholder}
                    readOnly={this.state.readOnly}
                    type={this.props.type}
                    value={this.state.value}
                />
            </div>
        )
    }
}
