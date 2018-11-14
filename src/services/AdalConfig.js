import { AuthenticationContext } from 'react-adal';

export const adalConfig = {
    tenant: 'f87af88f-a9b1-44c6-8989-077d72671e16',
    subscriptionId: '81a7982f-d4fa-4358-b267-801e1106b683',
    clientId: 'eb03585e-9774-42b7-9719-c30dd1a09141',
    postLogoutRedirectUri: window.location.origin,
    cacheLocation: 'localStorage'
};

export const authenticationContext = new AuthenticationContext(adalConfig);