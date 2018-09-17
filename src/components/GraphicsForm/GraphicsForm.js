import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import Button from "../Button/Button";
import Select from "../Select/Select";
import InputField from "../InputField/InputField";
import Utils from '../../services/Utils'
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
            show: props.open
        };
    }

    doSave = () => {
        this.props.onSave(this.state.graphic);
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

    doDelete = () => {
        this.props.onDelete(this.state.graphicId);
    };

    render() {
        const headerText = this.state.editMode ?
            'Edit Graphic - ' + this.state.graphicId : 'New Graphic';

        const deleteButton = this.state.editMode ?
            <Button
                text="Delete"
                type="delete"
                className="btn secondary"
                onClick={this.doDelete}
            /> : null;

        return (
            <Modal
                center={true}
                classNames={{modal: 'custom-modal'}}
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
                                focus={true}
                                id="jobCategory"
                                labelText="Job Category"
                                lettersOnly={true}
                                maxLength={2}
                                minLength={2}
                                onChange={this.onChange}
                                placeholder="Job Category"
                                readOnly={this.state.editMode}
                                uppercase={true}
                                value={this.state.graphic.jobCategory}
                            />
                            <InputField
                                id="jobNumber"
                                labelText="Job Number"
                                maxLength={5}
                                minLength={1}
                                numeric={true}
                                onChange={this.onChange}
                                placeholder="Job Number"
                                readOnly={this.state.editMode}
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
                                labelText="Artwork Number"
                                maxLength={4}
                                minLength={1}
                                numeric={true}
                                onChange={this.onChange}
                                placeholder="Artwork Number"
                                readOnly={this.state.editMode}
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
                                labelText="Quantity"
                                maxLength={3}
                                minLength={1}
                                numeric={true}
                                onChange={this.onChange}
                                placeholder="Quantity"
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
                            text="Save"
                            type="save"
                            className="btn primary"
                            onClick={this.doSave}
                        />
                    </footer>
                </div>
            </Modal>
        );
    };
}
