import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

export default class EnzymeAdapter {
    static config = () => {
        return configure({ adapter: new Adapter() });
    }
}
