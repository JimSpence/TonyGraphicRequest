import React from 'react';
import { shallow } from 'enzyme';
import EnzymeAdapter from "../../test_helpers/EnzymeAdapter";
import StoreDetails from '../StoreDetails/StoreDetails';

describe('"StoreDetails" component', () => {
    EnzymeAdapter.config();

    const props = {
            store: {
                storeNumber: 'XX9999',
                brandName: 'RANDOM BRAND',
                name: 'LETSBY AVENUE',
                email: 'store@email.address',
                phone: '020 999 8888'
            }
        };

    it ('Should be defined', () => {
        expect(StoreDetails).toBeDefined();
    });

    it ('Should render "StoreDetail" component correctly', () => {
        expect(shallow(<StoreDetails {...props} />)).toMatchSnapshot();
    });
});
