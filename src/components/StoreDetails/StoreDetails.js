import React, {Component} from 'react';
import './StoreDetails.css';

export default class StoreDetails extends Component {
    render() {
        const store = this.props.store;

        const label = this.props.label ?
            <label>{this.props.label}</label> : null;

        return (
            <div className="store-details">
                {label}
                <div className="input-group">
                    <div>{store.storeNumber}</div>
                    <div>{store.brandName}</div>
                    <div>{store.name}</div>
                    <div className="margin-top-5">
                        <div><span className="icon mail" />{store.email}</div>
                        <div><span className="icon phone" />{store.phone}</div>
                    </div>
                </div>
            </div>
        );
    }
}
