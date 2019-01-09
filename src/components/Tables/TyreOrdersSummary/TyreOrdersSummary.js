import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './TyreOrdersSummary.css';

export default class TyreOrdersSummary extends Component {
    static propTypes = {
        tyreOrders: PropTypes.object.isRequired,
        onEdit: PropTypes.func
    };

    render() {
        const {tyreOrders, onEdit} = this.props;
        const rows = Object.keys(tyreOrders).map((tyreOrder, index) => {
            return (
                <tr key={index} id={tyreOrder} onClick={onEdit}>
                    <td>{tyreOrder}</td>
                    <td>{tyreOrders[tyreOrder].reason}</td>
                    <td className="text-right">{tyreOrders[tyreOrder].quantity}</td>
                </tr>
            )
        });

        return (
            <table className="tyre-orders-summary">
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
