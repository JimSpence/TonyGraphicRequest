import React from 'react';
import { shallow } from 'enzyme';
import EnzymeAdapter from '../../../../test_helpers/EnzymeAdapter';
import TestUtils from '../../../../test_helpers/TestUtils';
import SummaryTable from "../SummaryTable";

describe('"SummaryTable" Component', () => {

    const props = TestUtils.populateGraphicRequests();
    props.onEdit = jest.fn();
    props.onView = jest.fn();
    props.onDelete = jest.fn();

    EnzymeAdapter.config();
    TestUtils.noConsoleErrors();

    const summaryTable = shallow(<SummaryTable {...props} />);

    afterEach(() => {
        props.onEdit.mockReset();
        props.onView.mockReset();
        props.onDelete.mockReset();
    });

    it ('Should be defined', () => {
        expect(summaryTable).toBeDefined();
    });

    it ('Should render correctly', () => {
        expect(summaryTable).toMatchSnapshot();
    });

    it ('Should not call a function from props when table header row clicked', () => {
        summaryTable.find('thead tr').simulate('click');
        expect(props.onEdit).not.toHaveBeenCalled();
        expect(props.onView).not.toHaveBeenCalled();
        expect(props.onDelete).not.toHaveBeenCalled();
    });

    it ('Should only call "onView" function for a completed request', () => {
        summaryTable.find('tbody tr[data-key="Request0004"]').simulate('click');
        expect(props.onView).toHaveBeenCalled();
        expect(props.onEdit).not.toHaveBeenCalled();
        expect(props.onDelete).not.toHaveBeenCalled();
    });

    it ('Should only call "onEdit" function for a non-completed request', () => {
        summaryTable.find('tbody tr[data-key="Request0001"]').simulate('click');
        expect(props.onEdit).toHaveBeenCalled();
        expect(props.onView).not.toHaveBeenCalled();
        expect(props.onDelete).not.toHaveBeenCalled();
    });

    it ('Should only call "onDelete" function when "delete" icon is clicked for a non-completed request', () => {
        summaryTable.find('tbody tr[data-key="Request0001"] td.delete').simulate('click');
        expect(props.onDelete).toHaveBeenCalled();
        expect(props.onView).not.toHaveBeenCalled();
        expect(props.onEdit).not.toHaveBeenCalled();
    });
});
