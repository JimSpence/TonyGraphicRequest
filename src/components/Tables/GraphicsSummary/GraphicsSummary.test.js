import React from 'react';
import { shallow } from 'enzyme';
import EnzymeAdapter from '../../../test_helpers/EnzymeAdapter';
import TestUtils from '../../../test_helpers/TestUtils';
import GraphicsSummary from "./GraphicsSummary";

describe('"GraphicsSummary" Component', () => {

    const props = {
        graphics: {
            graphic0001: {
                reason: 'JUST BECAUSE',
                qty: 99
            },
            graphic0002: {
                reason: 'I SAID SO',
                qty: 66
            }
        },
        onEdit: jest.fn()
    };

    EnzymeAdapter.config();
    TestUtils.noConsoleErrors();

    const graphicsSummary = shallow(<GraphicsSummary {...props} />);

    it ('Should be defined', () => {
        expect(GraphicsSummary).toBeDefined();
    });

    it ('Should render correctly', () => {
        expect(graphicsSummary).toMatchSnapshot();
    });

    it ('Should not call "onEdit" function from props when table header row clicked', () => {
        graphicsSummary.find('thead tr').simulate('click');
        expect(props.onEdit).not.toHaveBeenCalled();
    });

    it ('Should call "onEdit" function from props when table body row clicked', () => {
        graphicsSummary.find('tbody tr').first().simulate('click');
        expect(props.onEdit).toHaveBeenCalled();
    });
});
