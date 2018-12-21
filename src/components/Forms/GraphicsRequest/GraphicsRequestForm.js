import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Modal from 'react-responsive-modal';
import Button from "../../FormElements/Button/Button";
import Select from "../../FormElements/Select/Select";
import TextField from "../../FormElements/InputField/TextField";
import StoreDetails from "../../StoreDetails/StoreDetails";
import Utils from '../../../helpers/Utils'
import GraphicsForm from "../Graphics/GraphicsForm";
import GraphicsSummary from "../../Tables/GraphicsSummary/GraphicsSummary";
import GraphicService from "../../../services/GraphicService";
import AuthenticationService from "../../../services/AuthenticationService";
import EmailService from "../../../services/EmailService";
// import CosmosDBService from "../../../services/CosmosDBService";
import FirebaseService from "../../../services/FirebaseService";
import {faFrown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './GraphicsRequestForm.css';

export default class GraphicsRequestForm extends Component {
    constructor(props) {
        super(props);

        this.addGraphic = this.addGraphic.bind(this);
        this.closeGraphicFormModal = this.closeGraphicFormModal.bind(this);
        this.deleteGraphic = this.deleteGraphic.bind(this);
        this.doComplete = this.doComplete.bind(this);
        this.doSave = this.doSave.bind(this);
        this.editDetails = this.editDetails.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClose = this.onClose.bind(this);
        this.showAddGraphicsForm = this.showAddGraphicsForm.bind(this);
        this.showEditGraphicsForm = this.showEditGraphicsForm.bind(this);
        this.showScreenElements = this.showScreenElements.bind(this);

        this.state = {
            graphicRequest: props.graphicRequest,
            readOnly: props.editMode,
            reasons: [],
            seasons: [],
            showAddGraphicForm: false,
            showEditGraphicForm: false,
            showStoreSelect: false,
            stores: [],
            viewMode: props.viewMode
        };

        this.authenticationService = new AuthenticationService();
        // this.cosmosDBService = new CosmosDBService();
    }

    static propTypes = {
        editMode: PropTypes.bool.isRequired,
        graphicRequest: PropTypes.object.isRequired,
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        viewMode: PropTypes.bool.isRequired,
        graphicId: PropTypes.string
    };

    componentDidMount() {
        if (!this.props.viewMode) {
            FirebaseService.getDropdownData()
            // this.cosmosDBService.getDropdownData(this.authenticationService)
                .then(data => {
                    this.setState({
                        stores: data.stores,
                        reasons: data.reasons,
                        seasons: data.seasons
                    });
                })
        }
    }

    addGraphic = (graphic) => {
        const graphicRequest = this.state.graphicRequest;
        const graphicId = GraphicService.generateGraphicId(graphicRequest, graphic);

        if (typeof graphicRequest.graphics === 'undefined') {
            graphicRequest.graphics = {};
        }

        graphicRequest.graphics[graphicId] = graphic;

        this.setState({graphicRequest: graphicRequest}, () => {
            this.closeGraphicFormModal();
        });
    };

    deleteGraphic = (graphicId) => {
        const graphicRequest = this.state.graphicRequest;

        delete graphicRequest.graphics[graphicId];

        this.setState({graphicRequest: graphicRequest}, () => {
            this.closeGraphicFormModal();
        });
    };

    closeGraphicFormModal = () => {
        Utils.unblurBackground();
        this.setState({graphicIdToEdit: null, showAddGraphicForm: false, showEditGraphicForm: false});
    };

    doComplete = () => {
        const xmlMessage = EmailService.FormatGraphicRequestXML(this.state.graphicRequest);
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
        const newGraphicRequest = this.state.graphicRequest;

        if (this.state.complete) {
            newGraphicRequest.sentDate = new Date().toString();
            this.setState({complete: null});
        }

        if (this.props.editMode) {
            FirebaseService.updateGraphicRequest(this.props.graphicId, newGraphicRequest)
            // this.cosmosDBService.updateDocument('graphicrequests', this.authenticationService, newGraphicRequest, newGraphicRequest.id)
                .then(() => {
                    this.onClose();
                });
        } else {
            newGraphicRequest.id = Utils.getGuid();
            newGraphicRequest.requestDate = new Date().toString();
            FirebaseService.writeGraphicRequest(newGraphicRequest)
            // this.cosmosDBService.createDocument('graphicrequests', this.authenticationService, newGraphicRequest)
                .then(() => {
                    this.onClose();
                });
        }

    };

    editDetails = () => {
        this.setState({readOnly: false, showStoreSelect: true});
    };

    onChange = (field) => {
        if (!this.state.readOnly) {
            const newGraphicRequest = this.state.graphicRequest;

            if (field.isValid) {
                if (field.id === 'storeNumber') {
                    newGraphicRequest.store = this.state.stores[field.value];
                } else {
                    newGraphicRequest[field.id] = field.value;
                }
            }

            this.setState({graphicRequest: newGraphicRequest, [field.id + 'IsValid']: field.isValid}, () => {
                this.showScreenElements();
            });
        }
    };

    onClose = () => {
        Utils.unblurBackground();
        this.props.onClose('editModal');
    };

    showAddGraphicsForm = () => {
        this.setState({showAddGraphicForm: true});
    };

    showEditGraphicsForm = (event) => {
        this.setState({showEditGraphicForm: true, graphicIdToEdit: event.currentTarget.id});
    };

    showScreenElements = () => {
        this.setState({
            showStoreSelect: this.state.contactNameIsValid
        })
    };

    render() {
        const storeSelect = this.state.showStoreSelect ?
            <div className="input-group">
                <Select
                    data={this.state.stores}
                    descriptor="name"
                    id="storeNumber"
                    onChange={this.onChange}
                    placeholder="Store"
                    readOnly={this.state.readOnly}
                    title="Store"
                    value={this.state.graphicRequest.store ? this.state.graphicRequest.store.storeNumber : null}
                />
            </div> : null;

        const storeInfo = this.state.graphicRequest.store ?
            <StoreDetails store={this.state.graphicRequest.store} /> : '';

        const graphicsPopulated = this.state.graphicRequest.graphics && Object.keys(this.state.graphicRequest.graphics).length > 0;
        const graphicsSummary = graphicsPopulated ?
            <GraphicsSummary graphics={this.state.graphicRequest.graphics} onEdit={this.showEditGraphicsForm}/> : null;

        const cancelButtonText = this.state.viewMode ? 'Close' : 'Cancel';

        const buttons = !this.state.viewMode && graphicsPopulated ?
            <footer className="modal-buttons">
                <Button
                    text="Cancel"
                    type="cancel"
                    className="btn secondary-outline"
                    onClick={this.onClose}
                />
                <Button
                    text="Save"
                    type="save"
                    className="btn secondary-outline"
                    onClick={this.doSave}
                />
                <Button
                    text="Complete"
                    type="confirm"
                    className="btn primary"
                    onClick={this.doComplete}
                />
            </footer> :
            <footer className="modal-buttons">
                <Button
                    text={cancelButtonText}
                    type="cancel"
                    className="btn secondary-outline"
                    onClick={this.onClose}
                />
            </footer>;

        const addButton = !this.state.viewMode ?
            <Button
                text="Add"
                type="add"
                className="btn secondary"
                onClick={this.showAddGraphicsForm}
            /> : '';

        const emailError = this.state.complete === false ? <div className="errorMessage"><FontAwesomeIcon icon={faFrown} /> Error sending email - see console log for details</div> : null;
        const errorText = this.state.complete === false ? <span> - Error sending email <FontAwesomeIcon icon={faFrown} /></span>: null;
        const graphics = this.state.graphicRequest.store ?
            <div className="graphics-container">
                <div className="graphics">
                    <div className="section-header">
                        <span>Graphics</span>
                        {addButton}
                    </div>
                    {graphicsSummary}
                </div>
                {emailError}
                {buttons}
            </div> : null;

        const contactName = this.state.readOnly || this.state.viewMode ?
            <div className="pseudo-field">{this.state.graphicRequest.contactName}</div> :
            <TextField
                autoFocus={true}
                capitalise={true}
                id="contactName"
                minLength={3}
                title="Contact Name"
                onChange={this.onChange}
                readOnly={false}
                value={this.state.graphicRequest.contactName}
            />;

        const editButton = this.state.readOnly && !this.state.viewMode ?
            <Button
                text="Edit"
                type="edit"
                className="btn secondary-outline"
                onClick={this.editDetails}
            /> : '';

        const graphicsForm = this.state.showAddGraphicForm ?
                <GraphicsForm seasons={this.state.seasons} reasons={this.state.reasons} open={true} onClose={this.closeGraphicFormModal} onChange={this.onChange} onSave={this.addGraphic}/>
            : this.state.showEditGraphicForm ?
                <GraphicsForm seasons={this.state.seasons} reasons={this.state.reasons} graphicId={this.state.graphicIdToEdit} graphic={this.state.graphicRequest.graphics[this.state.graphicIdToEdit]} open={true} onDelete={this.deleteGraphic} onClose={this.closeGraphicFormModal} onChange={this.onChange} onSave={this.addGraphic}/>
            : null;

        const blur = classnames({
            blur5: this.state.showAddGraphicForm || this.state.showEditGraphicForm
        });

        const errorClass = this.state.complete === false ? 'error' : '';

        const contactButtons = !this.state.graphicRequest.store ? buttons : '';

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
                        <h1>{mode} Graphic Request {errorText}</h1>
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
                            {storeSelect}
                            {storeInfo}
                        </div>
                        {graphics}
                    </div>
                </div>
                {graphicsForm}
                {contactButtons}
            </Modal>
        );
    };
}
