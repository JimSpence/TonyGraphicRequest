import React from 'react';
import TestUtils from '../../test_helpers/TestUtils';
import AzureConfig from "../AzureConfig";

TestUtils.noConsoleErrors();

describe('"AzureConfig" tests', () => {
    const azureConfig = new AzureConfig();
    describe('"getAzureConfig" tests', () => {
        it('Should return azureConfig object', () => {
            expect(Object.keys(AzureConfig.getAzureConfig()).length).toBe(6);
            expect(AzureConfig.getAzureConfig()).toMatchSnapshot();
        });
    });

    describe('"getDbHostUri" tests', () => {
        it('Should return valid DB Host uri', () => {
            expect(azureConfig.getDbHostUri()).toBe('https://tyresdirect2u.documents.azure.com');
        });
    });

    describe('"getCollectionsUri" tests', () => {
        it('Should return valid collections uri', () => {
            expect(azureConfig.getCollectionsUri()).toBe('https://tyresdirect2u.documents.azure.com/dbs/dealerorders/colls');
        });
    });

    describe('"getCollection Uri" tests', () => {
        it('Should return valid collection uri', () => {
            expect(azureConfig.getCollectionUri('testCollection')).toBe('https://tyresdirect2u.documents.azure.com/dbs/dealerorders/colls/testCollection');
        });
    });

    describe('"getDocuments Uri" tests', () => {
        it('Should return valid documents uri', () => {
            expect(azureConfig.getDocumentsUri('testCollection')).toBe('https://tyresdirect2u.documents.azure.com/dbs/dealerorders/colls/testCollection/docs');
        });
    });

    describe('"getDocument Uri" tests', () => {
        it('Should return valid document uri', () => {
            expect(azureConfig.getDocumentUri('testCollection', 'randomDocument')).toBe('https://tyresdirect2u.documents.azure.com/dbs/dealerorders/colls/testCollection/docs/randomDocument');
        });
    });
});
