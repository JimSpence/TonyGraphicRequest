import React, {Component} from 'react';
import PropTypes from 'prop-types';
import arcadiaLogo from '../../images/arcadia-logo.png';
import AuthenticationService from "../../services/AuthenticationService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faUserAlt} from "@fortawesome/free-solid-svg-icons";
import './PageHeader.css';

export default class PageHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userDetails: null,
            showUserDetails: false
        }
    }

    static propTypes = {
        headerText: PropTypes.string.isRequired
    };

    componentDidMount() {
        const authenticationService = new AuthenticationService();
        authenticationService.getToken()
            .then((token) => {
                authenticationService.getUserDetail(token)
                    .then((userDetails) => {
                        return this.setState({userDetails: userDetails})
                    })
                    .then(() => {
                        authenticationService.getUserPhoto(token)
                            .then((userPhoto) => {
                                this.setState({userPhoto: userPhoto});
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    });
            });
    };

    toggleUserDetails = () => {
        this.setState({showUserDetails: !this.state.showUserDetails});
    };

    render() {
        const authenticationService = new AuthenticationService();
        const userPhoto = this.state.userPhoto ? <FontAwesomeIcon icon={faUser} /> : <FontAwesomeIcon icon={faUserAlt} />;
        const displayName = this.state.userDetails && this.state.userDetails.displayName ? this.state.userDetails.displayName : null;
        const show = this.state.showUserDetails ? 'show' : '';

        return (
            <header>
                <img src={arcadiaLogo} className="arcadia-logo" alt="arcadia-logo.png" title="Arcadia logo" />
                <h1>{this.props.headerText}</h1>
                <div className="content-right">
                    <div className="user-photo" onClick={this.toggleUserDetails} title={displayName}>{userPhoto}</div>
                    <div className={"user-details " + show}>
                        {displayName}
                        <div><a className="sign-out" onClick={authenticationService.logOut}>Sign out</a></div>
                    </div>
                </div>
            </header>
        );
    }
}