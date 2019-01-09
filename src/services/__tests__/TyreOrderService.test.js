import React from 'react';
import TestUtils from '../../test_helpers/TestUtils';
import TyreOrderService from "../TyreOrderService";

describe('"TyreOrderService" Service', () => {
    TestUtils.noConsoleErrors();

    describe('"Generate Tyre Order Id" tests', () => {
        it('Should generate Tyre Order Id from Dealer Order', () => {
            // const dealerOrder = TestUtils.dealerOrderForEmail();
            const tyreOrder = {
                tyreWidth: '155',
                tyreProfile: '55',
                tyreRimSize: '15',
                tyreSpeedRating: 'U',
                vehicleMake: 'DC',
                quantity: '99',
                reason: 'Another Reason',
                season: 'XX'
            };
            expect(TyreOrderService.generateTyreOrderId(tyreOrder)).toEqual('DC*155*55*R15U*XX19');
        });

        it('Should generate Tyre Order Id from Dealer Order using year when passed', () => {
            // const dealerOrder = TestUtils.dealerOrderForEmail();
            const tyreOrder = {
                tyreWidth: '165',
                tyreProfile: '65',
                tyreRimSize: '16',
                tyreSpeedRating: 'V',
                vehicleMake: 'BM',
                quantity: '22',
                reason: 'Yet Another Reason',
                season: 'AA'
            };
            expect(TyreOrderService.generateTyreOrderId(tyreOrder, 15)).toEqual('BM*165*65*R16V*AA15');
        });
    });
});
