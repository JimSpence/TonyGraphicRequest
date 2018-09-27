import React from 'react';
import { shallow } from 'enzyme';
import EnzymeAdapter from '../../test_helpers/EnzymeAdapter';
import TestUtils from "../../test_helpers/TestUtils";
import PageHeader from '../PageHeader/PageHeader';

describe('"PageHeader" Component', () => {
    const props = {
        headerText: "Graphic Request"
    };

    EnzymeAdapter.config();
    TestUtils.noConsoleErrors();

    it ('Should be defined', () => {
        expect(PageHeader).toBeDefined();
    });

    it ('Should render correctly', () => {
        expect(shallow(<PageHeader {...props}/>)).toMatchSnapshot();
    });
});
