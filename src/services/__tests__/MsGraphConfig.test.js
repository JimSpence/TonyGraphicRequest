import React from 'react';
import TestUtils from '../../test_helpers/TestUtils';
import {msGraphConfig} from "../MsGraphConfig";

TestUtils.noConsoleErrors();
describe('"MsGraphConfig" tests', () => {
    it('Should return msGraphConfig object', () => {
        expect(Object.keys(msGraphConfig).length).toBe(4);
        expect(msGraphConfig).toMatchSnapshot();
    });
});
