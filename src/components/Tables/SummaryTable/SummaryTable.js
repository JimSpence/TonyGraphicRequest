import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import Utils from "../../../services/Utils";
import './SummaryTable.css';

export default class SummaryTable extends Component {
    static propTypes = {
        graphicRequests: PropTypes.object.isRequired,
        onView: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired
    };

    render() {
        const {graphicRequests, onEdit, onView, onDelete} = this.props;
        const rows = Object.keys(graphicRequests)
            .sort(Utils.sortByKey(graphicRequests, 'requestDate', true, true))
            .map((graphicRequest, index) => {
                const request = graphicRequests[graphicRequest];
                const requestItem = request.sentDate ? {
                    deleteColumn: <td>&nbsp;</td>,
                    rowAction: onView,
                    rowTitle: 'View request',
                    sentDate: new Intl.DateTimeFormat('en-GB').format(new Date(request.sentDate)),
                    sentIcon: <span className="success text-center">&#10004;</span>
                } : {
                    deleteColumn: <td className="delete text-center" title="Delete" onClick={onDelete} data-delete={graphicRequest}><span className="icon"><FontAwesomeIcon icon={faTrashAlt} /></span></td>,
                    rowAction: onEdit,
                    rowTitle: 'Edit request',
                    sentDate: null,
                    sentIcon: null
                };

                return (
                    <tr key={index} title={requestItem.rowTitle} onClick={requestItem.rowAction} data-key={graphicRequest}>
                        <td>{request.contactName}</td>
                        <td>{request.store.storeNumber + ' - ' + request.store.name}</td>
                        <td className="text-center">{Object.keys(request.graphics).length}</td>
                        <td className="text-center">
                            {new Intl.DateTimeFormat('en-GB').format(new Date(request.requestDate))}
                        </td>
                        <td className="success text-center">{requestItem.sentIcon} {requestItem.sentDate}</td>
                        {requestItem.deleteColumn}
                    </tr>
                )
        });

        return (
            <table>
                <thead>
                <tr>
                    <th>Contact Name</th>
                    <th>Store</th>
                    <th className="text-center">No of Graphics</th>
                    <th className="text-center">Raised</th>
                    <th className="text-center">Sent</th>
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
