import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StoreDetails from '../StoreDetails/StoreDetails';

configure({ adapter: new Adapter() });

describe('<StoreDetails />', () => {
    const props = {
            store: {
                storeNumber: 'XX9999',
                brandName: 'RANDOM BRAND',
                name: 'LETSBY AVENUE',
                email: 'store@email.address',
                phone: '020 999 8888'
            }
        };
    const wrapper = shallow(<StoreDetails {...props} />);

    it ('Should bring values through from props', () => {
        const props = wrapper.instance().props;
        expect (typeof props.store).toBe('object');
        expect (props.store.storeNumber).toBe('XX9999');
        expect (props.store.brandName).toBe('RANDOM BRAND');
        expect (props.store.name).toBe('LETSBY AVENUE');
        expect (props.store.email).toBe('store@email.address');
        expect (props.store.phone).toBe('020 999 8888');
    });

    it ('Should render as a "div" element, with class of "store-details"', () => {
        expect (wrapper.is('div')).toBe(true);
        expect (wrapper.hasClass('store-details')).toBe(true);
    });

    it ('Should display Store Number from props', () => {
        expect (wrapper.find('#storeNumber').text()).toBe('XX9999');
    });

    it ('Should display Brand Name from props', () => {
        expect (wrapper.find('#brandName').text()).toBe('RANDOM BRAND');
    });

    it ('Should display Store Name from props', () => {
        expect (wrapper.find('#storeName').text()).toBe('LETSBY AVENUE');
    });

    it ('Should render Store Email icon', () => {
        const storeEmail = wrapper.find('#storeEmail span');
        expect (storeEmail.hasClass('icon')).toBe(true);
        expect (storeEmail.hasClass('mail')).toBe(true);
    });

    it ('Should display Store Email from props', () => {
        expect (wrapper.find('#storeEmail').text()).toBe('store@email.address');
    });

    it ('Should render Store Phone icon', () => {
        const storeEmail = wrapper.find('#storePhone span');
        expect (storeEmail.hasClass('icon')).toBe(true);
        expect (storeEmail.hasClass('phone')).toBe(true);
    });

    it ('Should display Store Phone from props', () => {
        expect (wrapper.find('#storePhone').text()).toBe('020 999 8888');
    });
});
