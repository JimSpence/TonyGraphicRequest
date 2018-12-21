import React from 'react';
import jsdom from 'jsdom';
import { shallow } from 'enzyme';
import EnzymeAdapter from '../../../test_helpers/EnzymeAdapter';
import TestUtils from '../../../test_helpers/TestUtils';
import ConfirmDialog from "../ConfirmDialog";

describe('"ConfirmDialog" Component', () => {
    const doc = jsdom.jsdom('<!doctype html><html><body><div id="root"></div><div id="stuff"></div></body></html>');
    global.document = doc;

    EnzymeAdapter.config();
    TestUtils.noConsoleErrors();

    const onClick = jest.fn();
    const onDelete = jest.fn();

    it ('Should be defined', () => {
        const confirmDialog = shallow(<ConfirmDialog onClose={onClick} onDelete={onDelete} open={true} />);
        expect (confirmDialog).toBeDefined();
    });

    it ('Should be defined', () => {
        const confirmDialog = shallow(<ConfirmDialog onClose={onClick} onDelete={onDelete} open={false} />);
        expect (confirmDialog).toBeDefined();
    });

    it ('Should match Snapshot', () => {
        const confirmDialog = shallow(<ConfirmDialog onClose={onClick} onDelete={onDelete} open={true} />);
        expect (confirmDialog).toMatchSnapshot();
    });

    // it ('Should render base button correctly', () => {
    //     const button = shallow(<Button className="btn" onClick={onClick} />);
    //     expect (button).toMatchSnapshot();
    // });
    //
    // it ('Should render "add" button correctly', () => {
    //     const addButton = shallow(<Button type="add" className="btn" onClick={onClick} />);
    //     expect (addButton).toMatchSnapshot();
    // });
    //
    // it ('Should render "cancel" button correctly', () => {
    //     const cancelButton = shallow(<Button type="cancel" className="btn" onClick={onClick} />);
    //     expect (cancelButton).toMatchSnapshot();
    // });
    //
    // it ('Should render "confirm" button correctly', () => {
    //     const confirmButton = shallow(<Button type="confirm" className="btn" onClick={onClick} />);
    //     expect (confirmButton).toMatchSnapshot();
    // });
    //
    // it ('Should render "delete" button correctly', () => {
    //     const deleteButton = shallow(<Button type="delete" className="btn" onClick={onClick} />);
    //     expect (deleteButton).toMatchSnapshot();
    // });
    //
    // it ('Should render "edit" button correctly', () => {
    //     const editButton = shallow(<Button type="edit" className="btn" onClick={onClick} />);
    //     expect (editButton).toMatchSnapshot();
    // });
    //
    // it ('Should render "save" button correctly', () => {
    //     const saveButton = shallow(<Button type="save" className="btn" onClick={onClick} />);
    //     expect (saveButton).toMatchSnapshot();
    // });
    //
    // it ('Should call "onClick" function when button is clicked', () => {
    //     const button = shallow(<Button className="btn" onClick={onClick} />);
    //     button.simulate('click');
    //     expect (onClick).toHaveBeenCalled();
    //     expect (onClick).toHaveBeenCalledTimes(1);
    // });
});
