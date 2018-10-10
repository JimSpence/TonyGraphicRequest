import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Select.css';

export default class Select extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            touched: false,
            value: props.value? props.value : ''
        };
        this.validate = this.validate.bind(this);
    }

    static propTypes = {
        data: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        autoFocus: PropTypes.bool,
        className: PropTypes.string,
        descriptor: PropTypes.string,
        labelText: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        readOnly: PropTypes.bool,
        value: PropTypes.string,
    };

    static defaultProps = {
        // readOnly: false,
    };

    validate = (event) => {
        const fieldValue = event.target.value;

        this.setState({isValid: fieldValue.length > 0, touched: true, value: fieldValue}, () => {
            this.props.onChange(this.state);
        });
    };

    render() {
        const className = classnames({
            // column: true,
            valid: this.state.isValid && this.state.touched,
            invalid: !this.state.isValid && this.state.touched
        });

        const placeholder =
            <option hidden className='placeholder' value="">{this.props.placeholder ? this.props.placeholder : this.props.title}</option>;

        const options =
            Object.keys(this.props.data).map((data, index) => {
                const optionText = this.props.descriptor ? data + ' - ' + this.props.data[data][this.props.descriptor] : data;
                return <option key={index} value={data}>{optionText}</option>
            });

        const select = this.props.readOnly ?
            <select
                className={this.props.className}
                disabled={this.props.readOnly}
                id={this.props.id}
                name={this.props.name ? this.props.name : this.props.id}
                title={this.props.title}
                value={this.state.value}
            >
                {options}
            </select>:
            <select
                autoFocus={this.props.autoFocus}
                className={this.props.className}
                disabled={this.props.readOnly}
                id={this.props.id}
                name={this.props.name ? this.props.name : this.props.id}
                onBlur={this.props.readOnly ? null : this.validate}
                onChange={this.props.readOnly ? null : this.validate}
                title={this.props.title}
                value={this.state.value}
            >
                {placeholder}
                {options}
            </select>;

        return (
            <div className={className}>
                <label htmlFor={this.props.id}>{this.props.labelText ? this.props.labelText : this.props.title}</label>
                {select}
            </div>
        )
    }
}
