import React from 'react';
import {shallow, mount} from 'enzyme';
import EnzymeAdapter from '../../../test_helpers/EnzymeAdapter';
import jsdom from 'jsdom';
import TestUtils from '../../../test_helpers/TestUtils';
import NumberField from "./NumberField";
import BaseField from "./BaseField";

describe('"NumberField" Component', () => {

    const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.document = doc;
    global.window = doc.defaultView;

    EnzymeAdapter.config();
    TestUtils.noConsoleErrors();

    const fieldTypes = TestUtils.fieldTypes();

    it('Should render base "number" field correctly', () => {
        const numberField = shallow(<NumberField {...fieldTypes.baseNumberField} />);
        expect(numberField).toMatchSnapshot();
    });

    it('Should render input field as "text" regardless of type passed in component', () => {
        const component = mount(<NumberField {...fieldTypes.baseNumberField} />);
        const numberField = component.find('input');

        expect(numberField.prop('type')).toBe('text');
    });

    it('Should only allow entry of numbers', () => {
        const component = mount(<NumberField {...fieldTypes.baseNumberField} />);
        const numberField = component.find('input');

        numberField.simulate('change', {target: {value: 'abc'}});
        expect(component.state().value).toBe('');

        numberField.simulate('change', {target: {value: 'ABC'}});
        expect(component.state().value).toBe('');

        numberField.simulate('change', {target: {value: '!-&'}});
        expect(component.state().value).toBe('');

        numberField.simulate('change', {target: {value: '-23'}});
        expect(component.state().value).toBe('23');

        numberField.simulate('change', {target: {value: '12P'}});
        expect(component.state().value).toBe('12');

        numberField.simulate('change', {target: {value: 'Q2-'}});
        expect(component.state().value).toBe('2');

        numberField.simulate('change', {target: {value: '-44'}});
        expect(component.state().value).toBe('44');

        numberField.simulate('change', {target: {value: ' 4 0'}});
        expect(component.state().value).toBe('40');

        numberField.simulate('change', {target: {value: 'ab2vf4@@'}});
        expect(component.state().value).toBe('24');

        numberField.simulate('change', {target: {value: '717 --QW'}});
        expect(component.state().value).toBe('717');

        numberField.simulate('change', {target: {value: '999'}});
        expect(component.state().value).toBe('999');
    });

    it('Should zero pad field value to "maxLength" when passing "zeroPad" and "maxLength" property', () => {
        const component = mount(<NumberField {...fieldTypes.zeroPadNumberField} />);
        const numberField = component.find('input');

        numberField.simulate('blur', {target: {value: '1'}});
        expect(component.state().value).toBe('000001');

        numberField.simulate('blur', {target: {value: '12'}});
        expect(component.state().value).toBe('000012');

        numberField.simulate('blur', {target: {value: '123'}});
        expect(component.state().value).toBe('000123');

        numberField.simulate('blur', {target: {value: '1234'}});
        expect(component.state().value).toBe('001234');

        numberField.simulate('blur', {target: {value: '12345'}});
        expect(component.state().value).toBe('012345');

        numberField.simulate('blur', {target: {value: '123456'}});
        expect(component.state().value).toBe('123456');

        numberField.simulate('blur', {target: {value: '1234567'}});
        expect(component.state().value).toBe('123456');
    });

    it('Should not zero pad field value to when passing "zeroPad" and no "maxLength" property', () => {
        const component = mount(<NumberField {...fieldTypes.zeroPadNumberFieldNoMaxLength} />);
        const numberField = component.find('input');

        numberField.simulate('blur', {target: {value: '1'}});
        expect(component.state().value).toBe('1');

        numberField.simulate('blur', {target: {value: '12'}});
        expect(component.state().value).toBe('12');

        numberField.simulate('blur', {target: {value: '123'}});
        expect(component.state().value).toBe('123');

        numberField.simulate('blur', {target: {value: '1234'}});
        expect(component.state().value).toBe('1234');
    });

    it('Should have "invalid" state when "minValue" property not met', () => {
        const component = mount(<NumberField {...fieldTypes.minValueNumberField} />);
        const numberField = component.find('input');

        numberField.simulate('change', {target: {value: '12'}});
        expect(component.state().isValid).toBe(false);

        numberField.simulate('change', {target: {value: '99'}});
        expect(component.state().isValid).toBe(false);

        numberField.simulate('change', {target: {value: '110'}});
        expect(component.state().isValid).toBe(false);
    });

    it('Should have "valid" state when "minValue" property met or exceeded', () => {
        const component = mount(<NumberField {...fieldTypes.minLengthNumberField} />);
        const numberField = component.find('input');

        numberField.simulate('change', {target: {value: '123'}});
        expect(component.state().isValid).toBe(true);

        numberField.simulate('change', {target: {value: '321'}});
        expect(component.state().isValid).toBe(true);

        numberField.simulate('change', {target: {value: '12345'}});
        expect(component.state().isValid).toBe(true);
    });

    it('Should call "onChange" when passed as a property and a character is entered', () => {
        fieldTypes.onChangeNumberField.onChange.mockReset();
        const component = shallow(<BaseField {...fieldTypes.onChangeNumberField} />);
        const inputField = component.find('input');

        inputField.simulate('change', {target: {value: '2'}});
        expect(fieldTypes.onChangeNumberField.onChange).toHaveBeenCalled();
        expect(fieldTypes.onChangeNumberField.onChange).toHaveBeenCalledTimes(1);
    });

    it('Should call "onChange" on field blur', () => {
        fieldTypes.onChangeNumberField.onChange.mockReset();
        const component = mount(<BaseField {...fieldTypes.onChangeNumberField} />);
        const inputField = component.find('input');

        inputField.simulate('blur');
        expect(fieldTypes.onChangeNumberField.onChange).toHaveBeenCalled();
        expect(fieldTypes.onChangeNumberField.onChange).toHaveBeenCalledTimes(1);
    });
});
