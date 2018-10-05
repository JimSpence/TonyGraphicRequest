import React from 'react';
import { shallow, mount } from 'enzyme';
import EnzymeAdapter from '../../../test_helpers/EnzymeAdapter';
import jsdom from 'jsdom';
import TestUtils from '../../../test_helpers/TestUtils';
import InputField from "./InputField";

describe('"InputField" Component', () => {

    const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.document = doc;
    global.window = doc.defaultView;

    EnzymeAdapter.config();
    TestUtils.noConsoleErrors();

    const fieldTypes = TestUtils.fieldTypes();

    describe('All field type rendering', () => {
        it ('Should be defined', () => {
            const component = shallow(<InputField {...fieldTypes.baseField} />);
            expect (component).toBeDefined();
        });

        it ('Should have correct number of "props" for non-readOnly field', () => {
            const component = shallow(<InputField {...fieldTypes.baseField} />);
            expect (Object.keys(component.find('input').props()).length).toBe(13);
        });

        it ('Should have correct number of "props" for non-readOnly field', () => {
            const component = shallow(<InputField {...fieldTypes.baseReadOnlyField} />);
            expect (Object.keys(component.find('input').props()).length).toBe(7);
        });

        it ('Should render base field properties correctly', () => {
            const component = shallow(<InputField {...fieldTypes.baseField} />);
            expect (component).toMatchSnapshot();

            const inputField = component.find('input');
            expect (inputField.prop('type')).toBeDefined();
            expect (inputField.prop('type')).toBe('text');

            expect (inputField.prop('id')).toBeDefined();
            expect (inputField.prop('id')).toBe('inputField');

            expect (inputField.prop('minLength')).toBeDefined();
            expect (inputField.prop('minLength')).toBe(0);

            expect (inputField.prop('value')).toBeDefined();
            expect (inputField.prop('value')).toBe('');

            expect (inputField.prop('name')).toBeDefined();
            expect (inputField.prop('name')).toBe(inputField.prop('id'));
            expect (inputField.prop('name')).toBe('inputField');

            expect (inputField.prop('title')).toBeDefined();
            expect (inputField.prop('title')).toBe('Input Field');

            expect (inputField.prop('placeholder')).toBeDefined();
            expect (inputField.prop('placeholder')).toBe(inputField.prop('title'));
            expect (inputField.prop('placeholder')).toBe('Input Field');

            expect (inputField.prop('autoFocus')).toBeUndefined();
            expect (inputField.prop('className')).toBeUndefined();
            expect (inputField.prop('maxLength')).toBeUndefined();
            expect (inputField.prop('readOnly')).toBeUndefined();

            expect (inputField.prop('onBlur')).toBeDefined();
            expect (inputField.prop('onChange')).toBeDefined();
        });

        it ('Should render field with ALL properties correctly', () => {
            const component = shallow(<InputField {...fieldTypes.allPropertiesBaseField} />);
            expect (component).toMatchSnapshot();

            const inputField = component.find('input');
            expect (inputField.prop('autoFocus')).toBeDefined();
            expect (inputField.prop('autoFocus')).toBe(true);

            expect (inputField.prop('className')).toBeDefined();
            expect (inputField.prop('className')).toBe('all-properties');

            expect (inputField.prop('id')).toBeDefined();
            expect (inputField.prop('id')).toBe('allPropsField');

            expect (inputField.prop('maxLength')).toBeDefined();
            expect (inputField.prop('maxLength')).toBe(10);

            expect (inputField.prop('minLength')).toBeDefined();
            expect (inputField.prop('minLength')).toBe(2);

            expect (inputField.prop('name')).toBeDefined();
            expect (inputField.prop('name')).not.toBe(inputField.prop('id'));
            expect (inputField.prop('name')).toBe('all-props-input-field');

            expect (inputField.prop('onBlur')).toBeDefined();
            expect (inputField.prop('onChange')).toBeDefined();

            expect (inputField.prop('placeholder')).toBeDefined();
            expect (inputField.prop('placeholder')).not.toBe(inputField.prop('title'));
            expect (inputField.prop('placeholder')).toBe('Type something here');

            expect (inputField.prop('readOnly')).toBeDefined();
            expect (inputField.prop('readOnly')).toBe(false);

            expect (inputField.prop('title')).toBeDefined();
            expect (inputField.prop('title')).toBe('All Properties Input Field');

            expect (inputField.prop('type')).toBeDefined();
            expect (inputField.prop('type')).toBe('text');

            expect (inputField.prop('value')).toBeDefined();
            expect (inputField.prop('value')).toBe('all props');
        });

        it ('Should only render with appropriate properties for read only field with ALL properties', () => {
            const component = shallow(<InputField {...fieldTypes.allPropertiesReadOnlyBaseField} />);
            expect (component).toMatchSnapshot();

            const inputField = component.find('input');
            expect (inputField.prop('autoFocus')).toBeUndefined();

            expect (inputField.prop('className')).toBeDefined();
            expect (inputField.prop('className')).toBe('all-properties-readonly');

            expect (inputField.prop('id')).toBeDefined();
            expect (inputField.prop('id')).toBe('allPropsReadOnlyField');

            expect (inputField.prop('maxLength')).toBeUndefined();
            expect (inputField.prop('minLength')).toBeUndefined();

            expect (inputField.prop('name')).toBeDefined();
            expect (inputField.prop('name')).not.toBe(inputField.prop('id'));
            expect (inputField.prop('name')).toBe('all-props-readonly-field');

            expect (inputField.prop('onBlur')).toBeUndefined();
            expect (inputField.prop('onChange')).toBeUndefined();
            expect (inputField.prop('placeholder')).toBeUndefined();

            expect (inputField.prop('readOnly')).toBeDefined();
            expect (inputField.prop('readOnly')).toBe(true);

            expect (inputField.prop('title')).toBeDefined();
            expect (inputField.prop('title')).toBe('All Properties ReadOnly Field');

            expect (inputField.prop('type')).toBeDefined();
            expect (inputField.prop('type')).toBe('text');

            expect (inputField.prop('value')).toBeDefined();
            expect (inputField.prop('value')).toBe('all props read only');
        });

        it ('Should focus on field when "autoFocus" property is specified', () => {
            const component = mount(<InputField {...fieldTypes.autoFocusBaseField} />);
            expect (component).toMatchSnapshot();
            expect (component.find('input').prop('autoFocus')).toBeDefined();

            const inputField = component.find('input').instance();
            const focusedElement = document.activeElement;
            expect (inputField === focusedElement).toBe(true);
        });

        it ('Should not focus on field when "autoFocus" property is not specified', () => {
            const component = mount(<InputField {...fieldTypes.baseField} />);
            expect (component.find('input').prop('autoFocus')).toBeUndefined();

            const inputField = component.find('input').instance();
            const focusedElement = document.activeElement;
            expect (inputField === focusedElement).toBe(false);
        });

        it ('Should render field with "placeholder" property', () => {
            const component = shallow(<InputField {...fieldTypes.placeHolderBaseField} />);
            const inputField = component.find('input');

            expect (component).toMatchSnapshot();
            expect (inputField.prop('placeholder')).toBeDefined();
            expect (inputField.prop('placeholder')).toBe("Enter a value");
        });

        it ('Should render input field with "className" property', () => {
            const component = shallow(<InputField {...fieldTypes.classNameBaseField} />);
            const inputField = component.find('input');

            expect (component).toMatchSnapshot();
            expect (inputField.prop('className')).toBeDefined();
            expect (inputField.prop('className')).toBe("random-class");
        });

        it ('Should not render input field with "className" property if not present', () => {
            const component = shallow(<InputField {...fieldTypes.baseField} />);
            expect (component).toMatchSnapshot();
            expect (component.find('input').prop('className')).toBeUndefined();
        });
    });

    describe('"Text" field behaviours', () => {
        it ('Should render base "text" field correctly', () => {
            const component = shallow(<InputField {...fieldTypes.baseTextField} />);
            expect (component).toMatchSnapshot();
        });

        it ('Should render input field as "text" regardless of type passed in component', () => {
            const component = shallow(<InputField {...fieldTypes.baseTextField} />);
            const inputField = component.find('input');

            expect (inputField.prop('type')).toBe('text');
        });

        it ('Should not call "onChange" for "readOnly" field', () => {
            const component = shallow(<InputField {...fieldTypes.readOnlyOnChangeTextField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: 'a' }});
            expect (fieldTypes.readOnlyOnChangeTextField.onChange).not.toHaveBeenCalled();
        });

        it ('Should not change value for "readOnly" field', () => {
            const component = shallow(<InputField {...fieldTypes.readOnlyTextFieldWithValue} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: 'test' }});
            expect (component.state().value).toBe('XXXXXXX');
        });

        it ('Should call "onChange" for "text" input field when a character is entered', () => {
            fieldTypes.onChangeTextField.onChange.mockReset();
            const component = shallow(<InputField {...fieldTypes.onChangeTextField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: 'a' }});
            expect (fieldTypes.onChangeTextField.onChange).toHaveBeenCalled();
            expect (fieldTypes.onChangeTextField.onChange).toHaveBeenCalledTimes(1);
        });

        it ('Should call "onChange" on blur of "text" input field', () => {
            fieldTypes.onChangeTextField.onChange.mockReset();
            const component = mount(<InputField {...fieldTypes.onChangeTextField} />);
            const inputField = component.find('input');

            inputField.simulate('blur');
            expect (fieldTypes.onChangeTextField.onChange).toHaveBeenCalled();
            expect (fieldTypes.onChangeTextField.onChange).toHaveBeenCalledTimes(1);
        });

        it ('Should have "invalid" state when "minLength" property not met', () => {
            const component = shallow(<InputField {...fieldTypes.minLengthTextField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: 'ab' }});
            expect (component.state().isValid).toBe(false);
            expect (component.hasClass('invalid')).toBe(true);
        });

        it ('Should have "valid" state when "minLength" property met or exceeded', () => {
            const component = shallow(<InputField {...fieldTypes.minLengthTextField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: 'abc' }});
            expect (component.state().isValid).toBe(true);
            expect (component.hasClass('valid')).toBe(true);

            inputField.simulate('change', {target: { value: 'abcde' }});
            expect (component.state().isValid).toBe(true);
            expect (component.hasClass('valid')).toBe(true);
        });

        it ('Should truncate keyed in value to "maxLength"', () => {
            const component = shallow(<InputField {...fieldTypes.maxLengthTextField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: 'abcdefg' }});
            expect (component.state().value).toBe('abcde');
        });

        it ('Should convert field value to uppercase when passing "uppercase" property', () => {
            const component = shallow(<InputField {...fieldTypes.uppercaseTextField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: 'a' }});
            expect (component.state().value).toBe('A');

            inputField.simulate('change', {target: { value: 'abcde' }});
            expect (component.state().value).toBe('ABCDE');

            inputField.simulate('change', {target: { value: 'the quick brown fox' }});
            expect (component.state().value).toBe('THE QUICK BROWN FOX');

            inputField.simulate('change', {target: { value: 'The Quick Brown Fox' }});
            expect (component.state().value).toBe('THE QUICK BROWN FOX');

            inputField.simulate('change', {target: { value: 'tHe qUICk BrOWn FoX' }});
            expect (component.state().value).toBe('THE QUICK BROWN FOX');
        });

        it ('Should capitalise field value when passing "capitalise" property', () => {
            const component = shallow(<InputField {...fieldTypes.capitaliseTextField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: 'a' }});
            expect (component.state().value).toBe('A');

            inputField.simulate('change', {target: { value: 'abcde' }});
            expect (component.state().value).toBe('Abcde');

            inputField.simulate('change', {target: { value: 'the quick brown fox' }});
            expect (component.state().value).toBe('The Quick Brown Fox');

            inputField.simulate('change', {target: { value: 'The Quick Brown Fox' }});
            expect (component.state().value).toBe('The Quick Brown Fox');

            inputField.simulate('change', {target: { value: 'tHe qUICk BrOWn FoX' }});
            expect (component.state().value).toBe('The Quick Brown Fox');
        });

        it ('Should ignore "zeroPad" property for "text" field', () => {
            const component = mount(<InputField {...fieldTypes.zeroPadTextField} />);
            const inputField = component.find('input');

            inputField.simulate('blur', {target: { value: 'a' }});
            expect (component.state().value).toBe('a');
        });

        it ('Should ignore "minValue" property for "text" field', () => {
            const component = shallow(<InputField {...fieldTypes.minValueTextField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: 'aaa' }});
            expect (component.state().isValid).toBe(true);
            expect (component.hasClass('valid')).toBe(true);
            expect (component.state().value).toBe('aaa');

            inputField.simulate('change', {target: { value: '33' }});
            expect (component.state().isValid).toBe(true);
            expect (component.hasClass('valid')).toBe(true);
            expect (component.state().value).toBe('33');

            inputField.simulate('change', {target: { value: '999' }});
            expect (component.state().isValid).toBe(true);
            expect (component.hasClass('valid')).toBe(true);
            expect (component.state().value).toBe('999');
        });
    });

    describe('"Number" field behaviours', () => {
        it('Should render base "number" field correctly', () => {
            const numberField = shallow(<InputField {...fieldTypes.baseNumberField} />);
            expect(numberField).toMatchSnapshot();
        });

        it ('Should render input field as "text" regardless of type passed in component', () => {
            const component = shallow(<InputField {...fieldTypes.baseNumberField} />);
            const inputField = component.find('input');

            expect (inputField.prop('type')).toBe('text');
        });

        it ('Should only allow entry of numbers', () => {
            const component = shallow(<InputField {...fieldTypes.baseNumberField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: 'abc' }});
            expect (component.state().value).toBe('');

            inputField.simulate('change', {target: { value: 'ABC' }});
            expect (component.state().value).toBe('');

            inputField.simulate('change', {target: { value: '!-&' }});
            expect (component.state().value).toBe('');

            inputField.simulate('change', {target: { value: '-23' }});
            expect (component.state().value).toBe('23');

            inputField.simulate('change', {target: { value: '12P' }});
            expect (component.state().value).toBe('12');

            inputField.simulate('change', {target: { value: 'Q2-' }});
            expect (component.state().value).toBe('2');

            inputField.simulate('change', {target: { value: '-44' }});
            expect (component.state().value).toBe('44');

            inputField.simulate('change', {target: { value: ' 4 0' }});
            expect (component.state().value).toBe('40');

            inputField.simulate('change', {target: { value: 'ab2vf4@@' }});
            expect (component.state().value).toBe('24');

            inputField.simulate('change', {target: { value: '717 --QW' }});
            expect (component.state().value).toBe('717');

            inputField.simulate('change', {target: { value: '999' }});
            expect (component.state().value).toBe('999');
        });

        it ('Should not call "onChange" for "readOnly" field', () => {
            fieldTypes.readOnlyOnChangeNumberField.onChange.mockReset();
            const component = shallow(<InputField {...fieldTypes.readOnlyOnChangeNumberField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: '999' }});
            expect (fieldTypes.readOnlyOnChangeTextField.onChange).not.toHaveBeenCalled();
        });

        it ('Should not change value for "readOnly" field', () => {
            const component = shallow(<InputField {...fieldTypes.readOnlyNumberFieldWithValue} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: '1111111' }});
            expect (component.state().value).toBe('99999');
        });

        it ('Should call "onChange" for "number" input field when a number is entered', () => {
            fieldTypes.onChangeTextField.onChange.mockReset();
            const component = shallow(<InputField {...fieldTypes.onChangeNumberField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: '3' }});
            expect (fieldTypes.onChangeTextField.onChange).toHaveBeenCalled();
            expect (fieldTypes.onChangeTextField.onChange).toHaveBeenCalledTimes(1);
        });

        it ('Should call "onChange" on blur of "number" input field', () => {
            fieldTypes.onChangeTextField.onChange.mockReset();
            const component = mount(<InputField {...fieldTypes.onChangeNumberField} />);
            const inputField = component.find('input');

            inputField.simulate('blur');
            expect (fieldTypes.onChangeTextField.onChange).toHaveBeenCalled();
            expect (fieldTypes.onChangeTextField.onChange).toHaveBeenCalledTimes(1);
        });

        it ('Should have "invalid" state when "minLength" property not met', () => {
            const component = shallow(<InputField {...fieldTypes.minLengthNumberField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: '12' }});
            console.log(component.state());
            expect (component.state().isValid).toBe(false);
            expect (component.hasClass('invalid')).toBe(true);
        });

        it ('Should have "valid" state when "minLength" property met or exceeded', () => {
            const component = shallow(<InputField {...fieldTypes.minLengthNumberField} />);
            const inputField= component.find('input');

            inputField.simulate('change', {target: { value: '123' }});
            expect (component.state().isValid).toBe(true);
            expect (component.hasClass('valid')).toBe(true);

            inputField.simulate('change', {target: { value: '12345' }});
            expect (component.state().isValid).toBe(true);
            expect (component.hasClass('valid')).toBe(true);
        });

        it ('Should truncate keyed in value to "maxLength"', () => {
            const component = shallow(<InputField {...fieldTypes.maxLengthNumberField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: '123456' }});
            expect (component.state().value).toBe('12345');
        });

        it ('Should zero pad field value to "maxLength" when passing "zeroPad" and "maxLength" property', () => {
            const component = mount(<InputField {...fieldTypes.zeroPadNumberField} />);
            const inputField = component.find('input');

            inputField.simulate('blur', {target: { value: '1' }});
            expect (component.state().value).toBe('000001');

            inputField.simulate('blur', {target: { value: '12' }});
            expect (component.state().value).toBe('000012');

            inputField.simulate('blur', {target: { value: '123' }});
            expect (component.state().value).toBe('000123');

            inputField.simulate('blur', {target: { value: '1234' }});
            expect (component.state().value).toBe('001234');

            inputField.simulate('blur', {target: { value: '12345' }});
            expect (component.state().value).toBe('012345');

            inputField.simulate('blur', {target: { value: '123456' }});
            expect (component.state().value).toBe('123456');

            inputField.simulate('blur', {target: { value: '1234567' }});
            expect (component.state().value).toBe('123456');
        });

        it ('Should not zero pad field value to when passing "zeroPad" and no "maxLength" property', () => {
            const component = mount(<InputField {...fieldTypes.zeroPadNumberFieldNoMaxLength} />);
            const inputField = component.find('input');

            inputField.simulate('blur', {target: { value: '1' }});
            expect (component.state().value).toBe('1');

            inputField.simulate('blur', {target: { value: '12' }});
            expect (component.state().value).toBe('12');

            inputField.simulate('blur', {target: { value: '123' }});
            expect (component.state().value).toBe('123');

            inputField.simulate('blur', {target: { value: '1234' }});
            expect (component.state().value).toBe('1234');
        });

        it ('Should have "invalid" state when "minValue" property not met', () => {
            const component = shallow(<InputField {...fieldTypes.minValueNumberField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: '12' }});
            expect (component.state().isValid).toBe(false);
            expect (component.hasClass('invalid')).toBe(true);

            inputField.simulate('change', {target: { value: '99' }});
            expect (component.state().isValid).toBe(false);
            expect (component.hasClass('invalid')).toBe(true);

            inputField.simulate('change', {target: { value: '110' }});
            expect (component.state().isValid).toBe(false);
            expect (component.hasClass('invalid')).toBe(true);
        });

        it ('Should have "valid" state when "minValue" property met or exceeded', () => {
            const component = shallow(<InputField {...fieldTypes.minLengthNumberField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: '123' }});
            expect (component.state().isValid).toBe(true);
            expect (component.hasClass('valid')).toBe(true);

            inputField.simulate('change', {target: { value: '321' }});
            expect (component.state().isValid).toBe(true);
            expect (component.hasClass('valid')).toBe(true);

            inputField.simulate('change', {target: { value: '12345' }});
            expect (component.state().isValid).toBe(true);
            expect (component.hasClass('valid')).toBe(true);
        });

    });

    describe('"alphaOnly" field tests', () => {
        it ('Should render base "alphaOnly" field correctly', () => {
            const alphaOnlyField = shallow(<InputField {...fieldTypes.baseAlphaOnlyField} />);
            expect (alphaOnlyField).toMatchSnapshot();
        });

        it ('Should render input field as "text" regardless of type passed in component', () => {
            const component = shallow(<InputField {...fieldTypes.baseAlphaOnlyField} />);
            const inputField = component.find('input');

            expect (inputField.prop('type')).toBe('text');
        });

        it ('Should only allow entry of alphabetic characters', () => {
            const component = shallow(<InputField {...fieldTypes.baseAlphaOnlyField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: '12345' }});
            expect (component.state().value).toBe('');

            inputField.simulate('change', {target: { value: '123WW' }});
            expect (component.state().value).toBe('WW');

            inputField.simulate('change', {target: { value: 'G798L' }});
            expect (component.state().value).toBe('GL');

            inputField.simulate('change', {target: { value: '!-&' }});
            expect (component.state().value).toBe('');

            inputField.simulate('change', {target: { value: 'S3-' }});
            expect (component.state().value).toBe('S');

            inputField.simulate('change', {target: { value: '-ifk' }});
            expect (component.state().value).toBe('ifk');

            inputField.simulate('change', {target: { value: ' e j H' }});
            expect (component.state().value).toBe('ejH');

            inputField.simulate('change', {target: { value: 'ab2vf4@@' }});
            expect (component.state().value).toBe('abvf');

            inputField.simulate('change', {target: { value: '717 --QW' }});
            expect (component.state().value).toBe('QW');

            inputField.simulate('change', {target: { value: 'abc' }});
            expect (component.state().value).toBe('abc');

            inputField.simulate('change', {target: { value: 'ABCDEF' }});
            expect (component.state().value).toBe('ABCDEF');
        });

        it ('Should not change value for "readOnly" field', () => {
            const component = shallow(<InputField {...fieldTypes.readOnlyAlphaOnlyFieldWithValue} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: 'New Value' }});
            expect (component.state().value).toBe('abcdefg');
        });

        it ('Should call "onChange" for "text" input field when a character is entered', () => {
            fieldTypes.onChangeAlphaOnlyField.onChange.mockReset();
            const component = shallow(<InputField {...fieldTypes.onChangeAlphaOnlyField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: 'a' }});
            expect (fieldTypes.onChangeTextField.onChange).toHaveBeenCalled();
            expect (fieldTypes.onChangeTextField.onChange).toHaveBeenCalledTimes(1);
        });

        it ('Should call "onChange" on blur of "text" input field', () => {
            fieldTypes.onChangeAlphaOnlyField.onChange.mockReset();
            const component = mount(<InputField {...fieldTypes.onChangeAlphaOnlyField} />);
            const inputField = component.find('input');

            inputField.simulate('blur');
            expect (fieldTypes.onChangeTextField.onChange).toHaveBeenCalled();
            expect (fieldTypes.onChangeTextField.onChange).toHaveBeenCalledTimes(1);
        });

        it ('Should have "invalid" state when "minLength" property not met', () => {
            const component = shallow(<InputField {...fieldTypes.minLengthAlphaOnlyField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: 'abcd' }});
            expect (component.state().isValid).toBe(false);
            expect (component.hasClass('invalid')).toBe(true);
        });

        it ('Should have "valid" state when "minLength" property met or exceeded', () => {
            const component = shallow(<InputField {...fieldTypes.minLengthAlphaOnlyField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: 'abcddef' }});
            expect (component.state().isValid).toBe(true);
            expect (component.hasClass('valid')).toBe(true);

            inputField.simulate('change', {target: { value: 'abcdefghij' }});
            expect (component.state().isValid).toBe(true);
            expect (component.hasClass('valid')).toBe(true);
        });

        it ('Should truncate keyed in value to "maxLength"', () => {
            const component = shallow(<InputField {...fieldTypes.maxLengthAlphaOnlyField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: 'ABCDEFGHIJKL' }});
            expect (component.state().value).toBe('ABCDEFGH');
        });

        it ('Should convert field value to uppercase when passing "uppercase" property', () => {
            const component = shallow(<InputField {...fieldTypes.uppercaseAlphaOnlyField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: 'a' }});
            expect (component.state().value).toBe('A');

            inputField.simulate('change', {target: { value: 'abcde' }});
            expect (component.state().value).toBe('ABCDE');

            inputField.simulate('change', {target: { value: 'the quick brown fox' }});
            expect (component.state().value).toBe('THEQUICKBROWNFOX');

            inputField.simulate('change', {target: { value: 'The Quick Brown Fox' }});
            expect (component.state().value).toBe('THEQUICKBROWNFOX');

            inputField.simulate('change', {target: { value: 'tHe qUICk BrOWn FoX' }});
            expect (component.state().value).toBe('THEQUICKBROWNFOX');
        });

        it ('Should capitalise field value when passing "capitalise" property', () => {
            const component = shallow(<InputField {...fieldTypes.capitaliseAlphaOnlyField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: 'a' }});
            expect (component.state().value).toBe('A');

            inputField.simulate('change', {target: { value: 'abcde' }});
            expect (component.state().value).toBe('Abcde');

            inputField.simulate('change', {target: { value: 'the quick brown fox' }});
            expect (component.state().value).toBe('Thequickbrownfox');

            inputField.simulate('change', {target: { value: 'The Quick Brown Fox' }});
            expect (component.state().value).toBe('Thequickbrownfox');

            inputField.simulate('change', {target: { value: 'tHe qUICk BrOWn FoX' }});
            expect (component.state().value).toBe('Thequickbrownfox');
        });

        it ('Should ignore "zeroPad" property for "alphaOnly" field', () => {
            const component = mount(<InputField {...fieldTypes.zeroPadAlphaOnlyField} />);
            const inputField = component.find('input');

            inputField.simulate('blur', {target: { value: 'a' }});
            expect (component.state().value).toBe('a');
        });

        it ('Should ignore "minValue" property for "alphaOnly" field', () => {
            const component = shallow(<InputField {...fieldTypes.minValueTextField} />);
            const inputField = component.find('input');

            inputField.simulate('change', {target: { value: 'aaa' }});
            expect (component.state().isValid).toBe(true);
            expect (component.hasClass('valid')).toBe(true);
            expect (component.state().value).toBe('aaa');

            inputField.simulate('change', {target: { value: 'ABCDEF' }});
            expect (component.state().isValid).toBe(true);
            expect (component.hasClass('valid')).toBe(true);
            expect (component.state().value).toBe('ABCDEF');
        });
    });
});
