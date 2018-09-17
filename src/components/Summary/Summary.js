import React, {Component} from 'react';
import FirebaseService from '../../services/FirebaseService'
import SummaryTable from "../SummaryTable/SummaryTable";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import ViewModal from "../ViewModal/ViewModal";
import EditModal from "../EditModal/EditModal";
import Button from "../Button/Button";
import './Summary.css';

export default class Summary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            graphicRequestsRetrieved: false,
            graphicRequests: null,
            graphicRequestId: null,
            confirmModal: false,
            editModal: false,
            viewModal: false
        };

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
            FirebaseService.getGraphicRequests()
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

        this.setState({confirmModal: true, graphicRequestId: graphicRequestId}, () => {
            console.log(this.state);
        });
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
        FirebaseService.deleteGraphicRequest(this.state.graphicRequestId)
            .then(this.setState({confirmModal: false, graphicRequestId: null}, () => {
                this.refreshData();
            }));
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
            console.log(graphicRequest);
            const modal =
                this.state.confirmModal ?
                    <ConfirmModal
                        graphicRequest={graphicRequest}
                        onClose={this.closeModal}
                        onDelete={this.doDelete}
                        open={this.state.confirmModal}
                    /> :
                this.state.viewModal ?
                    <ViewModal
                        graphicRequest={this.state.graphicRequestId}
                        onClose={this.closeModal}
                        open={this.state.viewModal}
                    /> :
                this.state.editModal ?
                    <EditModal
                        editMode={this.state.editMode}
                        id={this.state.graphicRequestId}
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
                        view={this.viewRequest}
                        edit={this.editRequest}
                        delete={this.deleteRequest}
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
