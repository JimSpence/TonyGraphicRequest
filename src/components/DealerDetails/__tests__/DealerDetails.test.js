import React from 'react';
import { shallow } from 'enzyme';
import EnzymeAdapter from "../../../test_helpers/EnzymeAdapter";
import TestUtils from '../../../test_helpers/TestUtils';
import DealerDetails from '../DealerDetails';

describe('"DealerDetails" component', () => {
    EnzymeAdapter.config();
    TestUtils.noConsoleErrors();

    const props = {
            dealer: {
                dealerNumber: 'XX9999',
                brandName: 'RANDOM BRAND',
                name: 'LETSBY AVENUE',
                email: 'dealer@email.address',
                phone: '020 999 8888'
            }
        };

    it ('Should be defined', () => {
        expect(DealerDetails).toBeDefined();
    });

    it ('Should render "StoreDetail" component correctly', () => {
        expect(shallow(<DealerDetails {...props} />)).toMatchSnapshot();
    });
});
