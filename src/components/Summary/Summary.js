import React, {Component} from 'react';
import FirebaseService from '../../services/FirebaseService';
// import CosmosDBService from "../../services/CosmosDBService";
// import AuthenticationService from "../../services/AuthenticationService";
import SummaryTable from "../Tables/SummaryTable/SummaryTable";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import DealerOrderForm from "../Forms/DealerOrder/DealerOrderForm";
import Button from "../FormElements/Button/Button";
import './Summary.css';

export default class Summary extends Component {
    state = {
        dealerOrdersRetrieved: false,
        dealerOrders: null,
        dealerOrderId: null,
        confirmModal: false,
        editModal: false
    };

    // cosmosDBService = new CosmosDBService();
    // authenticationService = new AuthenticationService();

    componentDidMount() {
        this.refreshData();
    };

    refreshData = () => {
        this.setState({dealerOrdersRetrieved: false}, () => {
            // this.cosmosDBService.getDealerOrders(this.authenticationService)
            FirebaseService.getDealerOrders()
                .then(data => {
                    const dealerOrders = data;
                    for (const dealerOrder in dealerOrders) {
                        dealerOrders[dealerOrder].tyreOrdersCount = Object.keys(dealerOrders[dealerOrder].tyreOrders).length;
                        dealerOrders[dealerOrder].dealerNumber = dealerOrders[dealerOrder].dealer.dealerNumber;
                    }
                    this.setState({dealerOrders: dealerOrders});
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.setState({dealerOrdersRetrieved: true}, () => {
                });
            });
        });
    };

    addDealerOrder = () => {
        this.setState({editModal: true, dealerOrder: {}, dealerOrderId: null, editMode: false, viewMode: false});
    };

    deleteDealerOrder = (event) => {
        const dealerOrderId = event.target.closest('td').dataset.delete;
        this.setState({confirmModal: true, dealerOrderId: dealerOrderId});
    };

    editDealerOrder = (event) => {
        if (!event.target.closest('td').className.includes('delete')) {
            this.setState({editModal: true, dealerOrderId: event.currentTarget.dataset.key, editMode: true, viewMode: false});
        }
    };

    viewDealerOder = (event) => {
        this.setState({editModal: true, dealerOrderId: event.currentTarget.dataset.key, editMode: false, viewMode: true});
    };

    doDelete = () => {
        // this.cosmosDBService.deleteDealerOrder(this.authenticationService, this.state.dealerOrderId)
        FirebaseService.deleteDealerOrder(this.state.dealerOrderId)
            .then(() => {
                this.setState({confirmModal: false, dealerOrderId: null}, () => {
                    this.refreshData();
                })
            });
    };

    closeModal = (modalToClose) => {
        this.setState({[modalToClose]: false});
        this.refreshData();
    };

    render() {
        if (!this.state.dealerOrdersRetrieved) {
            return <div>Data loading...</div>;
        } else {
            const {dealerOrders} = this.state;
            const dealerOrder = this.state.dealerOrderId ? this.state.dealerOrders[this.state.dealerOrderId] : {};
            const modal =
                this.state.confirmModal ?
                    <ConfirmDialog
                        dealerOrder={dealerOrder}
                        onClose={this.closeModal}
                        onDelete={this.doDelete}
                        open={this.state.confirmModal}
                    /> :
                this.state.editModal ?
                    <DealerOrderForm
                        editMode={this.state.editMode}
                        dealerOrderId={this.state.dealerOrderId}
                        dealerOrder={dealerOrder}
                        onClose={this.closeModal}
                        open={this.state.editModal}
                        viewMode={this.state.viewMode}
                    /> :
                null;

            const summaryTable = dealerOrders ?
                <div className="summary-container">
                    <SummaryTable
                        dealerOrders={dealerOrders}
                        onView={this.viewDealerOder}
                        onEdit={this.editDealerOrder}
                        onDelete={this.deleteDealerOrder}
                    />
                </div> :
                <table>
                    <thead>
                        <tr>
                            <th className="no-records">There are no orders to display</th>
                        </tr>
                    </thead>
                </table>;

            return (
                <div>
                    <div className="summary-header">
                        <h2>Summary</h2>
                        <Button
                            className="btn primary"
                            onClick={this.addDealerOrder}
                            text="New"
                            title="New Dealer Order"
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
