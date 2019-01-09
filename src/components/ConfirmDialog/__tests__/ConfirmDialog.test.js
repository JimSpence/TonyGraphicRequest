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
});
