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
            expect(azureConfig.getDbHostUri()).toBe('https://graphic-requests.documents.azure.com');
        });
    });

    describe('"getDatabaseUri" tests', () => {
        it('Should return valid database uri', () => {
            expect(azureConfig.getCollectionsUri()).toBe('https://graphic-requests.documents.azure.com/dbs/graphicrequest');
        });
    });

    describe('"getCollectionsUri" tests', () => {
        it('Should return valid collections uri', () => {
            expect(azureConfig.getCollectionsUri()).toBe('https://graphic-requests.documents.azure.com/dbs/graphicrequest/colls');
        });
    });

    describe('"getCollection Uri" tests', () => {
        it('Should return valid collection uri', () => {
            expect(azureConfig.getCollectionUri('testCollection')).toBe('https://graphic-requests.documents.azure.com/dbs/graphicrequest/colls/testCollection');
        });
    });

    describe('"getDocuments Uri" tests', () => {
        it('Should return valid documents uri', () => {
            expect(azureConfig.getDocumentsUri('testCollection')).toBe('https://graphic-requests.documents.azure.com/dbs/graphicrequest/colls/testCollection/docs');
        });
    });

    describe('"getDocument Uri" tests', () => {
        it('Should return valid document uri', () => {
            expect(azureConfig.getDocumentUri('testCollection', 'randomDocument')).toBe('https://graphic-requests.documents.azure.com/dbs/graphicrequest/colls/testCollection/docs/randomDocument');
        });
    });
});
