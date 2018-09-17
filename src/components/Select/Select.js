import React, {Component} from 'react';
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

    static defaultProps = {
        readonly: false,
    };

    validate = (event) => {
        const fieldValue = event.target.value;

        this.setState({isValid: fieldValue.length > 0, touched: true, value: fieldValue}, () => {
            this.props.onChange(this.state);
        });
    };


    render() {
        const className = classnames({
            column: true,
            valid: this.state.isValid && this.state.touched,
            invalid: !this.state.isValid && this.state.touched
        });

        const options = Object.keys(this.props.data).map((data, index) => {
            const optionText = this.props.descriptor ? data + ' - ' + this.props.data[data][this.props.descriptor] : data;
            return <option key={index} value={data}>{optionText}</option>
        });

        return (
            <div className={className}>
                <label htmlFor={this.props.id}>{this.props.labelText}</label>
                <select
                    disabled={this.props.readOnly}
                    id={this.props.id}
                    onBlur={this.validate}
                    onChange={this.validate}
                    value={this.state.value}
                >
                    <option hidden className='placeholder' value="">{this.props.placeholder}</option>
                    {options}
                )
                </select>
            </div>
        )
    }
}
