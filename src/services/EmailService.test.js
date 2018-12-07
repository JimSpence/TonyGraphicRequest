import React from 'react';
import sinon from 'sinon';
import TestUtils from '../test_helpers/TestUtils';
import EmailService from "./EmailService";

describe('"EmailService" Service', () => {
    TestUtils.noConsoleErrors();

    describe('"FormatGraphicRequestXML" tests', () => {
        it('Should format Graphic Request as XML', () => {
            expect(EmailService.FormatGraphicRequestXML(TestUtils.graphicRequestForEmail())).toEqual(TestUtils.graphicRequestEmailXml());
        });
    });

    describe('"sendEmail" tests', () => {
        it('Should call "fetch" to send email',() => {
            sinon.stub(fetch, 'Promise').returns('Yo bro');
            expect(EmailService.sendEmail('You are fab')).toEqaul('Alwite numpty');
        });
    })
});
