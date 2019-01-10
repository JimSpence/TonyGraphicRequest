import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown, faCaretUp, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import Utils from "../../../helpers/Utils";
import './SummaryTable.css';

export default class SummaryTable extends Component {
    state = {
        sortCriteria: {
            key: 'requestDate',
            descending: true,
            dateField: true
        }
    };

    static propTypes = {
        dealerOrders: PropTypes.object.isRequired,
        onView: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired
    };

    sortData = (event) => {
        const sortCriteria = this.state.sortCriteria;
        const key = event.target.id;
        sortCriteria.key = key;
        sortCriteria.descending = !sortCriteria.descending;

        switch(key) {
            case 'contactName':
            case 'dealerNumber':
            case 'tyreOrdersCount':
                sortCriteria.dateField = false;
                break;
            case 'requestDate':
            case 'sentDate':
                sortCriteria.dateField = true;
                break;
            default:
                sortCriteria.key = 'requestDate';
                sortCriteria.dateField = true;
                sortCriteria.descending = true;
        }

        this.setState({sortCriteria: sortCriteria});
    };

    render() {
        const {dealerOrders, onEdit, onView, onDelete} = this.props;
        const rows = Object.keys(dealerOrders)
            .sort(Utils.sortByKey(dealerOrders, this.state.sortCriteria.key, this.state.sortCriteria.descending, this.state.sortCriteria.dateField))
            .map((dealerOrder, index) => {
                const order = dealerOrders[dealerOrder];
                const orderItem = order.sentDate ? {
                    deleteColumn: <td>&nbsp;</td>,
                    rowAction: onView,
                    rowTitle: 'View request',
                    sentDate: new Intl.DateTimeFormat('en-GB').format(new Date(order.sentDate)),
                    sentIcon: <span className="success text-center">&#10004;</span>
                } : {
                    deleteColumn: <td className="delete text-center" title="Delete" onClick={onDelete} data-delete={dealerOrder}><span className="icon"><FontAwesomeIcon icon={faTrashAlt} /></span></td>,
                    rowAction: onEdit,
                    rowTitle: 'Edit request',
                    sentDate: null,
                    sentIcon: null
                };

                return (
                    <tr key={index} title={orderItem.rowTitle} onClick={orderItem.rowAction} data-key={dealerOrder}>
                        <td>{order.contactName}</td>
                        <td>{order.dealerNumber + ' - ' + order.dealer.name}</td>
                        <td className="text-center">{Object.keys(order.tyreOrders).length}</td>
                        <td className="text-center">
                            {new Intl.DateTimeFormat('en-GB').format(new Date(order.requestDate))}
                        </td>
                        <td className="success text-center">{orderItem.sentIcon} {orderItem.sentDate}</td>
                        {orderItem.deleteColumn}
                    </tr>
                )
        });

        return (
            <table>
                <thead>
                <tr>
                    <th><a className="sortable" id="contactName" title="Sort by Contact Name" onClick={this.sortData}>{this.state.sortCriteria.key === 'contactName' ? this.state.sortCriteria.descending ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretUp} /> : null} Contact Name</a></th>
                    <th><a className="sortable" id="dealerNumber" title="Sort by Dealer" onClick={this.sortData}>{this.state.sortCriteria.key === 'dealerNumber' ? this.state.sortCriteria.descending ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretUp} /> : null} Dealer</a></th>
                    <th className="text-center"><a className="sortable" id="tyreOrdersCount" title="Sort by Number of Tyre Orders" onClick={this.sortData}>{this.state.sortCriteria.key === 'tyreOrdersCount' ? this.state.sortCriteria.descending ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretUp} /> : null} Number</a></th>
                    <th className="text-center"><a className="sortable" id="requestDate" title="Sort by Date Raised" onClick={this.sortData}>{this.state.sortCriteria.key === 'requestDate' ? this.state.sortCriteria.descending ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretUp} /> : null} Raised</a></th>
                    <th className="text-center"><a className="sortable" id="sentDate" title="Sort by Date Sent" onClick={this.sortData}>{this.state.sortCriteria.key === 'sentDate' ? this.state.sortCriteria.descending ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretUp} /> : null} Sent</a></th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}
