import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import Button from "../Button/Button";
import Utils from '../../services/Utils'
import GraphicsSummary from "../GraphicsSummary/GraphicsSummary";
import './ConfirmDialog.css';

export default class ConfirmDialog extends Component {
    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    onClose = () => {
        Utils.unblurBackground();
        this.props.onClose('confirmModal');
    };

    onConfirm = () => {
        Utils.unblurBackground();
        this.props.onDelete();
    };

    render() {
        const confirmDetails = this.props.graphicRequest && this.props.graphicRequest.graphics ?
            <div>
                <div>Do you really want to delete this Graphic Request?</div>
                <label>Graphics</label>
                <GraphicsSummary graphics={this.props.graphicRequest.graphics} />
            </div>
            : <div>Do you really want to delete this Graphic?</div>;

        return (
            <Modal
                center={true}
                classNames={{modal: 'custom-modal'}}
                closeOnOverlayClick={false}
                onClose={this.onClose}
                onOpen={Utils.blurBackground()}
                open={this.props.open}
                showCloseIcon={false}
            >
                <div id="confirmDialog">
                    <header>
                        <h1>Confirm delete</h1>
                    </header>
                    <div className="modal-body">
                        {confirmDetails}
                    </div>
                    <footer className="modal-buttons">
                        <Button
                            text="No"
                            type="cancel"
                            className="btn secondary-outline"
                            onClick={this.onClose}
                        />
                        <Button
                            text="Yes"
                            type="confirm"
                            className="btn primary"
                            onClick={this.onConfirm}
                        />
                    </footer>
                </div>
            </Modal>
        );
    };
}
