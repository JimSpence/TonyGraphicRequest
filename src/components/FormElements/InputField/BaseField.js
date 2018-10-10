import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './InputField.css';

export default class BaseField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            touched: false,
            value: props.value ? props.value : ''
        };

        this.validate = this.validate.bind(this);
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        autoFocus: PropTypes.bool,
        className: PropTypes.string,
        labelText: PropTypes.string,
        maxLength: PropTypes.number,
        minLength: PropTypes.number,
        name: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        readOnly: PropTypes.bool,
        value: PropTypes.string,
    };

    static defaultProps = {
        value: ''
    };

    validate = (event) => {
        if (!this.props.readOnly) {
            const fieldValue = this.props.maxLength ? event.target.value.substring(0, this.props.maxLength) : event.target.value;
            const valid = (!this.props.minLength || (this.props.minLength && fieldValue.length >= this.props.minLength));

            this.setState({isValid: valid, touched: true, value: fieldValue, type: event.type}, () => {
                if (this.props.onChange) {
                    this.props.onChange(this.state);
                }
            });
        }
    };

    render() {
        const isValid = typeof this.props.isValid !== 'undefined' ? this.props.isValid : this.state.isValid;
        const className = classnames({
            column: true,
            valid: isValid && this.state.touched,
            invalid: !isValid && this.state.touched
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
                value={this.props.value}
            />;

        return (
            <div className={className}>
                <label htmlFor={this.props.id}>{this.props.labelText ? this.props.labelText : this.props.title}</label>
                {input}
            </div>
        )
    }
}
