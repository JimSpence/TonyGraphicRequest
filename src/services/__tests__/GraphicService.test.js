import React from 'react';
import TestUtils from '../../test_helpers/TestUtils';
import GraphicService from "../GraphicService";

describe('"GraphicService" Service', () => {
    TestUtils.noConsoleErrors();

    describe('"Generate Graphic Id" tests', () => {
        it('Should generate Graphic Id from Graphic Request', () => {
            const graphicRequest = TestUtils.graphicRequestForEmail();
            const graphic = {
                artworkNumber: '9876',
                jobCategory: 'EE',
                jobNumber: '12345',
                quantity: '99',
                reason: 'Another Reason',
                season: 'XX'
            };
            expect(GraphicService.generateGraphicId(graphicRequest, graphic)).toEqual('MMEE12345XX189876');
        });

        it('Should generate Graphic Id from Graphic Request using year when passed', () => {
            const graphicRequest = TestUtils.graphicRequestForEmail();
            const graphic = {
                artworkNumber: '1234',
                jobCategory: 'WW',
                jobNumber: '98765',
                quantity: '22',
                reason: 'Yet Another Reason',
                season: 'AA'
            };
            expect(GraphicService.generateGraphicId(graphicRequest, graphic, 15)).toEqual('MMWW98765AA151234');
        });
    });
});
