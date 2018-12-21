import React from 'react';
import {shallow, mount} from 'enzyme';
import EnzymeAdapter from '../../../../test_helpers/EnzymeAdapter';
import jsdom from 'jsdom';
import TestUtils from '../../../../test_helpers/TestUtils';
import Select from "../Select";

describe('"Select" Component', () => {

    const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.document = doc;
    global.window = doc.defaultView;

    EnzymeAdapter.config();
    TestUtils.noConsoleErrors();

    const selectTypes = TestUtils.selectTypes();

    it('Should be defined', () => {
        const component = shallow(<Select {...selectTypes.select} />);
        expect(component).toMatchSnapshot();
        expect(component).toBeDefined();
    });

    it('Should render sub-elements', () => {
        const component = shallow(<Select {...selectTypes.select} />);
        expect(component.find('div')).toBeDefined();
        expect(component.find('select')).toBeDefined();
        expect(component.find('option')).toBeDefined();
        expect(component.find('label')).toBeDefined();
    });

    it('Should render as "disabled" when "readonly" property specified', () => {
        const component = shallow(<Select {...selectTypes.selectReadOnly} />);
        expect(component).toMatchSnapshot();

        const select = component.find('select');
        expect(select.prop('disabled')).toBeDefined();
        expect(select.prop('disabled')).toBe(true);
    });

    it('Should not render as "disabled" when "readonly" property is not specified', () => {
        const component = shallow(<Select {...selectTypes.select} />);
        const select = component.find('select');
        expect(select.prop('disabled')).toBeUndefined();
    });

    it('Should have correct number of "props"', () => {
        const component = shallow(<Select {...selectTypes.select} />);
        expect(Object.keys(component.find('select').props()).length).toBe(10);
    });

    it('Should render base field properties correctly', () => {
        const component = shallow(<Select {...selectTypes.select} />);
        const select = component.find('select');

        expect(select.prop('disabled')).toBeUndefined();

        expect(select.prop('id')).toBeDefined();
        expect(select.prop('id')).toBe('selectId');

        expect(select.prop('name')).toBeDefined();
        expect(select.prop('name')).toBe(select.prop('id'));
        expect(select.prop('name')).toBe('selectId');

        expect(select.prop('value')).toBeDefined();
        expect(select.prop('value')).toBe('');

        expect(select.prop('title')).toBeDefined();
        expect(select.prop('title')).toBe('Select Title');

        expect(select.prop('children')).toBeDefined();
        expect(select.prop('children')[0].type).toBeDefined;
        expect(select.prop('children')[0].type).toBe('option');

        expect(select.prop('children')[0].props.hidden).toBeDefined;
        expect(select.prop('children')[0].props.hidden).toBe(true);
        expect(select.prop('children')[0].props.className).toBeDefined;
        expect(select.prop('children')[0].props.className).toBe('placeholder');
        expect(select.prop('children')[0].props.value).toBeDefined;
        expect(select.prop('children')[0].props.value).toBe('');
        expect(select.prop('children')[0].props.children).toBeDefined;
        expect(select.prop('children')[0].props.children).toBe('Select Title');
        expect(select.prop('children')[0].props.children).toBe(select.prop('title'));

        expect(select.prop('autoFocus')).toBeUndefined();
        expect(select.prop('className')).toBeUndefined();

        expect(select.prop('onBlur')).toBeDefined();
        expect(select.prop('onChange')).toBeDefined();
    });

    it('Should render base field with ALL properties correctly', () => {
        const component = shallow(<Select {...selectTypes.selectAllProperties} />);
        expect(component).toMatchSnapshot();

        const select = component.find('select');

        expect(select.prop('autoFocus')).toBeDefined();
        expect(select.prop('autoFocus')).toBe(true);

        expect(select.prop('className')).toBeDefined();
        expect(select.prop('className')).toBe('selectAllPropertiesClass');

        expect(select.prop('disabled')).toBeDefined();
        expect(select.prop('disabled')).toBe(false);

        expect(select.prop('id')).toBeDefined();
        expect(select.prop('id')).toBe('selectAllPropertiesId');

        expect(select.prop('name')).toBeDefined();
        expect(select.prop('name')).not.toBe(select.prop('id'));
        expect(select.prop('name')).toBe('selectAllPropertiesName');

        expect(select.prop('value')).toBeDefined();
        expect(select.prop('value')).toBe('Select All Properties Value');

        expect(select.prop('title')).toBeDefined();
        expect(select.prop('title')).toBe('Select All Properties Title');

        expect(select.prop('children')).toBeDefined();
        expect(select.prop('children')[0].type).toBeDefined;
        expect(select.prop('children')[0].type).toBe('option');
        expect(select.prop('children')[0].props.hidden).toBeDefined;
        expect(select.prop('children')[0].props.hidden).toBe(true);
        expect(select.prop('children')[0].props.className).toBeDefined;
        expect(select.prop('children')[0].props.className).toBe('placeholder');
        expect(select.prop('children')[0].props.value).toBeDefined;
        expect(select.prop('children')[0].props.value).toBe('');
        expect(select.prop('children')[0].props.children).toBeDefined;
        expect(select.prop('children')[0].props.children).toBe('Make a selection');
        expect(select.prop('children')[0].props.children).not.toBe(select.prop('title'));

        expect(select.prop('onBlur')).toBeDefined();
        expect(select.prop('onChange')).toBeDefined();
    });

    it('Should focus on select when "autoFocus" property is specified', () => {
        const component = mount(<Select {...selectTypes.selectAutoFocus} />);
        expect(component.find('select').prop('autoFocus')).toBeDefined();

        const select = component.find('select').instance();
        const focusedElement = document.activeElement;
        expect(select).toBe(focusedElement);
    });

    it('Should not focus on field when "autoFocus" property is not specified', () => {
        const component = mount(<Select {...selectTypes.select} />);
        expect(component.find('select').prop('autoFocus')).toBeUndefined();

        const select = component.find('select').instance();
        const focusedElement = document.activeElement;
        expect(select).not.toBe(focusedElement);
    });

    it('Should not call "onChange" for "readOnly" select', () => {
        const component = shallow(<Select {...selectTypes.selectReadOnlyOnChange} />);
        expect(component).toMatchSnapshot();

        const select = component.find('select');
        select.simulate('change', {target: {value: 'Random Value'}});
        expect(selectTypes.selectReadOnlyOnChange.onChange).not.toHaveBeenCalled();
    });

    it('Should not change value for "readOnly" field', () => {
        const component = shallow(<Select {...selectTypes.selectReadOnlyValue} />);
        const select = component.find('select');
        expect(component).toMatchSnapshot();

        select.simulate('change', {target: {value: 'test'}});
        expect(component.state().value).toBe('YYYYYY');
    });

    it('Should call "onChange" when an option is selected', () => {
        selectTypes.selectOnChange.onChange.mockReset();
        const component = shallow(<Select {...selectTypes.selectOnChange} />);
        const select = component.find('select');
        expect(component).toMatchSnapshot();

        select.simulate('change', {target: {value: 'store2'}});
        expect(selectTypes.selectOnChange.onChange).toHaveBeenCalled();
        expect(selectTypes.selectOnChange.onChange).toHaveBeenCalledTimes(1);
    });

    it('Should call "onChange" on blur', () => {
        selectTypes.selectOnChange.onChange.mockReset();
        const component = mount(<Select {...selectTypes.selectOnChange} />);
        const select = component.find('select');

        select.simulate('blur');
        expect(selectTypes.selectOnChange.onChange).toHaveBeenCalled();
        expect(selectTypes.selectOnChange.onChange).toHaveBeenCalledTimes(1);
    });

    it('Should wrap element with "invalid" class on blur and no value selected', () => {
        const component = mount(<Select {...selectTypes.selectOnChange} />);
        const select = component.find('select');

        select.simulate('blur');
        expect(component.exists('.invalid')).toBe(true);
    });

    it('Should wrap element with "valid" class on blur and a value selected', () => {
        const component = mount(<Select {...selectTypes.selectOnChange} />);
        const select = component.find('select');

        select.simulate('change', {target: {value: 'store2'}});
        select.simulate('blur');
        expect(component.exists('.valid')).toBe(true);
    });

    it('Should show correct number of "options"', () => {
        const component = mount(<Select {...selectTypes.selectOnChange} />);
        const options = component.find('option');
        expect(options.length).toBe(3);

        const dataLength = Object.keys(component.prop('data')).length;
        expect(options.length).toBe(dataLength + 1);
    });

    it('Should show correct number of "options" for readOnly select', () => {
        const component = mount(<Select {...selectTypes.selectReadOnlyOnChange} />);

        const options = component.find('option');
        expect(options.length).toBe(2);

        const dataLength = Object.keys(component.prop('data')).length;
        expect(options.length).toBe(dataLength);
    });

    it('Should render "options" to match data correctly when "descriptor" property not passed', () => {
        const component = mount(<Select {...selectTypes.selectWithDataMapping} />);

        const options = component.find('option');
        options.forEach((option, index) => {
            if (!option.exists('.placeholder')) {
                expect(option.prop('value')).toBe(option.text());
                expect(option.prop('value')).toBe(Object.keys(selectTypes.selectWithDataMapping.data)[index - 1]);
            }
        });
    });

    it('Should render "options" to match data correctly when "number" "descriptor" passed', () => {
        const component = mount(<Select {...selectTypes.selectWithDataMappingAndNumberDescriptor} />);

        const options = component.find('option');
        options.forEach((option, index) => {
            if (!option.exists('.placeholder')) {
                const optionValue = option.prop('value');
                const dataNumber = selectTypes.selectWithDataMapping.data[optionValue].number;
                expect(optionValue).toBe(Object.keys(selectTypes.selectWithDataMapping.data)[index - 1]);
                expect(option.text()).toBe(optionValue + ' - ' + dataNumber);
            }
        });
    });

    it('Should render "options" to match data correctly when "storeNumber" "descriptor" passed', () => {
        const component = mount(<Select {...selectTypes.selectWithDataMappingAndStoreNumberDescriptor} />);

        const options = component.find('option');
        options.forEach((option, index) => {
            if (!option.exists('.placeholder')) {
                const optionValue = option.prop('value');
                const dataStoreNumber = selectTypes.selectWithDataMapping.data[optionValue].storeNumber;
                expect(optionValue).toBe(Object.keys(selectTypes.selectWithDataMapping.data)[index - 1]);
                expect(option.text()).toBe(optionValue + ' - ' + dataStoreNumber);
            }
        });
    });
});
