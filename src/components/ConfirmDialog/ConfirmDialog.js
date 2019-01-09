import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import Button from "../FormElements/Button/Button";
import Utils from '../../helpers/Utils'
import TyreOrdersSummary from "../Tables/TyreOrdersSummary/TyreOrdersSummary";
import './ConfirmDialog.css';

export default class ConfirmDialog extends Component {
    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    static propTypes = {
        dealerOrder: PropTypes.object,
        onClose: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
    };

    onClose = () => {
        Utils.unblurBackground();
        this.props.onClose('confirmModal');
    };

    onConfirm = () => {
        Utils.unblurBackground();
        this.props.onDelete();
    };

    render() {
        const confirmDetails = this.props.dealerOrder && this.props.dealerOrder.tyreOrders ?
            <div>
                <div>Do you really want to delete this Dealer Order?</div>
                <label>Tyre Orders</label>
                <TyreOrdersSummary tyreOrders={this.props.dealerOrder.tyreOrders} />
            </div>
            : <div>Do you really want to delete this Tyre Order?</div>;

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
                            title="Cancel Delete"
                            type="cancel"
                            className="btn secondary-outline"
                            onClick={this.onClose}
                        />
                        <Button
                            text="Yes"
                            type="confirm"
                            title="Confirm Delete"
                            className="btn primary"
                            onClick={this.onConfirm}
                        />
                    </footer>
                </div>
            </Modal>
        );
    };
}
