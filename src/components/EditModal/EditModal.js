import React, {Component} from 'react';
import classnames from 'classnames';
import Modal from 'react-responsive-modal';
import Button from "../Button/Button";
import Select from "../Select/Select";
import InputField from "../InputField/InputField";
import StoreDetails from "../StoreDetails/StoreDetails";
import Utils from '../../services/Utils'
import GraphicsForm from "../GraphicsForm/GraphicsForm";
import GraphicsSummary from "../GraphicsSummary/GraphicsSummary";
import DataService from "../../services/DataService";
import EmailService from "../../services/EmailService";
import FirebaseService from "../../services/FirebaseService";
import './EditModal.css';

export default class EditModal extends Component {
    constructor(props) {
        super(props);

        this.addGraphic = this.addGraphic.bind(this);
        this.closeGraphicFormModal = this.closeGraphicFormModal.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.doSave = this.doSave.bind(this);
        this.doComplete = this.doComplete.bind(this);
        this.showAddGraphicsForm = this.showAddGraphicsForm.bind(this);
        this.showScreenElements = this.showScreenElements.bind(this);

        this.state = {
            editMode: props.editMode,
            graphicRequest: props.graphicRequest,
            id: props.id,
            readOnly: props.editMode,
            reasons: [],
            seasons: [],
            showAddGraphicForm: false,
            showEditGraphicForm: false,
            showStoreSelect: false,
            stores: [],
            viewMode: props.viewMode
        };
    }

    componentDidMount() {
        FirebaseService.getData('stores/')
            .then(stores => {
                this.setState({
                    stores: stores
                })
            });

        FirebaseService.getData('seasons/')
            .then(data => {
                this.setState({
                    seasons: data
                });
            });

        FirebaseService.getData('reasons/')
            .then(data => {
                this.setState({
                    reasons: data
                });
            });
    }

    addGraphic = (graphic) => {
        const newGraphicRequest = DataService.addGraphic(this.state.graphicRequest, graphic);
        this.setState({graphicRequest: newGraphicRequest}, () => {
            this.closeGraphicFormModal();
        });
    };

    deleteGraphic = (graphicRequestId) => {
        const newGraphicRequest = DataService.deleteGraphic(this.state.graphicRequest, graphicRequestId);
        this.setState({graphicRequest: newGraphicRequest}, () => {
            this.closeGraphicFormModal();
        });
    };

    closeGraphicFormModal = () => {
        Utils.unblurBackground();
        this.setState({showAddGraphicForm: false, showEditGraphicForm: false});
    };

    doComplete = () => {
        const xmlMessage = EmailService.FormatGraphicRequestXML(this.state.graphicRequest);
        console.log(xmlMessage);

        this.setState({complete: true}, () => {
            this.doSave();
        })
    };

    doSave = () => {
        const newGraphicRequest = this.state.graphicRequest;

        if (this.state.complete) {
            newGraphicRequest.sentDate = new Date().toString();
            this.setState({complete: false});
        }

        if (this.state.editMode) {
            FirebaseService.updateGraphicRequest(this.state.id, newGraphicRequest);
        } else {
            newGraphicRequest.requestDate = new Date().toString();
            FirebaseService.writeGraphicRequest(newGraphicRequest);
        }

        this.onClose();
    };

    editDetails = () => {
        this.setState({readOnly: false, showStoreSelect: true});
    };

    onChange = (field) => {
        if (!this.state.readOnly) {
            if (field.isValid) {
                const newGraphicRequest = this.state.graphicRequest;

                if (field.id === 'storeNumber') {
                    newGraphicRequest.store = this.state.stores[field.value];
                } else {
                    newGraphicRequest[field.id] = field.value;
                }

                this.setState({graphicRequest: newGraphicRequest, [field.id + 'IsValid']: field.isValid}, () => {
                    this.showScreenElements();
                });
            }
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
                    labelText="Store"
                    onChange={this.onChange}
                    placeholder="Store"
                    readOnly={this.state.readOnly}
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

        const graphics = this.state.graphicRequest.store ?
            <div className="graphics-container">
                <div className="graphics">
                    <div className="section-header">
                        <span>Graphics</span>
                        {addButton}
                    </div>
                    {graphicsSummary}
                </div>
                {buttons}
            </div> : null;

        const contactName = this.state.readOnly || this.state.viewMode ?
            <div className="pseudo-field">{this.state.graphicRequest.contactName}</div> :
            <InputField
                focus={true}
                id="contactName"
                labelText="Contact Name"
                minLength={3}
                nameField={true}
                readOnly={false}
                onChange={this.onChange}
                placeholder="Contact Name"
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

        const contactButtons = !this.state.graphicRequest.store ? buttons : '';

        const mode = this.state.editMode ? 'Edit' : this.state.viewMode ? 'View' : 'New';

        return (
            <Modal
                center={true}
                classNames={{modal: 'custom-modal edit-modal ' + blur}}
                closeOnOverlayClick={false}
                onClose={this.onClose}
                onOpen={Utils.blurBackground()}
                open={this.props.open}
                showCloseIcon={false}
            >
                <div>
                    <header>
                        <h1>{mode} Graphic Request</h1>
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
