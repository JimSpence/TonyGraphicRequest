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

    describe('"blurBackground" tests', () => {
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

    describe('"unblurBackground" tests', () => {
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

    describe('"padWithZeros" tests', () => {
        it('Should zero pad value to length specified', () => {
            expect(Utils.padWithZeros(1, 5)).toBe('00001');
            expect(Utils.padWithZeros(27, 10)).toBe('0000000027');
            expect(Utils.padWithZeros(99, 3)).toBe('099');
            expect(Utils.padWithZeros(99, 1)).toBe('99');
            expect(Utils.padWithZeros(7)).toBe('7');
        });
    });

    describe('"sortByKey" tests', () => {
        it('Should sort object key by forename (in ascending order)', () => {
            const data = TestUtils.dataForSort().randomOrder;
            const sortedData = Object.keys(data).sort(Utils.sortByKey(data, 'forename'));
            expect(sortedData).toEqual(TestUtils.dataForSort().keysSortedByForeNameAscending);
        });

        it('Should sort object key by forename (in descending order)', () => {
            const data = TestUtils.dataForSort().randomOrder;
            const descending = true;
            const sortedData = Object.keys(data).sort(Utils.sortByKey(data, 'forename', descending));
            expect(sortedData).toEqual(TestUtils.dataForSort().keysSortedByForeNameDescending);
        });

        it('Should sort object key by numeric field - age (in ascending order)', () => {
            const data = TestUtils.dataForSort().randomOrder;
            const sortedData = Object.keys(data).sort(Utils.sortByKey(data, 'age'));
            expect(sortedData).toEqual(TestUtils.dataForSort().keysSortedByAgeAscending);
        });

        it('Should sort object key by numeric field - age (in descending order)', () => {
            const data = TestUtils.dataForSort().randomOrder;
            const descending = true;
            const sortedData = Object.keys(data).sort(Utils.sortByKey(data, 'age', descending));
            expect(sortedData).toEqual(TestUtils.dataForSort().keysSortedByAgeDescending);
        });

        it('Should sort object key by date field - startDate (in ascending order)', () => {
            const data = TestUtils.dataForSort().randomOrder;
            const descending = true;
            const dateSort = true;
            const sortedData = Object.keys(data).sort(Utils.sortByKey(data, 'startDate', !descending, dateSort));
            expect(sortedData).toEqual(TestUtils.dataForSort().keysSortedByStartDateAscending);
        });

        it('Should sort object key by date field - startDate (in descending order)', () => {
            const data = TestUtils.dataForSort().randomOrder;
            const descending = true;
            const dateSort = true;
            const sortedData = Object.keys(data).sort(Utils.sortByKey(data, 'startDate', descending, dateSort));
            expect(sortedData).toEqual(TestUtils.dataForSort().keysSortedByStartDateDescending);
        });
    });

    describe('"arrayToObject" tests', () => {
        it('Should convert array to object, using key field as index', () => {
            expect(Utils.arrayToObject(TestUtils.randomArrayOfObjects(), 'id')).toEqual(TestUtils.objectConvertedFromArray());
        });
    });

    describe('"arrayBufferToBase64" tests', () => {
        it('Should convert array buffer to Base64', () => {
            const typedArray = new Int8Array(8);
            typedArray[0] = 1;
            typedArray[1] = 2;
            typedArray[2] = 3;
            typedArray[3] = 4;
            typedArray[4] = 5;
            typedArray[5] = 6;
            typedArray[6] = 7;
            typedArray[7] = 8;
            expect(Utils.arrayBufferToBase64(typedArray)).toEqual('bnVsbAECAwQFBgcI');
        });
    });
});
