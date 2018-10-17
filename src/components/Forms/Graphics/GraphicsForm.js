import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Utils from '../../../services/Utils'
import Modal from 'react-responsive-modal';
import Button from "../../FormElements/Button/Button";
import Select from "../../FormElements/Select/Select";
import TextField from "../../FormElements/InputField/TextField";
import NumberField from "../../FormElements/InputField/NumberField";
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog";
import './GraphicsForm.css';

export default class GraphicsForm extends Component {
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
            graphic: props.graphic || {},
            graphicId: props.graphicId,
            editMode: props.graphicId && props.graphicId.length > 0,
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
        graphicId: PropTypes.string,
        graphic: PropTypes.object,
        onDelete: PropTypes.func
    };

    doSave = () => {
        this.props.onSave(this.state.graphic);
    };

    doDelete = () => {
        this.props.onDelete(this.state.graphicId);
    };

    onChange = (field) => {
        const disableSaveButton = this.state.editMode ? document.getElementsByClassName('invalid').length > 0 : document.getElementsByClassName('valid').length < 6;

        if (field.isValid) {
            const newGraphic = JSON.parse(JSON.stringify(this.state.graphic));
            newGraphic[field.id] = field.value;

            this.setState({graphic: newGraphic, disableSaveButton: disableSaveButton});
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
            'Edit Graphic - ' + this.state.graphicId : 'New Graphic';

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
                    <div id="graphicsForm" className="modal-body">
                        <div className="row">
                            <TextField
                                alphaOnly={true}
                                autoFocus={true}
                                id="jobCategory"
                                maxLength={2}
                                minLength={2}
                                onChange={this.onChange}
                                readOnly={this.state.editMode}
                                title="Job Category"
                                uppercase={true}
                                value={this.state.graphic.jobCategory}
                            />
                            <NumberField
                                id="jobNumber"
                                maxLength={5}
                                minLength={1}
                                onChange={this.onChange}
                                readOnly={this.state.editMode}
                                title="Job Number"
                                value={this.state.graphic.jobNumber}
                                zeroPad={true}
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
                                value={this.state.graphic.season}
                            />
                            <NumberField
                                id="artworkNumber"
                                maxLength={4}
                                minLength={1}
                                onChange={this.onChange}
                                placeholder="Artwork Number"
                                readOnly={this.state.editMode}
                                title="Artwork Number"
                                value={this.state.graphic.artworkNumber}
                                zeroPad={true}
                            />
                        </div>
                        <div className="row">
                            <Select
                                data={this.props.reasons}
                                id="reason"
                                onChange={this.onChange}
                                placeholder="Reason"
                                title="Reason"
                                value={this.state.graphic.reason}
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
                                value={this.state.graphic.quantity}
                            />
                        </div>
                    </div>
                    <footer className="modal-buttons">
                        <Button
                            text="Cancel"
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
                            type="save"
                        />
                    </footer>
                    <ConfirmDialog open={this.state.showConfirmDialog} onClose={this.closeConfirmDialog} onDelete={this.doDelete}/>
                </div>
            </Modal>
        );
    };
}
