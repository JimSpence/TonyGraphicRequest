import React from 'react';
import { shallow } from 'enzyme';
import EnzymeAdapter from "../../test_helpers/EnzymeAdapter";
import TestUtils from "../../test_helpers/TestUtils";
import Content from '../Content/Content';

describe ('<Content />', () => {
    EnzymeAdapter.config();
    TestUtils.noConsoleErrors();

    it ('Should be defined', () => {
        expect(Content).toBeDefined();
    });

    it ('Should render correctly', () => {
        expect(shallow(<Content/>)).toMatchSnapshot();
    });
});
