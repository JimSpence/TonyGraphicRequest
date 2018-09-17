import React, {Component} from 'react';
import FirebaseService from "../../services/FirebaseService";
import Modal from 'react-responsive-modal';
import Utils from '../../services/Utils'
import Button from "../Button/Button";
import GraphicsSummary from "../GraphicsSummary/GraphicsSummary";
import StoreDetails from "../StoreDetails/StoreDetails";
import './ViewModal.css';

export default class ViewModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            graphicRequest: null
        };

        this.onClose = this.onClose.bind(this);
    }

    componentDidMount() {
        FirebaseService.getGraphicRequests(this.props.graphicRequest)
            .then((data) => {
                this.setState({graphicRequest: data});
                console.log(this.state);
            });
    }

    onClose = () => {
        Utils.unblurBackground();
        this.props.onClose('viewModal');
    };

    render() {
        const {graphicRequest} = this.state;

        if (!graphicRequest) {
            return <div>Data loading...</div>;
        } else {
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
                    <div id="viewModal">
                        <header>
                            <h1>Graphic Request Details</h1>
                        </header>
                        <div className="modal-body">
                            <div className="contact-details">
                                <div className="input-group">
                                    <label>Contact Name</label>
                                    <input type="text" readOnly={true} value={graphicRequest.contactName} />
                                </div>
                                <StoreDetails store={graphicRequest.store} label="Store Details" />
                            </div>
                            <div className="graphics">
                                <GraphicsSummary graphics={graphicRequest.graphics}/>
                            </div>
                        </div>
                        <footer className="modal-buttons">
                            <Button
                                text="Close"
                                className="btn primary deny"
                                onClick={this.onClose}
                            />
                        </footer>
                    </div>
                </Modal>
            );
        }
    }
}
