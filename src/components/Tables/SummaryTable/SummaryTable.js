import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import Utils from "../../../services/Utils";
import './SummaryTable.css';

export default class SummaryTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            graphicRequests: this.props.graphicRequests
        };
    }

    compare = (a, b) => {
        return Utils.sortByKey(a, b, this.state.graphicRequests, 'requestDate', true, true);
    };

    render() {
        const {graphicRequests} = this.state;
        const rows = Object.keys(graphicRequests)
            .sort(this.compare)
            .map((graphicRequest, index) => {

            const request = graphicRequests[graphicRequest];
            const requestItem = request.sentDate ? {
                deleteColumn: <td>&nbsp;</td>,
                rowAction: this.props.view,
                rowTitle: 'View request',
                sentDate: new Intl.DateTimeFormat('en-GB').format(new Date(request.sentDate)),
                // statusColumn: <td className="success text-center" title="Request sent">&#10004;</td>,
                sentIcon: <span className="success text-center">&#10004;</span>
            } : {
                // deleteColumn: <td className="delete text-center" title="Delete" onClick={this.props.delete} data-delete={graphicRequest}>&#128465;</td>,
                deleteColumn: <td className="delete text-center" title="Delete" onClick={this.props.delete} data-delete={graphicRequest}><span className="icon"><FontAwesomeIcon icon={faTrashAlt} /></span></td>,
                rowAction: this.props.edit,
                rowTitle: 'Edit request',
                sentDate: null,
                // statusColumn: <td>&nbsp;</td>,
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
                    {/*{requestItem.statusColumn}*/}
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
                    {/*<th className="text-center">Status</th>*/}
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
