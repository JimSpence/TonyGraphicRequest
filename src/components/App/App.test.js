import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Content from '../Content/Content';
import PageHeader from '../PageHeader/PageHeader';

configure({ adapter: new Adapter() });

describe ('<App />', () => {
    const wrapper = shallow(<App/>);

    it ('Should render as a "div" element', () => {
        expect (wrapper.is('div')).toBe(true);
    });

    it ('Should render the "Page Header" component', () => {
        expect (wrapper.contains(<PageHeader/>)).toBe(true);
    });

    it ('Should render the "Content" component', () => {
        expect (wrapper.contains(<Content/>)).toBe(true);
    });
});
