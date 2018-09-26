import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PageHeader from '../PageHeader/PageHeader';

configure({ adapter: new Adapter() });

describe('<PageHeader />', () => {

    const wrapper = shallow(<PageHeader/>);
    const headerText = 'Graphic Request';

    it ('Should render as a "header" element', () => {
        expect (wrapper.is('header')).toBe(true);
    });

    it ('Should render an Arcadia logo element ', () => {
        expect (wrapper.find('img').first().hasClass('arcadia-logo')).toBe(true);
        expect (wrapper.exists('img.arcadia-logo')).toBe(true);
    });

    it ('Should render an REACT logo element ', () => {
        expect (wrapper.find('img').last().hasClass('react-logo')).toBe(true);
        expect (wrapper.exists('img.react-logo')).toBe(true);
    });

    it ('Should show "src", "alt" and "title" attributes for img elements', () => {
        const firstImage = wrapper.first('img').html();
        expect (firstImage.indexOf('src')).not.toBe(-1);
        expect (firstImage.indexOf('alt')).not.toBe(-1);
        expect (firstImage.indexOf('title')).not.toBe(-1);

        const lastImage = wrapper.last('img').html();
        expect (lastImage.indexOf('src')).not.toBe(-1);
        expect (lastImage.indexOf('alt')).not.toBe(-1);
        expect (lastImage.indexOf('title')).not.toBe(-1);
    });

    it ('Should render an "H1" element', () => {
        expect (wrapper.exists('h1')).toBe(true);
    });

    it ('Should render header text', () => {
        expect (wrapper.find('h1').text()).toBe(headerText);
    })
});