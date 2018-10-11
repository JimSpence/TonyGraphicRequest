import React from 'react';
import EnzymeAdapter from '../test_helpers/EnzymeAdapter';
import jsdom from 'jsdom';
import TestUtils from '../test_helpers/TestUtils';
import Utils from "./Utils";

describe('"Utils" Service', () => {
    const doc = jsdom.jsdom('<!doctype html><html><body><div id="root"></div><div id="fred"></div></body></html>');
    global.document = doc;

    EnzymeAdapter.config();
    TestUtils.noConsoleErrors();

    describe('"Blur" tests', () => {
        it('Should blur background when "blurBackground" method called', () => {
            Utils.blurBackground();
            expect(document.getElementById('root').classList.contains('blur5')).toBe(true);
            document.getElementById('root').classList.remove('blur5');
        });

        it('Should blur background on element when "blurBackground" method called and "id" passed', () => {
            Utils.blurBackground('fred');
            expect(document.getElementById('root').classList.contains('blur5')).toBe(false);
            expect(document.getElementById('fred').classList.contains('blur5')).toBe(true);
        });
    });

    describe('"Unblur" tests', () => {
        it('Should unblur background when "unblurBackground" method called', () => {
            document.getElementById('root').classList.add('blur5');
            expect(document.getElementById('root').classList.contains('blur5')).toBe(true);

            Utils.unblurBackground();
            expect(document.getElementById('root').classList.contains('blur5')).toBe(false);
        });

        it('Should unblur background on element when "unblurBackground" method called and "id" passed', () => {
            document.getElementById('fred').classList.add('blur5');
            expect(document.getElementById('fred').classList.contains('blur5')).toBe(true);
            expect(document.getElementById('root').classList.contains('blur5')).toBe(false);

            Utils.unblurBackground('fred');
            expect(document.getElementById('fred').classList.contains('blur5')).toBe(false);
            expect(document.getElementById('root').classList.contains('blur5')).toBe(false);
        });
    });

    describe('"PadWithZeros" tests', () => {
        it('Should zero pad value to length specified', () => {
            expect(Utils.padWithZeros(1, 5)).toBe('00001');
            expect(Utils.padWithZeros(27, 10)).toBe('0000000027');
            expect(Utils.padWithZeros(99, 3)).toBe('099');
            expect(Utils.padWithZeros(99, 1)).toBe('99');
            expect(Utils.padWithZeros(7)).toBe('7');
        });
    });

    describe('"SortByKey" tests', () => {
        it('Should sort object key by field specified (in ascending order)', () => {
            const data = TestUtils.dataForSort().randomOrder;
            const sortedData = Object.keys(data).sort(Utils.sortByKey(data, 'forename'));
            expect(sortedData).toEqual(TestUtils.dataForSort().keysSortedByForeNameAscending);
        });

        it('Should sort object key by field specified (in descending order)', () => {
            const data = TestUtils.dataForSort().randomOrder;
            const descending = true;
            const sortedData = Object.keys(data).sort(Utils.sortByKey(data, 'forename', descending));
            expect(sortedData).toEqual(TestUtils.dataForSort().keysSortedByForeNameDescending);
        });

        it('Should sort object key by numeric field specified (in ascending order)', () => {
            const data = TestUtils.dataForSort().randomOrder;
            const sortedData = Object.keys(data).sort(Utils.sortByKey(data, 'age'));
            expect(sortedData).toEqual(TestUtils.dataForSort().keysSortedByAgeAscending);
        });

        it('Should sort object key by numeric field specified (in descending order)', () => {
            const data = TestUtils.dataForSort().randomOrder;
            const descending = true;
            const sortedData = Object.keys(data).sort(Utils.sortByKey(data, 'age', descending));
            expect(sortedData).toEqual(TestUtils.dataForSort().keysSortedByAgeDescending);
        });

        it('Should sort object key by date field specified (in ascending order)', () => {
            const data = TestUtils.dataForSort().randomOrder;
            const descending = true;
            const dateSort = true;
            const sortedData = Object.keys(data).sort(Utils.sortByKey(data, 'startDate', !descending, dateSort));
            expect(sortedData).toEqual(TestUtils.dataForSort().keysSortedByStartDateAscending);
        });

        it('Should sort object key by date field specified (in descending order)', () => {
            const data = TestUtils.dataForSort().randomOrder;
            const descending = true;
            const dateSort = true;
            const sortedData = Object.keys(data).sort(Utils.sortByKey(data, 'startDate', descending, dateSort));
            expect(sortedData).toEqual(TestUtils.dataForSort().keysSortedByStartDateDescending);
        });
    });
});
