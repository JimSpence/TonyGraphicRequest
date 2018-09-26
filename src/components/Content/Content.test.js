import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Content from '../Content/Content';
import Summary from '../Summary/Summary';

configure({ adapter: new Adapter() });

describe ('<Content />', () => {
    const wrapper = shallow(<Content/>);

    it ('Should render as a "section" element', () => {
        expect (wrapper.is('section')).toBe(true);
    });

    it ('Should have "content" class', () => {
        expect (wrapper.hasClass('content')).toBe(true);
    });

    it ('Should render the "Summary" component', () => {
        expect (wrapper.contains(<Summary/>)).toBe(true);
    });
});
