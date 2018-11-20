import React, {Component} from 'react';
// import FirebaseService from '../../services/FirebaseService';
import CosmosDBService from "../../services/CosmosDBService";
import AuthenticationService from "../../services/AuthenticationService";
import SummaryTable from "../Tables/SummaryTable/SummaryTable";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import GraphicsRequestForm from "../Forms/GraphicsRequest/GraphicsRequestForm";
import Button from "../FormElements/Button/Button";
import './Summary.css';

export default class Summary extends Component {
    constructor() {
        super();

        this.state = {
            graphicRequestsRetrieved: false,
            graphicRequests: null,
            graphicRequestId: null,
            confirmModal: false,
            editModal: false
        };

        this.cosmosDBService = new CosmosDBService();
        this.authenticationService = new AuthenticationService();

        this.deleteRequest = this.deleteRequest.bind(this);
        this.editRequest = this.editRequest.bind(this);
        this.viewRequest = this.viewRequest.bind(this);
        this.doDelete = this.doDelete.bind(this);
    }

    componentDidMount() {
        this.refreshData();
    };

    refreshData = () => {
        this.setState({graphicRequestsRetrieved: false}, () => {
            this.cosmosDBService.getGraphicRequests(this.authenticationService)
            // FirebaseService.getGraphicRequests()
                .then(data =>
                    this.setState({graphicRequests: data, graphicRequestsRetrieved: true})
                );
            });
    };

    addRequest = () => {
        this.setState({editModal: true, graphicRequest: {}, graphicRequestId: null, editMode: false, viewMode: false});
    };

    deleteRequest = (event) => {
        const graphicRequestId = event.target.closest('td').dataset.delete;
        this.setState({confirmModal: true, graphicRequestId: graphicRequestId});
    };

    editRequest = (event) => {
        if (!event.target.closest('td').className.includes('delete')) {
            this.setState({editModal: true, graphicRequestId: event.currentTarget.dataset.key, editMode: true, viewMode: false});
        }
    };

    viewRequest = (event) => {
        this.setState({editModal: true, graphicRequestId: event.currentTarget.dataset.key, editMode: false, viewMode: true});
    };

    doDelete = () => {
        this.cosmosDBService.deleteGraphicRequest(this.authenticationService, this.state.graphicRequestId)
        // FirebaseService.deleteGraphicRequest(this.state.graphicRequestId)
            .then(() => {
                this.setState({confirmModal: false, graphicRequestId: null}, () => {
                    this.refreshData();
                })
            });
    };

    closeModal = (modalToClose) => {
        this.setState({[modalToClose]: false});
        this.refreshData();
    };

    render() {
        if (!this.state.graphicRequestsRetrieved) {
            return <div>Data loading...</div>;
        } else {
            const {graphicRequests} = this.state;
            const graphicRequest = this.state.graphicRequestId ? this.state.graphicRequests[this.state.graphicRequestId] : {};
            const modal =
                this.state.confirmModal ?
                    <ConfirmDialog
                        graphicRequest={graphicRequest}
                        onClose={this.closeModal}
                        onDelete={this.doDelete}
                        open={this.state.confirmModal}
                    /> :
                this.state.editModal ?
                    <GraphicsRequestForm
                        editMode={this.state.editMode}
                        graphicId={this.state.graphicRequestId}
                        graphicRequest={graphicRequest}
                        onClose={this.closeModal}
                        open={this.state.editModal}
                        viewMode={this.state.viewMode}
                    /> :
                null;

            const summaryTable = graphicRequests ?
                <div className="summary-container">
                    <SummaryTable
                        graphicRequests={graphicRequests}
                        onView={this.viewRequest}
                        onEdit={this.editRequest}
                        onDelete={this.deleteRequest}
                    />
                </div> : '';

            return (
                <div>
                    <div className="summary-header">
                        <h2>Summary</h2>
                        <Button
                            className="btn primary"
                            onClick={this.addRequest}
                            text="New"
                            type="add"
                        />
                    </div>
                    {summaryTable}
                    {modal}
                </div>
            )
        }
    }
}
