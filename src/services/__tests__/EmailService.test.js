import React from 'react';
import sinon from 'sinon';
import TestUtils from '../../test_helpers/TestUtils';
import EmailService from "../EmailService";

describe('"EmailService" Service', () => {
    TestUtils.noConsoleErrors();

    describe('"FormatDealerOrderXML" tests', () => {
        it('Should format Dealer Order as XML', () => {
            expect(EmailService.FormatDealerOrderXML(TestUtils.dealerOrderForEmail())).toEqual(TestUtils.dealerOrderEmailXml());
        });
    });

    // describe('"sendEmail" tests', () => {
    //     it('Should call "fetch" to send email',() => {
    //         sinon.stub(fetch, 'Promise').returns('Yo bro');
    //         expect(EmailService.sendEmail('You are fab')).toEqaul('Alwite numpty');
    //     });
    // })
});
