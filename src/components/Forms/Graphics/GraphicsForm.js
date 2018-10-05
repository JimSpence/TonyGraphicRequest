import React, {Component} from 'react';
import classnames from 'classnames';
import Utils from '../../../services/Utils'
import Modal from 'react-responsive-modal';
import Button from "../../FormElements/Button/Button";
import Select from "../../FormElements/Select/Select";
import InputField from "../../FormElements/InputField/InputField";
import TextField from "../../FormElements/InputField/TextField";
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog";
import './GraphicsForm.css';

export default class GraphicsForm extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onClose = this.onClose.bind(this);
        this.doSave = this.doSave.bind(this);

        this.state = {
            graphic: props.graphic || {},
            graphicId: props.graphicId,
            editMode: props.graphicId && props.graphicId.length > 0,
            show: props.open,
            showConfirmDialog: false
        };
    }

    doSave = () => {
        this.props.onSave(this.state.graphic);
    };

    doDelete = () => {
        this.props.onDelete(this.state.graphicId);
    };

    onChange = (field) => {
        if (field.isValid) {
            const newGraphic = this.state.graphic;
            newGraphic[field.id] = field.value;
            this.setState({graphic: newGraphic, [field.id + 'IsValid']: field.isValid});
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
                            <InputField
                                autoFocus={true}
                                id="jobCategory"
                                maxLength={2}
                                minLength={2}
                                onChange={this.onChange}
                                readOnly={this.state.editMode}
                                title="Job Category"
                                type="alphaOnly"
                                uppercase={true}
                                value={this.state.graphic.jobCategory}
                            />
                            <InputField
                                id="jobNumber"
                                maxLength={5}
                                minLength={1}
                                onChange={this.onChange}
                                readOnly={this.state.editMode}
                                title="Job Number"
                                type="number"
                                value={this.state.graphic.jobNumber}
                                zeroPad={true}
                            />
                        </div>
                        <div className="row">
                            <Select
                                data={this.props.seasons}
                                id="season"
                                labelText="Season"
                                onChange={this.onChange}
                                placeholder="Season"
                                readOnly={this.state.editMode}
                                value={this.state.graphic.season}
                            />
                            <InputField
                                id="artworkNumber"
                                maxLength={4}
                                minLength={1}
                                onChange={this.onChange}
                                placeholder="Artwork Number"
                                readOnly={this.state.editMode}
                                title="Artwork Number"
                                type="number"
                                value={this.state.graphic.artworkNumber}
                                zeroPad={true}
                            />
                        </div>
                        <div className="row">
                            <Select
                                data={this.props.reasons}
                                id="reason"
                                labelText="Reason"
                                onChange={this.onChange}
                                placeholder="Reason"
                                value={this.state.graphic.reason}
                            />

                            <InputField
                                id="quantity"
                                maxLength={3}
                                minLength={1}
                                numeric={true}
                                onChange={this.onChange}
                                placeholder="Quantity"
                                title="Quantity"
                                type="number"
                                value={this.state.graphic.quantity}
                            />
                            <TextField
                                id="tonyTestText"
                                title="Tony Test Text"
                                minLength={3}
                                capitalise={true}
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
                            text="Save"
                            type="save"
                            className="btn primary"
                            onClick={this.doSave}
                        />
                    </footer>
                    <ConfirmDialog open={this.state.showConfirmDialog} onClose={this.closeConfirmDialog} onDelete={this.doDelete}/>
                </div>
            </Modal>
        );
    };
}
