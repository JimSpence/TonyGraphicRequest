import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Modal from 'react-responsive-modal';
import Button from "../../FormElements/Button/Button";
import Select from "../../FormElements/Select/Select";
import TextField from "../../FormElements/InputField/TextField";
import DealerDetails from "../../DealerDetails/DealerDetails";
import Utils from '../../../helpers/Utils'
import TyreOrdersForm from "../TyreOrders/TyreOrdersForm";
import TyreOrdersSummary from "../../Tables/TyreOrdersSummary/TyreOrdersSummary";
import TyreOrderService from "../../../services/TyreOrderService";
import AuthenticationService from "../../../services/AuthenticationService";
import EmailService from "../../../services/EmailService";
// import CosmosDBService from "../../../services/CosmosDBService";
import FirebaseService from "../../../services/FirebaseService";
import {faFrown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './DealerOrderForm.css';

export default class DealerOrderForm extends Component {
    constructor(props) {
        super(props);

        this.addTyreOrder = this.addTyreOrder.bind(this);
        this.closeTyreOrderFormModal = this.closeTyreOrderFormModal.bind(this);
        this.deleteTyreOrder = this.deleteTyreOrder.bind(this);
        this.doComplete = this.doComplete.bind(this);
        this.doSave = this.doSave.bind(this);
        this.editDetails = this.editDetails.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClose = this.onClose.bind(this);
        this.showAddTyreOrdersForm = this.showAddTyreOrdersForm.bind(this);
        this.showEditTyreOrdersForm = this.showEditTyreOrdersForm.bind(this);
        this.showScreenElements = this.showScreenElements.bind(this);

        this.state = {
            dealerOrder: props.dealerOrder,
            readOnly: props.editMode,
            reasons: [],
            seasons: [],
            showAddTyreOrderForm: false,
            showEditTyreOrderForm: false,
            showDealerSelect: false,
            dealers: [],
            viewMode: props.viewMode
        };

        this.authenticationService = new AuthenticationService();
        // this.cosmosDBService = new CosmosDBService();
    }

    static propTypes = {
        editMode: PropTypes.bool.isRequired,
        dealerOrder: PropTypes.object.isRequired,
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        viewMode: PropTypes.bool.isRequired,
        tyreOrderId: PropTypes.string
    };

    componentDidMount() {
        if (!this.props.viewMode) {
            FirebaseService.getDropdownData()
            // this.cosmosDBService.getDropdownData(this.authenticationService)
                .then(data => {
                    this.setState({
                        dealers: data.dealers,
                        vehicleMakes: data.vehicleMakes,
                        reasons: data.reasons,
                        seasons: data.seasons
                    });
                })
        }
    }

    addTyreOrder = (tyreOrder) => {
        const dealerOrder = this.state.dealerOrder;
        const tyreOrderId = TyreOrderService.generateTyreOrderId(tyreOrder);

        if (typeof dealerOrder.tyreOrders === 'undefined') {
            dealerOrder.tyreOrders = {};
        }

        dealerOrder.tyreOrders[tyreOrderId] = tyreOrder;

        this.setState({dealerOrder: dealerOrder}, () => {
            this.closeTyreOrderFormModal();
        });
    };

    deleteTyreOrder = (tyreOrderId) => {
        const dealerOrder = this.state.dealerOrder;

        delete dealerOrder.tyreOrders[tyreOrderId];

        this.setState({dealerOrder: dealerOrder}, () => {
            this.closeTyreOrderFormModal();
        });
    };

    closeTyreOrderFormModal = () => {
        Utils.unblurBackground();
        this.setState({tyreOrderIdToEdit: null, showAddTyreOrderForm: false, showEditTyreOrderForm: false});
    };

    doComplete = () => {
        const xmlMessage = EmailService.FormatDealerOrderXML(this.state.dealerOrder);
        console.log(xmlMessage);
        EmailService.sendEmail(xmlMessage)
            .then((response) => {
                if (response.ok) {
                    this.setState({complete: true}, () => {
                        this.doSave();
                    });
                } else {
                    console.log(response);
                    this.setState({complete: false});
                }
            });
    };

    doSave = () => {
        const newDealerOrder = this.state.dealerOrder;

        if (this.state.complete) {
            newDealerOrder.sentDate = new Date().toString();
            this.setState({complete: null});
        }

        if (this.props.editMode) {
            FirebaseService.updateDealerOrder(this.props.dealerOrderId, newDealerOrder)
            // this.cosmosDBService.updateDocument('dealerorders', this.authenticationService, newDealerOrder, newDealerOrder.id)
                .then(() => {
                    this.onClose();
                });
        } else {
            newDealerOrder.id = Utils.getGuid();
            newDealerOrder.requestDate = new Date().toString();
            FirebaseService.writeDealerOrder(newDealerOrder)
            // this.cosmosDBService.createDocument('dealerorders', this.authenticationService, newDealerOrder)
                .then(() => {
                    this.onClose();
                });
        }

    };

    editDetails = () => {
        this.setState({readOnly: false, showDealerSelect: true});
    };

    onChange = (field) => {
        if (!this.state.readOnly) {
            const newDealerOrder = this.state.dealerOrder;

            if (field.isValid) {
                if (field.id === 'dealerNumber') {
                    newDealerOrder.dealer = this.state.dealers[field.value];
                } else {
                    newDealerOrder[field.id] = field.value;
                }
            }

            this.setState({dealerOrder: newDealerOrder, [field.id + 'IsValid']: field.isValid}, () => {
                this.showScreenElements();
            });
        }
    };

    onClose = () => {
        Utils.unblurBackground();
        this.props.onClose('editModal');
    };

    showAddTyreOrdersForm = () => {
        this.setState({showAddTyreOrderForm: true});
    };

    showEditTyreOrdersForm = (event) => {
        this.setState({showEditTyreOrderForm: true, tyreOrderIdToEdit: event.currentTarget.id});
    };

    showScreenElements = () => {
        this.setState({
            showDealerSelect: this.state.contactNameIsValid
        })
    };

    render() {
        const dealerSelect = this.state.showDealerSelect ?
            <div className="input-group">
                <Select
                    data={this.state.dealers}
                    descriptor="name"
                    id="dealerNumber"
                    onChange={this.onChange}
                    placeholder="Dealer"
                    readOnly={this.state.readOnly}
                    title="Dealer"
                    value={this.state.dealerOrder.dealer ? this.state.dealerOrder.dealer.dealerNumber : null}
                />
            </div> : null;

        const dealerInfo = this.state.dealerOrder.dealer ?
            <DealerDetails dealer={this.state.dealerOrder.dealer} /> : '';

        const tyreOrdersPopulated = this.state.dealerOrder.tyreOrders && Object.keys(this.state.dealerOrder.tyreOrders).length > 0;
        const tyreOrdersSummary = tyreOrdersPopulated ?
            <TyreOrdersSummary tyreOrders={this.state.dealerOrder.tyreOrders} onEdit={this.showEditTyreOrdersForm}/> : null;

        const cancelButtonText = this.state.viewMode ? 'Close' : 'Cancel';

        const buttons = !this.state.viewMode && tyreOrdersPopulated ?
            <footer className="modal-buttons">
                <Button
                    text="Cancel"
                    type="cancel"
                    title="Cancel Order"
                    className="btn secondary-outline"
                    onClick={this.onClose}
                />
                <Button
                    text="Save"
                    type="save"
                    title="Save Order"
                    className="btn secondary-outline"
                    onClick={this.doSave}
                />
                <Button
                    text="Complete"
                    type="confirm"
                    title="Complete Order"
                    className="btn primary"
                    onClick={this.doComplete}
                />
            </footer> :
            <footer className="modal-buttons">
                <Button
                    text={cancelButtonText}
                    type="cancel"
                    title="Cancel Dealer Order"
                    className="btn secondary-outline"
                    onClick={this.onClose}
                />
            </footer>;

        const addButton = !this.state.viewMode ?
            <Button
                text="Add"
                type="add"
                title="New Tyre Order"
                className="btn secondary"
                onClick={this.showAddTyreOrdersForm}
            /> : '';

        const emailError = this.state.complete === false ? <div className="errorMessage"><FontAwesomeIcon icon={faFrown} /> Error sending email - see console log for details</div> : null;
        const errorText = this.state.complete === false ? <span> - Error sending email <FontAwesomeIcon icon={faFrown} /></span>: null;
        const tyreOrders = this.state.dealerOrder.dealer ?
            <div className="tyre-orders-container">
                <div className="tyre-orders">
                    <div className="section-header">
                        <span>Tyre Orders</span>
                        {addButton}
                    </div>
                    {tyreOrdersSummary}
                </div>
                {emailError}
                {buttons}
            </div> : null;

        const contactName = this.state.readOnly || this.state.viewMode ?
            <div className="pseudo-field">{this.state.dealerOrder.contactName}</div> :
            <TextField
                autoFocus={true}
                capitalise={true}
                id="contactName"
                minLength={3}
                title="Contact Name"
                onChange={this.onChange}
                readOnly={false}
                value={this.state.dealerOrder.contactName}
            />;

        const editButton = this.state.readOnly && !this.state.viewMode ?
            <Button
                text="Edit"
                type="edit"
                title="Edit"
                className="btn secondary-outline"
                onClick={this.editDetails}
            /> : '';

        const tyreOrdersForm = this.state.showAddTyreOrderForm ?
                <TyreOrdersForm seasons={this.state.seasons} reasons={this.state.reasons} vehicleMakes={this.state.vehicleMakes} open={true} onClose={this.closeTyreOrderFormModal} onChange={this.onChange} onSave={this.addTyreOrder}/>
            : this.state.showEditTyreOrderForm ?
                <TyreOrdersForm seasons={this.state.seasons} reasons={this.state.reasons} vehicleMakes={this.state.vehicleMakes} tyreOrderId={this.state.tyreOrderIdToEdit} tyreOrder={this.state.dealerOrder.tyreOrders[this.state.tyreOrderIdToEdit]} open={true} onDelete={this.deleteTyreOrder} onClose={this.closeTyreOrderFormModal} onChange={this.onChange} onSave={this.addTyreOrder}/>
            : null;

        const blur = classnames({
            blur5: this.state.showAddTyreOrderForm || this.state.showEditTyreOrderForm
        });

        const errorClass = this.state.complete === false ? 'error' : '';

        const contactButtons = !this.state.dealerOrder.dealer ? buttons : '';

        const mode = this.props.editMode ? 'Edit' : this.state.viewMode ? 'View' : 'New';

        return (
            <Modal
                center={true}
                classNames={{modal: 'custom-modal edit-modal ' + blur + errorClass}}
                closeOnOverlayClick={false}
                onClose={this.onClose}
                onOpen={Utils.blurBackground()}
                open={this.props.open}
                showCloseIcon={false}
            >
                <div>
                    <header>
                        <h1>{mode} Dealer Order {errorText}</h1>
                    </header>
                    <div className="modal-body">
                        <div className="contact-details">
                            <div className="section-header">
                                <span>Contact Details</span>
                                {editButton}
                            </div>
                            <div className="input-group">
                                {contactName}
                            </div>
                            {dealerSelect}
                            {dealerInfo}
                        </div>
                        {tyreOrders}
                    </div>
                </div>
                {tyreOrdersForm}
                {contactButtons}
            </Modal>
        );
    };
}
