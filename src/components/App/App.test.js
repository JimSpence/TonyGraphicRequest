import React from 'react';
import { shallow } from 'enzyme';
import EnzymeAdapter from "../../test_helpers/EnzymeAdapter";
import TestUtils from "../../test_helpers/TestUtils";
import App from './App';

describe ('"App" Component', () => {
    EnzymeAdapter.config();
    TestUtils.noConsoleErrors();

    it ('Should be defined', () => {
        expect(App).toBeDefined();
    });

    it ('Should render correctly', () => {
        expect(shallow(<App/>)).toMatchSnapshot();
    });
});
