import sinon from 'sinon';

export default class TestUtils {

    // The purpose of this function is to fail if any console errors are generated.
    // One of the main causes being where "props" to not match the component "propType" definition.
    static noConsoleErrors() {
        beforeEach(() => {
            sinon.stub(console, 'error');
        });

        afterEach(() => {
            sinon.assert.notCalled(console.error);
            console.error.restore();
        });
    }

    static populateGraphicRequests() {
        return {
            graphicRequests: {
                Request0001: {
                    contactName: 'Jimmy',
                    graphics: {
                        Graphic0001: {
                            artworkNumber: '0004',
                            jobCategory: 'WW',
                            jobNumber: '00099',
                            reason: 'Reason 1',
                            season: 'AW'
                        },
                        Graphic0002: {
                            artworkNumber: '0077',
                            jobCategory: 'GG',
                            jobNumber: '00232',
                            reason: 'Reason 2',
                            season: 'SS'
                        },
                        Graphic0003: {
                            artworkNumber: '2121',
                            jobCategory: 'AA',
                            jobNumber: '00776',
                            reason: 'Reason 3',
                            season: 'AW'
                        }
                    },
                    requestDate: 'Fri Sep 14 2018 16:20:39 GMT+0100 (British Summer Time)',
                    store: {
                        brandCode: 'ZZ',
                        brandName: 'SOME BRAND',
                        email: 'this.branch@somehere.com',
                        name: 'This Branch',
                        number: '1111',
                        phone: '020 333 9999',
                        storeNumber: 'ZZ1111'
                    }
                },
                Request0002: {
                    contactName: 'Mary',
                    graphics: {
                        Graphic0004: {
                            artworkNumber: '0001',
                            jobCategory: 'SS',
                            jobNumber: '00023',
                            reason: 'Reason 1',
                            season: 'SS'
                        }
                    },
                    requestDate: 'Tue Sep 11 2018 11:11:12 GMT+0100 (British Summer Time)',
                    store: {
                        brandCode: 'XX',
                        brandName: 'THIS BRAND',
                        email: 'some.branch@somehere.com',
                        name: 'Some Branch',
                        number: '2222',
                        phone: '020 444 8888',
                        storeNumber: 'XX2222'
                    }
                },
                Request0003: {
                    contactName: 'Nigel',
                    graphics: {
                        Graphic0005: {
                            artworkNumber: '0014',
                            jobCategory: 'DD',
                            jobNumber: '00009',
                            reason: 'Reason 3',
                            season: 'SS'
                        },
                        Graphic0006: {
                            artworkNumber: '0077',
                            jobCategory: 'HH',
                            jobNumber: '00111',
                            reason: 'Reason 4',
                            season: 'AW'
                        }
                    },
                    requestDate: 'Thu Sep 27 2018 15:11:59 GMT+0100 (British Summer Time)',
                    store: {
                        brandCode: 'YY',
                        brandName: 'MY BRAND',
                        email: 'my.branch@somehere.com',
                        name: 'My Branch',
                        number: '4444',
                        phone: '020 777 3333',
                        storeNumber: 'YY4444'
                    }
                },
                Request0004: {
                    contactName: 'Susan',
                    graphics: {
                        Graphic0007: {
                            artworkNumber: '0008',
                            jobCategory: 'LL',
                            jobNumber: '00078',
                            reason: 'Reason 2',
                            season: 'SS'
                        },
                        Graphic0008: {
                            artworkNumber: '0091',
                            jobCategory: 'OO',
                            jobNumber: '00854',
                            reason: 'Reason 4',
                            season: 'SS'
                        },
                        Graphic0009: {
                            artworkNumber: '0033',
                            jobCategory: 'KK',
                            jobNumber: '00121',
                            reason: 'Reason 1',
                            season: 'AW'
                        }
                    },
                    requestDate: 'Tue Sep 18 2018 14:19:57 GMT+0100 (British Summer Time)',
                    sentDate: 'Tue Sep 18 2018 14:20:02 GMT+0100 (British Summer Time)',
                    store: {
                        brandCode: 'WW',
                        brandName: 'YOUR BRAND',
                        email: 'your.branch@somehere.com',
                        name: 'Your Branch',
                        number: '6666',
                        phone: '020 111 4444',
                        storeNumber: 'WW6666'
                    }
                },
                Request0005: {
                    contactName: 'Beckie',
                    graphics: {
                        Graphic0010: {
                            artworkNumber: '0424',
                            jobCategory: 'ZZ',
                            jobNumber: '10101',
                            reason: 'Reason 3',
                            season: 'AW'
                        },
                        Graphic0011: {
                            artworkNumber: '7070',
                            jobCategory: 'UU',
                            jobNumber: '202020',
                            reason: 'Reason 3',
                            season: 'SS'
                        },
                        Graphic0012: {
                            artworkNumber: '8282',
                            jobCategory: 'RF',
                            jobNumber: '76765',
                            reason: 'Reason 2',
                            season: 'AW'
                        },
                        Graphic0013: {
                            artworkNumber: '2323',
                            jobCategory: 'JJ',
                            jobNumber: '15151',
                            reason: 'Reason 4',
                            season: 'SS'
                        }
                    },
                    requestDate: 'Fri Sep 14 2018 16:27:24 GMT+0100 (British Summer Time)',
                    sentDate: 'Tue Sep 18 2018 14:20:02 GMT+0100 (British Summer Time)',
                    store: {
                        brandCode: 'ZZ',
                        brandName: 'SOME BRAND',
                        email: 'this.branch@somehere.com',
                        name: 'This Branch',
                        number: '1111',
                        phone: '020 333 9999',
                        storeNumber: 'ZZ1111'
                    }
                },
                Request0006: {
                    contactName: 'Olivia',
                    graphics: {
                        Graphic0014: {
                            artworkNumber: '0031',
                            jobCategory: 'SX',
                            jobNumber: '00009',
                            reason: 'Reason 1',
                            season: 'AW'
                        }
                    },
                    requestDate: 'Thu Sep 27 2018 15:11:59 GMT+0100 (British Summer Time)',
                    store: {
                        brandCode: 'XX',
                        brandName: 'THIS BRAND',
                        email: 'some.branch@somehere.com',
                        name: 'Some Branch',
                        number: '2222',
                        phone: '020 444 8888',
                        storeNumber: 'XX2222'
                    }
                },
                Request0007: {
                    contactName: 'Pedro',
                    graphics: {
                        Graphic0015: {
                            artworkNumber: '0010',
                            jobCategory: 'EE',
                            jobNumber: '00079',
                            reason: 'Reason 1',
                            season: 'SS'
                        }
                    },
                    requestDate: 'Thu Sep 27 2018 12:02:23 GMT+0100 (British Summer Time)',
                    store: {
                        brandCode: 'YY',
                        brandName: 'MY BRAND',
                        email: 'my.branch@somehere.com',
                        name: 'My Branch',
                        number: '4444',
                        phone: '020 777 3333',
                        storeNumber: 'YY4444'
                    }
                }
            }
        }
    }

    static fieldTypes() {
        const onChange = jest.fn();

        return {
            baseField: {
                id: 'inputField',
                title: 'Input Field'
            },
            baseReadOnlyField: {
                id: 'inputField',
                readOnly: true,
                title: 'Input Field'
            },
            allPropertiesBaseField: {
                autoFocus: true,
                className: 'all-properties',
                id: 'allPropsField',
                maxLength: 10,
                minLength: 2,
                name: 'all-props-input-field',
                onChange: onChange,
                placeholder: 'Type something here',
                readOnly: false,
                title: 'All Properties Input Field',
                type: 'text',
                value: 'all props'
            },
            allPropertiesReadOnlyBaseField: {
                autoFocus: true,
                className: 'all-properties-readonly',
                id: 'allPropsReadOnlyField',
                maxLength: 11,
                minLength: 5,
                name: 'all-props-readonly-field',
                onChange: onChange,
                placeholder: 'Something goes here',
                readOnly: true,
                title: 'All Properties ReadOnly Field',
                type: 'text',
                value: 'all props read only'
            },
            autoFocusBaseField: {
                autoFocus: true,
                id: 'inputField',
                title: 'Autofocus Input Field'
            },
            classNameBaseField: {
                className: 'random-class',
                id: 'inputField',
                placeholder: 'Enter a value',
                title: 'Random Input Field'
            },
            placeHolderBaseField: {
                id: 'inputField',
                placeholder: 'Enter a value',
                title: 'Random Input Field'
            },
            baseTextField: {
                id: 'textInputField',
                title: 'Text Input Field',
                type: 'text'
            },
            readOnlyOnChangeTextField: {
                id: 'textInputField',
                onChange: onChange,
                readOnly: true,
                title: 'Text Input Field',
                type: 'text'
            },
            readOnlyTextFieldWithValue: {
                id: 'textInputField',
                readOnly: true,
                title: 'Text Input Field',
                type: 'text',
                value: 'XXXXXXX'
            },
            onChangeTextField: {
                id: 'textInputField',
                onChange: onChange,
                title: 'Text Input Field',
                type: 'text'
            },
            minLengthTextField: {
                id: 'textInputField',
                minLength: 3,
                title: 'Text Input Field',
                type: 'text'
            },
            maxLengthTextField: {
                id: 'textInputField',
                maxLength: 5,
                title: 'Text Input Field',
                type: 'text'
            },
            uppercaseTextField: {
                id: 'textInputField',
                title: 'Text Input Field',
                type: 'text',
                uppercase: true
            },
            capitaliseTextField: {
                capitalise: true,
                id: 'textInputField',
                title: 'Text Input Field',
                type: 'text'
            },
            zeroPadTextField: {
                id: 'textInputField',
                title: 'Text Input Field',
                type: 'text',
                zeroPad: true
            },
            minValueTextField: {
                id: 'textInputField',
                minValue: 99,
                title: 'Text Input Field',
                type: 'text'
            },
            baseNumberField: {
                id: 'numberInputField',
                title: 'Number Input Field',
                type: 'number'
            },
            readOnlyOnChangeNumberField: {
                id: 'numberInputField',
                onChange: onChange,
                readOnly: true,
                title: 'Number Input Field',
                type: 'number'
            },
            readOnlyNumberFieldWithValue: {
                id: 'numberInputField',
                readOnly: true,
                title: 'Number Input Field',
                type: 'number',
                value: '99999'
            },
            onChangeNumberField: {
                id: 'numberInputField',
                onChange: onChange,
                title: 'Number Input Field',
                type: 'number'
            },
            minLengthNumberField: {
                id: 'numberInputField',
                minLength: 3,
                title: 'Number Input Field',
                type: 'number'
            },
            maxLengthNumberField: {
                id: 'numberInputField',
                maxLength: 5,
                title: 'Number Input Field',
                type: 'number'
            },
            minValueNumberField: {
                id: 'numberInputField',
                minValue: 123,
                title: 'Number Input Field',
                type: 'number'
            },
            zeroPadNumberField: {
                id: 'numberInputField',
                maxLength: 6,
                title: 'Number Input Field',
                type: 'number',
                zeroPad: true
            },
            zeroPadNumberFieldNoMaxLength: {
                id: 'numberInputField',
                title: 'Number Input Field',
                type: 'number',
                zeroPad: true
            },
            baseAlphaOnlyField: {
                id: 'alphaOnlyInputField',
                title: 'Alpha Only Input Field',
                type: 'alphaOnly'
            },
            readOnlyAlphaOnlyFieldWithValue: {
                id: 'alphaOnlyInputField',
                readOnly: true,
                title: 'Alpha Only Input Field',
                type: 'alphaOnly',
                value: 'abcdefg'
            },
            onChangeAlphaOnlyField: {
                id: 'alphaOnlyInputField',
                onChange: onChange,
                title: 'Alpha Only Input Field',
                type: 'alphaOnly'
            },
            minLengthAlphaOnlyField: {
                id: 'alphaOnlyInputField',
                minLength: 6,
                title: 'Alpha Only Input Field',
                type: 'alphaOnly'
            },
            maxLengthAlphaOnlyField: {
                id: 'alphaOnlyInputField',
                maxLength: 8,
                title: 'Alpha Only Input Field',
                type: 'alphaOnly'
            },
            uppercaseAlphaOnlyField: {
                id: 'alphaOnlyInputField',
                title: 'Alpha Only Input Field',
                type: 'alphaOnly',
                uppercase: true
            },
            capitaliseAlphaOnlyField: {
                capitalise: true,
                id: 'alphaOnlyInputField',
                title: 'Alpha Only Input Field',
                type: 'alphaOnly'
            },
            zeroPadAlphaOnlyField: {
                id: 'alphaOnlyInputField',
                title: 'Alpha Only Input Field',
                type: 'alphaOnly',
                zeroPad: true
            },
            minValueAlphaOnlyField: {
                id: 'alphaOnlyInputField',
                minValue: 999,
                title: 'Alpha Only Input Field',
                type: 'alphaOnly'
            },

        }
    }

}
