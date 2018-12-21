import React from 'react';
import {shallow, mount} from 'enzyme';
import EnzymeAdapter from '../../../../test_helpers/EnzymeAdapter';
import jsdom from 'jsdom';
import TestUtils from '../../../../test_helpers/TestUtils';
import TextField from "../TextField";

describe('"TextField" Component', () => {

    const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.document = doc;
    global.window = doc.defaultView;

    EnzymeAdapter.config();
    TestUtils.noConsoleErrors();

    const fieldTypes = TestUtils.fieldTypes();

    it('Should render base "text" field correctly', () => {
        const component = shallow(<TextField {...fieldTypes.baseTextField} />);
        expect(component).toMatchSnapshot();
    });

    it('Should not call "onChange" for "readOnly" field', () => {
        const component = mount(<TextField {...fieldTypes.readOnlyOnChangeTextField} />);
        const inputField = component.find('input');

        inputField.simulate('change', {target: {value: 'a'}});
        expect(fieldTypes.readOnlyOnChangeTextField.onChange).not.toHaveBeenCalled();
    });

    it('Should not change value for "readOnly" field', () => {
        const component = mount(<TextField {...fieldTypes.readOnlyTextFieldWithValue} />);
        const inputField = component.find('input');

        inputField.simulate('change', {target: {value: 'test'}});
        expect(component.state().value).toBe('XXXXXXX');
    });

    it('Should call "onChange" for "text" input field when a character is entered', () => {
        fieldTypes.onChangeTextField.onChange.mockReset();
        const component = mount(<TextField {...fieldTypes.onChangeTextField} />);
        const inputField = component.find('input');

        inputField.simulate('change', {target: {value: 'a'}});
        expect(fieldTypes.onChangeTextField.onChange).toHaveBeenCalled();
        expect(fieldTypes.onChangeTextField.onChange).toHaveBeenCalledTimes(1);
    });

    it('Should call "onChange" on blur of "text" input field', () => {
        fieldTypes.onChangeTextField.onChange.mockReset();
        const component = mount(<TextField {...fieldTypes.onChangeTextField} />);
        const inputField = component.find('input');

        inputField.simulate('blur');
        expect(fieldTypes.onChangeTextField.onChange).toHaveBeenCalled();
        expect(fieldTypes.onChangeTextField.onChange).toHaveBeenCalledTimes(1);
    });

    it('Should truncate keyed in value to "maxLength"', () => {
        const component = mount(<TextField {...fieldTypes.maxLengthTextField} />);
        const inputField = component.find('input');

        inputField.simulate('change', {target: {value: 'abcdefg'}});
        expect(component.state().value).toBe('abcde');
    });

    it('Should convert field value to uppercase when passing "uppercase" property', () => {
        const component = mount(<TextField {...fieldTypes.uppercaseTextField} />);
        const inputField = component.find('input');

        inputField.simulate('change', {target: {value: 'a'}});
        expect(component.state().value).toBe('A');

        inputField.simulate('change', {target: {value: 'abcde'}});
        expect(component.state().value).toBe('ABCDE');

        inputField.simulate('change', {target: {value: 'the quick brown fox'}});
        expect(component.state().value).toBe('THE QUICK BROWN FOX');

        inputField.simulate('change', {target: {value: 'The Quick Brown Fox'}});
        expect(component.state().value).toBe('THE QUICK BROWN FOX');

        inputField.simulate('change', {target: {value: 'tHe qUICk BrOWn FoX'}});
        expect(component.state().value).toBe('THE QUICK BROWN FOX');
    });

    it('Should capitalise field value when passing "capitalise" property', () => {
        const component = mount(<TextField {...fieldTypes.capitaliseTextField} />);
        const inputField = component.find('input');

        inputField.simulate('change', {target: {value: 'a'}});
        expect(component.state().value).toBe('A');

        inputField.simulate('change', {target: {value: 'abcde'}});
        expect(component.state().value).toBe('Abcde');

        inputField.simulate('change', {target: {value: 'the quick brown fox'}});
        expect(component.state().value).toBe('The Quick Brown Fox');

        inputField.simulate('change', {target: {value: 'The Quick Brown Fox'}});
        expect(component.state().value).toBe('The Quick Brown Fox');

        inputField.simulate('change', {target: {value: 'tHe qUICk BrOWn FoX'}});
        expect(component.state().value).toBe('The Quick Brown Fox');
    });

    it('Should only allow entry of alphabetic characters if "alphaOnly" property specified', () => {
        const component = mount(<TextField {...fieldTypes.alphaOnlyTextField} />);
        const inputField = component.find('input');

        inputField.simulate('change', {target: {value: '12345'}});
        expect(component.state().value).toBe('');

        inputField.simulate('change', {target: {value: '123WW'}});
        expect(component.state().value).toBe('WW');

        inputField.simulate('change', {target: {value: 'G798L'}});
        expect(component.state().value).toBe('GL');

        inputField.simulate('change', {target: {value: '!-&'}});
        expect(component.state().value).toBe('');

        inputField.simulate('change', {target: {value: 'S3-'}});
        expect(component.state().value).toBe('S');

        inputField.simulate('change', {target: {value: '-ifk'}});
        expect(component.state().value).toBe('ifk');

        inputField.simulate('change', {target: {value: ' e j H'}});
        expect(component.state().value).toBe('ejH');

        inputField.simulate('change', {target: {value: 'ab2vf4@@'}});
        expect(component.state().value).toBe('abvf');

        inputField.simulate('change', {target: {value: '717 --QW'}});
        expect(component.state().value).toBe('QW');

        inputField.simulate('change', {target: {value: 'abc'}});
        expect(component.state().value).toBe('abc');

        inputField.simulate('change', {target: {value: 'ABCDEF'}});
        expect(component.state().value).toBe('ABCDEF');
    });


    it('Should convert field value to uppercase when passing "uppercase" property', () => {
        const component = mount(<TextField {...fieldTypes.uppercaseAlphaOnlyTextField} />);
        const inputField = component.find('input');

        inputField.simulate('change', {target: {value: 'a'}});
        expect(component.state().value).toBe('A');

        inputField.simulate('change', {target: {value: 'abcde'}});
        expect(component.state().value).toBe('ABCDE');

        inputField.simulate('change', {target: {value: 'the quick brown fox'}});
        expect(component.state().value).toBe('THEQUICKBROWNFOX');

        inputField.simulate('change', {target: {value: 'The Quick Brown Fox'}});
        expect(component.state().value).toBe('THEQUICKBROWNFOX');

        inputField.simulate('change', {target: {value: 'tHe qUICk BrOWn FoX'}});
        expect(component.state().value).toBe('THEQUICKBROWNFOX');
    });

    it('Should capitalise field value when passing "capitalise" property', () => {
        const component = mount(<TextField {...fieldTypes.capitaliseAlphaOnlyTextField} />);
        const inputField = component.find('input');

        inputField.simulate('change', {target: {value: 'a'}});
        expect(component.state().value).toBe('A');

        inputField.simulate('change', {target: {value: 'abcde'}});
        expect(component.state().value).toBe('Abcde');

        inputField.simulate('change', {target: {value: 'the quick brown fox'}});
        expect(component.state().value).toBe('Thequickbrownfox');

        inputField.simulate('change', {target: {value: 'The Quick Brown Fox'}});
        expect(component.state().value).toBe('Thequickbrownfox');

        inputField.simulate('change', {target: {value: 'tHe qUICk BrOWn FoX'}});
        expect(component.state().value).toBe('Thequickbrownfox');
    });
});
