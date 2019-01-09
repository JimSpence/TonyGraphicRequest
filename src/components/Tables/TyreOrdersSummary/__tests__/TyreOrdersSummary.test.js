import React from 'react';
import { shallow } from 'enzyme';
import EnzymeAdapter from '../../../../test_helpers/EnzymeAdapter';
import TestUtils from '../../../../test_helpers/TestUtils';
import TyreOrdersSummary from "../TyreOrdersSummary";

describe('"TyreOrdersSummary" Component', () => {

    const props = {
        tyreOrders: {
            tyreOrder0001: {
                reason: 'JUST BECAUSE',
                qty: 99
            },
            tyreOrder0002: {
                reason: 'I SAID SO',
                qty: 66
            }
        },
        onEdit: jest.fn()
    };

    EnzymeAdapter.config();
    TestUtils.noConsoleErrors();

    const tyreOrdersSummary = shallow(<TyreOrdersSummary {...props} />);

    it ('Should be defined', () => {
        expect(TyreOrdersSummary).toBeDefined();
    });

    it ('Should render correctly', () => {
        expect(tyreOrdersSummary).toMatchSnapshot();
    });

    it ('Should not call "onEdit" function from props when table header row clicked', () => {
        tyreOrdersSummary.find('thead tr').simulate('click');
        expect(props.onEdit).not.toHaveBeenCalled();
    });

    it ('Should call "onEdit" function from props when table body row clicked', () => {
        tyreOrdersSummary.find('tbody tr').first().simulate('click');
        expect(props.onEdit).toHaveBeenCalled();
    });
});
