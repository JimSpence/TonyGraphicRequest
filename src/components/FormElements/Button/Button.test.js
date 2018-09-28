import React from 'react';
import { shallow } from 'enzyme';
import EnzymeAdapter from '../../../test_helpers/EnzymeAdapter';
import TestUtils from '../../../test_helpers/TestUtils';
import Button from "./Button";

describe('"Button" Component', () => {

    EnzymeAdapter.config();
    TestUtils.noConsoleErrors();

    const onClick = jest.fn();

    it ('Should be defined', () => {
        const button = shallow(<Button className="btn" onClick={onClick} />);
        expect (button).toBeDefined();
    });

    it ('Should render base correctly', () => {
        const button = shallow(<Button className="btn" onClick={onClick} />);
        expect (button).toMatchSnapshot();
    });

    it ('Should render "add" button correctly', () => {
        const addButton = shallow(<Button type="add" className="btn" onClick={onClick} />);
        expect (addButton).toMatchSnapshot();
    });

    it ('Should render "cancel" button correctly', () => {
        const cancelButton = shallow(<Button type="cancel" className="btn" onClick={onClick} />);
        expect (cancelButton).toMatchSnapshot();
    });

    it ('Should render "confirm" button correctly', () => {
        const confirmButton = shallow(<Button type="confirm" className="btn" onClick={onClick} />);
        expect (confirmButton).toMatchSnapshot();
    });

    it ('Should render "delete" button correctly', () => {
        const deleteButton = shallow(<Button type="delete" className="btn" onClick={onClick} />);
        expect (deleteButton).toMatchSnapshot();
    });

    it ('Should render "edit" button correctly', () => {
        const editButton = shallow(<Button type="edit" className="btn" onClick={onClick} />);
        expect (editButton).toMatchSnapshot();
    });

    it ('Should render "save" button correctly', () => {
        const saveButton = shallow(<Button type="save" className="btn" onClick={onClick} />);
        expect (saveButton).toMatchSnapshot();
    });

    it ('Should call "onClick" function when button is clicked', () => {
        const button = shallow(<Button className="btn" onClick={onClick} />);
        button.simulate('click');
        expect (onClick).toHaveBeenCalled();
        expect (onClick).toHaveBeenCalledTimes(1);
    });
});
