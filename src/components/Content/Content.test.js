import React from 'react';
import { shallow } from 'enzyme';
import EnzymeAdapter from "../../test_helpers/EnzymeAdapter";
import Content from '../Content/Content';

describe ('<Content />', () => {
    EnzymeAdapter.config();

    it ('Should be defined', () => {
        expect(Content).toBeDefined();
    });

    it ('Should render correctly', () => {
        expect(shallow(<Content/>)).toMatchSnapshot();
    });
});
