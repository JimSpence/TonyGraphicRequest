import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './GraphicsSummary.css';

export default class GraphicsSummary extends Component {
    static propTypes = {
        graphics: PropTypes.object.isRequired,
        onEdit: PropTypes.func
    };

    render() {
        const {graphics, onEdit} = this.props;
        const rows = Object.keys(graphics).map((graphic, index) => {
            return (
                <tr key={index} id={graphic} onClick={onEdit}>
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
