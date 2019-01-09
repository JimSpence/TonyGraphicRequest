import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Utils from '../../../helpers/Utils'
import Modal from 'react-responsive-modal';
import Button from "../../FormElements/Button/Button";
import Select from "../../FormElements/Select/Select";
import TextField from "../../FormElements/InputField/TextField";
import NumberField from "../../FormElements/InputField/NumberField";
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog";
import './TyreOrdersForm.css';

export default class TyreOrdersForm extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onClose = this.onClose.bind(this);
        this.doDelete = this.doDelete.bind(this);
        this.doSave = this.doSave.bind(this);

        this.showConfirmDialog = this.showConfirmDialog.bind(this);
        this.closeConfirmDialog = this.closeConfirmDialog.bind(this);

        this.state = {
            disableSaveButton: true,
            tyreOrder: props.tyreOrder || {},
            tyreOrderId: props.tyreOrderId,
            editMode: props.tyreOrderId && props.tyreOrderId.length > 0,
            show: props.open,
            showConfirmDialog: false,
            savedProps: props
        };
    }

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        onSave: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        reasons: PropTypes.object.isRequired,
        seasons: PropTypes.object.isRequired,
        vehicleMakes: PropTypes.object.isRequired,
        tyreOrderId: PropTypes.string,
        tyreOrder: PropTypes.object,
        onDelete: PropTypes.func
    };

    doSave = () => {
        this.props.onSave(this.state.tyreOrder);
    };

    doDelete = () => {
        this.props.onDelete(this.state.tyreOrderId);
    };

    onChange = (field) => {
        const disableSaveButton = this.state.editMode ? document.getElementsByClassName('invalid').length > 0 : document.getElementsByClassName('valid').length < 6;

        if (field.isValid) {
            const newTyreOrder = JSON.parse(JSON.stringify(this.state.tyreOrder));
            newTyreOrder[field.id] = field.value;

            this.setState({tyreOrder: newTyreOrder, disableSaveButton: disableSaveButton});
        } else {
            this.setState({disableSaveButton: true});
        }
    };

    onClose = () => {
        this.props.onClose();
    };

    showConfirmDialog = () => {
        this.setState({showConfirmDialog: true});
    };

    closeConfirmDialog = () => {
        this.setState({showConfirmDialog: false});
    };

    render() {
        const headerText = this.state.editMode ?
            'Edit Tyre Order - ' + this.state.tyreOrderId : 'New Tyre Order';

        const deleteButton = this.state.editMode ?
            <Button
                text="Delete"
                type="delete"
                className="btn secondary"
                onClick={this.showConfirmDialog}
            /> : null;

        const blur = classnames({
            blur5: this.state.showConfirmDialog
        });

        return (
            <Modal
                center={true}
                classNames={{modal: 'custom-modal ' + blur}}
                closeOnOverlayClick={false}
                onClose={this.props.onClose}
                onOpen={Utils.blurBackground()}
                open={this.state.show}
                showCloseIcon={false}
            >
                <div>
                    <header>
                        <h1>{headerText}</h1>
                    </header>
                    <div id="tyreOrdersForm" className="modal-body">
                        <div className="row">
                            <NumberField
                                id="tyreWidth"
                                maxLength={3}
                                minLength={3}
                                minValue={100}
                                onChange={this.onChange}
                                readOnly={this.state.editMode}
                                title="Tyre Width (mm)"
                                value={this.state.tyreOrder.tyreWidth}
                            />
                            <NumberField
                                id="tyreProfile"
                                maxLength={2}
                                minLength={2}
                                onChange={this.onChange}
                                readOnly={this.state.editMode}
                                title="Tyre Profile (mm)"
                                value={this.state.tyreOrder.tyreProfile}
                            />
                        </div>
                        <div className="row">
                            <NumberField
                                id="tyreRimSize"
                                maxLength={2}
                                minLength={2}
                                minValue={10}
                                onChange={this.onChange}
                                readOnly={this.state.editMode}
                                title="Rim Size (in)"
                                value={this.state.tyreOrder.rimSize}
                            />
                            <TextField
                                alphaOnly={true}
                                autoFocus={true}
                                id="tyreSpeedRating"
                                maxLength={1}
                                minLength={1}
                                onChange={this.onChange}
                                readOnly={this.state.editMode}
                                title="Speed Rating"
                                uppercase={true}
                                value={this.state.tyreOrder.tyreSpeedRating}
                            />
                        </div>
                        <div className="row">
                            <Select
                                data={this.props.seasons}
                                id="season"
                                onChange={this.onChange}
                                placeholder="Season"
                                readOnly={this.state.editMode}
                                title="Season"
                                value={this.state.tyreOrder.season}
                            />
                            <Select
                                data={this.props.vehicleMakes}
                                id="vehicleMake"
                                onChange={this.onChange}
                                placeholder="Vehicle Make"
                                readOnly={this.state.editMode}
                                title="Vehicle Make"
                                value={this.state.tyreOrder.vehicleMake}
                            />
                        </div>
                        <div className="row">
                            <Select
                                data={this.props.reasons}
                                id="reason"
                                onChange={this.onChange}
                                placeholder="Reason"
                                title="Reason"
                                value={this.state.tyreOrder.reason}
                            />
                            <NumberField
                                id="quantity"
                                maxLength={3}
                                minLength={1}
                                minValue={1}
                                numeric={true}
                                onChange={this.onChange}
                                placeholder="Quantity"
                                title="Quantity"
                                value={this.state.tyreOrder.quantity}
                            />
                        </div>
                    </div>
                    <footer className="modal-buttons">
                        <Button
                            text="Cancel"
                            title="Cancel Tyre Order"
                            type="cancel"
                            className="btn secondary-outline"
                            onClick={this.onClose}
                        />
                        {deleteButton}
                        <Button
                            className="btn primary"
                            disabled={this.state.disableSaveButton}
                            onClick={this.doSave}
                            text="Save"
                            title="Save Tyre Order"
                            type="save"
                        />
                    </footer>
                    <ConfirmDialog open={this.state.showConfirmDialog} onClose={this.closeConfirmDialog} onDelete={this.doDelete}/>
                </div>
            </Modal>
        );
    };
}
