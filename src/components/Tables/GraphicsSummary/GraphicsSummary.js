import React, {Component} from 'react';
import './GraphicsSummary.css';

export default class GraphicsSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            graphics: props.graphics
        };
    }

    render() {
        const {graphics} = this.state;

        const rows = Object.keys(graphics).map((graphic, index) => {
            return (
                <tr key={index} id={graphic} onClick={this.props.onEdit}>
                    <td>{graphic}</td>
                    <td>{graphics[graphic].reason}</td>
                    <td className="text-right">{graphics[graphic].quantity}</td>
                </tr>
            )
        });

        return (
            <table className="graphics-summary">
                <thead>
                    <tr>
                        <th>Request</th>
                        <th>Reason</th>
                        <th className="text-right">Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}
