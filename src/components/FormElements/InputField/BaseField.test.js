import React from 'react';
import {shallow, mount} from 'enzyme';
import EnzymeAdapter from '../../../test_helpers/EnzymeAdapter';
import jsdom from 'jsdom';
import TestUtils from '../../../test_helpers/TestUtils';
import BaseField from "./BaseField";

describe('"BaseField" Component', () => {

    const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.document = doc;
    global.window = doc.defaultView;

    EnzymeAdapter.config();
    TestUtils.noConsoleErrors();

    const fieldTypes = TestUtils.fieldTypes();

    it('Should be defined', () => {
        const component = shallow(<BaseField {...fieldTypes.baseField} />);
        expect(component).toBeDefined();
    });

    it('Should have correct number of "props" for non-readOnly field', () => {
        const component = shallow(<BaseField {...fieldTypes.baseField} />);
        expect(Object.keys(component.find('input').props()).length).toBe(13);
    });

    it('Should have correct number of "props" for non-readOnly field', () => {
        const component = shallow(<BaseField {...fieldTypes.baseReadOnlyField} />);
        expect(Object.keys(component.find('input').props()).length).toBe(7);
    });

    it('Should render base field properties correctly', () => {
        const component = shallow(<BaseField {...fieldTypes.baseField} />);
        expect(component).toMatchSnapshot();

        const inputField = component.find('input');
        expect(inputField.prop('type')).toBeDefined();
        expect(inputField.prop('type')).toBe('text');

        expect(inputField.prop('id')).toBeDefined();
        expect(inputField.prop('id')).toBe('inputField');

        expect(inputField.prop('value')).toBeDefined();
        expect(inputField.prop('value')).toBe('');

        expect(inputField.prop('name')).toBeDefined();
        expect(inputField.prop('name')).toBe(inputField.prop('id'));
        expect(inputField.prop('name')).toBe('inputField');

        expect(inputField.prop('title')).toBeDefined();
        expect(inputField.prop('title')).toBe('Input Field');

        expect(inputField.prop('placeholder')).toBeDefined();
        expect(inputField.prop('placeholder')).toBe(inputField.prop('title'));
        expect(inputField.prop('placeholder')).toBe('Input Field');

        expect(inputField.prop('autoFocus')).toBeUndefined();
        expect(inputField.prop('className')).toBeUndefined();
        expect(inputField.prop('maxLength')).toBeUndefined();
        expect(inputField.prop('minLength')).toBeUndefined();
        expect(inputField.prop('readOnly')).toBeUndefined();

        expect(inputField.prop('onBlur')).toBeDefined();
        expect(inputField.prop('onChange')).toBeDefined();
    });

    it('Should render field with ALL properties correctly', () => {
        const component = shallow(<BaseField {...fieldTypes.allPropertiesBaseField} />);
        expect(component).toMatchSnapshot();

        const inputField = component.find('input');
        expect(inputField.prop('autoFocus')).toBeDefined();
        expect(inputField.prop('autoFocus')).toBe(true);

        expect(inputField.prop('className')).toBeDefined();
        expect(inputField.prop('className')).toBe('all-properties');

        expect(inputField.prop('id')).toBeDefined();
        expect(inputField.prop('id')).toBe('allPropsField');

        expect(inputField.prop('maxLength')).toBeDefined();
        expect(inputField.prop('maxLength')).toBe(10);

        expect(inputField.prop('minLength')).toBeDefined();
        expect(inputField.prop('minLength')).toBe(2);

        expect(inputField.prop('name')).toBeDefined();
        expect(inputField.prop('name')).not.toBe(inputField.prop('id'));
        expect(inputField.prop('name')).toBe('all-props-input-field');

        expect(inputField.prop('onBlur')).toBeDefined();
        expect(inputField.prop('onChange')).toBeDefined();

        expect(inputField.prop('placeholder')).toBeDefined();
        expect(inputField.prop('placeholder')).not.toBe(inputField.prop('title'));
        expect(inputField.prop('placeholder')).toBe('Type something here');

        expect(inputField.prop('readOnly')).toBeDefined();
        expect(inputField.prop('readOnly')).toBe(false);

        expect(inputField.prop('title')).toBeDefined();
        expect(inputField.prop('title')).toBe('All Properties Input Field');

        expect(inputField.prop('type')).toBeDefined();
        expect(inputField.prop('type')).toBe('text');

        expect(inputField.prop('value')).toBeDefined();
        expect(inputField.prop('value')).toBe('all props');
    });

    it('Should only render with appropriate properties for read only field with ALL properties', () => {
        const component = shallow(<BaseField {...fieldTypes.allPropertiesReadOnlyBaseField} />);
        expect(component).toMatchSnapshot();

        const inputField = component.find('input');
        expect(inputField.prop('autoFocus')).toBeUndefined();

        expect(inputField.prop('className')).toBeDefined();
        expect(inputField.prop('className')).toBe('all-properties-readonly');

        expect(inputField.prop('id')).toBeDefined();
        expect(inputField.prop('id')).toBe('allPropsReadOnlyField');

        expect(inputField.prop('maxLength')).toBeUndefined();
        expect(inputField.prop('minLength')).toBeUndefined();

        expect(inputField.prop('name')).toBeDefined();
        expect(inputField.prop('name')).not.toBe(inputField.prop('id'));
        expect(inputField.prop('name')).toBe('all-props-readonly-field');

        expect(inputField.prop('onBlur')).toBeUndefined();
        expect(inputField.prop('onChange')).toBeUndefined();
        expect(inputField.prop('placeholder')).toBeUndefined();

        expect(inputField.prop('readOnly')).toBeDefined();
        expect(inputField.prop('readOnly')).toBe(true);

        expect(inputField.prop('title')).toBeDefined();
        expect(inputField.prop('title')).toBe('All Properties ReadOnly Field');

        expect(inputField.prop('type')).toBeDefined();
        expect(inputField.prop('type')).toBe('text');

        expect(inputField.prop('value')).toBeDefined();
        expect(inputField.prop('value')).toBe('all props read only');
    });

    it('Should focus on field when "autoFocus" property is specified', () => {
        const component = mount(<BaseField {...fieldTypes.autoFocusBaseField} />);
        expect(component).toMatchSnapshot();
        expect(component.find('input').prop('autoFocus')).toBeDefined();

        const inputField = component.find('input').instance();
        const focusedElement = document.activeElement;
        expect(inputField === focusedElement).toBe(true);
    });

    it('Should not focus on field when "autoFocus" property is not specified', () => {
        const component = mount(<BaseField {...fieldTypes.baseField} />);
        expect(component.find('input').prop('autoFocus')).toBeUndefined();

        const inputField = component.find('input').instance();
        const focusedElement = document.activeElement;
        expect(inputField === focusedElement).toBe(false);
    });

    it('Should render field with "placeholder" property', () => {
        const component = shallow(<BaseField {...fieldTypes.placeHolderBaseField} />);
        const inputField = component.find('input');

        expect(component).toMatchSnapshot();
        expect(inputField.prop('placeholder')).toBeDefined();
        expect(inputField.prop('placeholder')).toBe("Enter a value");
    });

    it('Should render input field with "className" property', () => {
        const component = shallow(<BaseField {...fieldTypes.classNameBaseField} />);
        const inputField = component.find('input');

        expect(component).toMatchSnapshot();
        expect(inputField.prop('className')).toBeDefined();
        expect(inputField.prop('className')).toBe("random-class");
    });

    it('Should not render input field with "className" property if not present', () => {
        const component = shallow(<BaseField {...fieldTypes.baseField} />);
        expect(component).toMatchSnapshot();
        expect(component.find('input').prop('className')).toBeUndefined();
    });

    it('Should render input field as "text" regardless of type passed in component', () => {
        const component = shallow(<BaseField {...fieldTypes.baseTextField} />);
        const inputField = component.find('input');

        expect(inputField.prop('type')).toBe('text');
    });

    it('Should not call "onChange" for "readOnly" field', () => {
        const component = shallow(<BaseField {...fieldTypes.readOnlyOnChangeTextField} />);
        const inputField = component.find('input');

        inputField.simulate('change', {target: {value: 'a'}});
        expect(fieldTypes.readOnlyOnChangeTextField.onChange).not.toHaveBeenCalled();
    });

    it('Should not change value for "readOnly" field', () => {
        const component = shallow(<BaseField {...fieldTypes.readOnlyTextFieldWithValue} />);
        const inputField = component.find('input');

        inputField.simulate('change', {target: {value: 'test'}});
        expect(component.state().value).toBe('XXXXXXX');
    });

    it('Should call "onChange" when a character is entered', () => {
        fieldTypes.onChangeTextField.onChange.mockReset();
        const component = shallow(<BaseField {...fieldTypes.onChangeTextField} />);
        const inputField = component.find('input');

        inputField.simulate('change', {target: {value: 'a'}});
        expect(fieldTypes.onChangeTextField.onChange).toHaveBeenCalled();
        expect(fieldTypes.onChangeTextField.onChange).toHaveBeenCalledTimes(1);
    });

    it('Should call "onChange" on blur of input field', () => {
        fieldTypes.onChangeTextField.onChange.mockReset();
        const component = mount(<BaseField {...fieldTypes.onChangeTextField} />);
        const inputField = component.find('input');

        inputField.simulate('blur');
        expect(fieldTypes.onChangeTextField.onChange).toHaveBeenCalled();
        expect(fieldTypes.onChangeTextField.onChange).toHaveBeenCalledTimes(1);
    });

    it('Should have "invalid" state when "minLength" property not met', () => {
        const component = shallow(<BaseField {...fieldTypes.minLengthTextField} />);
        const inputField = component.find('input');

        inputField.simulate('change', {target: {value: 'ab'}});
        expect(component.state().isValid).toBe(false);
        expect(component.hasClass('invalid')).toBe(true);
    });

    it('Should have "valid" state when "minLength" property met or exceeded', () => {
        const component = shallow(<BaseField {...fieldTypes.minLengthTextField} />);
        const inputField = component.find('input');

        inputField.simulate('change', {target: {value: 'abc'}});
        expect(component.state().isValid).toBe(true);
        expect(component.hasClass('valid')).toBe(true);

        inputField.simulate('change', {target: {value: 'abcde'}});
        expect(component.state().isValid).toBe(true);
        expect(component.hasClass('valid')).toBe(true);
    });

    it('Should truncate keyed in value to "maxLength"', () => {
        const component = shallow(<BaseField {...fieldTypes.maxLengthTextField} />);
        const inputField = component.find('input');

        inputField.simulate('change', {target: {value: 'abcdefg'}});
        expect(component.state().value).toBe('abcde');
    });
    //
    // it('Should convert field value to uppercase when passing "uppercase" property', () => {
    //     const component = shallow(<BaseField {...fieldTypes.uppercaseTextField} />);
    //     const inputField = component.find('input');
    //
    //     inputField.simulate('change', {target: {value: 'a'}});
    //     expect(component.state().value).toBe('A');
    //
    //     inputField.simulate('change', {target: {value: 'abcde'}});
    //     expect(component.state().value).toBe('ABCDE');
    //
    //     inputField.simulate('change', {target: {value: 'the quick brown fox'}});
    //     expect(component.state().value).toBe('THE QUICK BROWN FOX');
    //
    //     inputField.simulate('change', {target: {value: 'The Quick Brown Fox'}});
    //     expect(component.state().value).toBe('THE QUICK BROWN FOX');
    //
    //     inputField.simulate('change', {target: {value: 'tHe qUICk BrOWn FoX'}});
    //     expect(component.state().value).toBe('THE QUICK BROWN FOX');
    // });
    //
    // it('Should capitalise field value when passing "capitalise" property', () => {
    //     const component = shallow(<BaseField {...fieldTypes.capitaliseTextField} />);
    //     const inputField = component.find('input');
    //
    //     inputField.simulate('change', {target: {value: 'a'}});
    //     expect(component.state().value).toBe('A');
    //
    //     inputField.simulate('change', {target: {value: 'abcde'}});
    //     expect(component.state().value).toBe('Abcde');
    //
    //     inputField.simulate('change', {target: {value: 'the quick brown fox'}});
    //     expect(component.state().value).toBe('The Quick Brown Fox');
    //
    //     inputField.simulate('change', {target: {value: 'The Quick Brown Fox'}});
    //     expect(component.state().value).toBe('The Quick Brown Fox');
    //
    //     inputField.simulate('change', {target: {value: 'tHe qUICk BrOWn FoX'}});
    //     expect(component.state().value).toBe('The Quick Brown Fox');
    // });
    //
    // it('Should ignore "zeroPad" property for "text" field', () => {
    //     const component = mount(<BaseField {...fieldTypes.zeroPadTextField} />);
    //     const inputField = component.find('input');
    //
    //     inputField.simulate('blur', {target: {value: 'a'}});
    //     expect(component.state().value).toBe('a');
    // });
    //
    // it('Should ignore "minValue" property for "text" field', () => {
    //     const component = shallow(<BaseField {...fieldTypes.minValueTextField} />);
    //     const inputField = component.find('input');
    //
    //     inputField.simulate('change', {target: {value: 'aaa'}});
    //     expect(component.state().isValid).toBe(true);
    //     expect(component.hasClass('valid')).toBe(true);
    //     expect(component.state().value).toBe('aaa');
    //
    //     inputField.simulate('change', {target: {value: '33'}});
    //     expect(component.state().isValid).toBe(true);
    //     expect(component.hasClass('valid')).toBe(true);
    //     expect(component.state().value).toBe('33');
    //
    //     inputField.simulate('change', {target: {value: '999'}});
    //     expect(component.state().isValid).toBe(true);
    //     expect(component.hasClass('valid')).toBe(true);
    //     expect(component.state().value).toBe('999');
    // });
});
