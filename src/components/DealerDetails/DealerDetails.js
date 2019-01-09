import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './DealerDetails.css';

export default class DealerDetails extends Component {
    static propTypes = {
        dealer: PropTypes.object.isRequired
    };

    render() {
        const {dealer} = this.props;

        return (
            <div className="dealer-details">
                <div id="dealerNumber">{dealer.storeNumber}</div>
                <div id="brandName">{dealer.brandName}</div>
                <div id="dealerName">{dealer.name}</div>
                <div className="margin-top-5">
                    <div id="dealerEmail"><span className="icon mail" />{dealer.email}</div>
                    <div id="dealerPhone"><span className="icon phone" />{dealer.phone}</div>
                </div>
            </div>
        );
    }
}
