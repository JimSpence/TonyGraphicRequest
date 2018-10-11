import React from 'react';
import TestUtils from '../test_helpers/TestUtils';
import EmailService from "./EmailService";

describe('"EmailService" Service', () => {
    TestUtils.noConsoleErrors();

    describe('"FormatGraphicRequestXML" tests', () => {
        it('Should format Graphic Request as XML', () => {
            expect(EmailService.FormatGraphicRequestXML(TestUtils.graphicRequestForEmail())).toEqual(TestUtils.graphicRequestEmailXml());
        });
    });
});
