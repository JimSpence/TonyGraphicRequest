import React from 'react';
import { shallow } from 'enzyme';
import EnzymeAdapter from '../../test_helpers/EnzymeAdapter';
import PageHeader from '../PageHeader/PageHeader';

describe('"PageHeader" Component', () => {
    EnzymeAdapter.config();

    it ('Should be defined', () => {
        expect(PageHeader).toBeDefined();
    });

    it ('Should render correctly', () => {
        expect(shallow(<PageHeader headerText="Graphic Request"/>)).toMatchSnapshot();
    });
});
