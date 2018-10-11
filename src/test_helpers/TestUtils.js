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
                labelText: 'All Properties Label Text',
                maxLength: 10,
                minLength: 2,
                name: 'all-props-input-field',
                onChange: onChange,
                placeholder: 'Type something here',
                readOnly: false,
                title: 'All Properties Input Field',
                value: 'all props'
            },
            allPropertiesReadOnlyBaseField: {
                autoFocus: true,
                className: 'all-properties-readonly',
                id: 'allPropsReadOnlyField',
                labelText: 'All Properties ReadOnly Label Text',
                maxLength: 11,
                minLength: 5,
                name: 'all-props-readonly-field',
                onChange: onChange,
                placeholder: 'Something goes here',
                readOnly: true,
                title: 'All Properties ReadOnly Field',
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
                title: 'Text Input Field'
            },
            readOnlyOnChangeTextField: {
                id: 'textInputField',
                onChange: onChange,
                readOnly: true,
                title: 'Text Input Field'
            },
            readOnlyTextFieldWithValue: {
                id: 'textInputField',
                readOnly: true,
                title: 'Text Input Field',
                value: 'XXXXXXX'
            },
            onChangeTextField: {
                id: 'textInputField',
                onChange: onChange,
                title: 'Text Input Field'
            },
            minLengthTextField: {
                id: 'textInputField',
                minLength: 3,
                title: 'Text Input Field'
            },
            maxLengthTextField: {
                id: 'textInputField',
                maxLength: 5,
                title: 'Text Input Field'
            },
            capitaliseTextField: {
                capitalise: true,
                id: 'textInputField',
                title: 'Text Input Field'
            },
            uppercaseTextField: {
                id: 'textInputField',
                title: 'Text Input Field',
                uppercase: true
            },
            alphaOnlyTextField: {
                alphaOnly: true,
                id: 'textInputField',
                title: 'Text Input Field'
            },
            capitaliseAlphaOnlyTextField: {
                alphaOnly: true,
                capitalise: true,
                id: 'textInputField',
                title: 'Text Input Field'
            },
            uppercaseAlphaOnlyTextField: {
                alphaOnly: true,
                id: 'textInputField',
                title: 'Text Input Field',
                uppercase: true
            },
            baseNumberField: {
                id: 'numberInputField',
                title: 'Number Input Field'
            },
            readOnlyOnChangeNumberField: {
                id: 'numberInputField',
                onChange: onChange,
                readOnly: true,
                title: 'Number Input Field'
            },
            readOnlyNumberFieldWithValue: {
                id: 'numberInputField',
                readOnly: true,
                title: 'Number Input Field',
                value: '99999'
            },
            onChangeNumberField: {
                id: 'numberInputField',
                onChange: onChange,
                title: 'Number Input Field'
            },
            minLengthNumberField: {
                id: 'numberInputField',
                minLength: 3,
                title: 'Number Input Field'
            },
            maxLengthNumberField: {
                id: 'numberInputField',
                maxLength: 5,
                title: 'Number Input Field'
            },
            minValueNumberField: {
                id: 'numberInputField',
                minValue: 123,
                title: 'Number Input Field'
            },
            zeroPadNumberField: {
                id: 'numberInputField',
                maxLength: 6,
                title: 'Number Input Field',
                zeroPad: true
            },
            zeroPadNumberFieldNoMaxLength: {
                id: 'numberInputField',
                title: 'Number Input Field',
                zeroPad: true
            }
        }
    }

    static selectTypes() {
        const onChange = jest.fn();

        return {
            select: {
                data: {
                    store: {
                        number: 123
                    }
                },
                id: 'selectId',
                title: 'Select Title'
            },
            selectReadOnly: {
                data: {
                    store: {
                        number: 888
                    }
                },
                id: 'selectReadOnlyId',
                readOnly: true,
                title: 'Select ReadOnly Title'
            },
            selectReadOnlyOnChange: {
                data: {
                    store1: {
                        number: 1333
                    },
                    store2: {
                        number: 2333
                    },
                },
                id: 'selectReadOnlyOnChangeId',
                onChange: onChange,
                readOnly: true,
                title: 'Select ReadOnly On Change Title'
            },
            selectReadOnlyValue: {
                data: {
                    store: {
                        number: 333
                    }
                },
                id: 'selectReadOnlyValueId',
                onChange: onChange,
                readOnly: true,
                title: 'Select ReadOnly Value Title',
                value: 'YYYYYY'
            },
            selectAllProperties: {
                autoFocus: true,
                className: 'selectAllPropertiesClass',
                data: {
                    TEST1: {
                        number: 1,
                        name: 'Test 1',
                    },
                    TEST2: {
                        number: 2,
                        name: 'Test 2',
                    }
                },
                id: 'selectAllPropertiesId',
                labelText: 'Select All Properties Label',
                name: 'selectAllPropertiesName',
                onChanee: onChange,
                placeholder: 'Make a selection',
                readOnly: false,
                title: 'Select All Properties Title',
                value: 'Select All Properties Value'
            },
            selectAutoFocus: {
                autoFocus: true,
                data: {
                    store: {
                        number: 777
                    }
                },
                id: 'selectAutoFocusId',
                title: 'Select AutoFocus Title'
            },
            selectOnChange: {
                data: {
                    store1: {
                        number: 333
                    },
                    store2: {
                        number: 222
                    },
                },
                id: 'selectOnChangeId',
                onChange: onChange,
                title: 'Select On Change Title'
            },
            selectWithDataMapping: {
                data: {
                    ST0001: {
                        number: '0001',
                        name: 'Store 0001',
                        storeNumber: 'STSN0001'
                    },
                    ST0002: {
                        number: '0002',
                        name: 'Store 0002',
                        storeNumber: 'STSN0002'
                    },
                    ST0003: {
                        number: '0003',
                        name: 'Store 0003',
                        storeNumber: 'STSN0003'
                    },
                    ST0004: {
                        number: '0004',
                        name: 'Store 0004',
                        storeNumber: 'STSN0004'
                    },
                    ST0005: {
                        number: '0005',
                        name: 'Store 0005',
                        storeNumber: 'STSN0005'
                    },
                },
                id: 'selectWithDataMappingId',
                onChange: onChange,
                title: 'Select With Data Mapping Title'
            },
            selectWithDataMappingAndNumberDescriptor: {
                data: {
                    ST0001: {
                        number: '0001',
                        name: 'Store 0001',
                        storeNumber: 'STSN0001'
                    },
                    ST0002: {
                        number: '0002',
                        name: 'Store 0002',
                        storeNumber: 'STSN0002'
                    },
                    ST0003: {
                        number: '0003',
                        name: 'Store 0003',
                        storeNumber: 'STSN0003'
                    },
                    ST0004: {
                        number: '0004',
                        name: 'Store 0004',
                        storeNumber: 'STSN0004'
                    },
                    ST0005: {
                        number: '0005',
                        name: 'Store 0005',
                        storeNumber: 'STSN0005'
                    },
                },
                descriptor: 'number',
                id: 'selectWithDataMappingId',
                onChange: onChange,
                title: 'Select With Data Mapping Title'
            },
            selectWithDataMappingAndStoreNumberDescriptor: {
                data: {
                    ST0001: {
                        number: '0001',
                        name: 'Store 0001',
                        storeNumber: 'STSN0001'
                    },
                    ST0002: {
                        number: '0002',
                        name: 'Store 0002',
                        storeNumber: 'STSN0002'
                    },
                    ST0003: {
                        number: '0003',
                        name: 'Store 0003',
                        storeNumber: 'STSN0003'
                    },
                    ST0004: {
                        number: '0004',
                        name: 'Store 0004',
                        storeNumber: 'STSN0004'
                    },
                    ST0005: {
                        number: '0005',
                        name: 'Store 0005',
                        storeNumber: 'STSN0005'
                    },
                },
                descriptor: 'storeNumber',
                id: 'selectWithDataMappingId',
                onChange: onChange,
                title: 'Select With Data Mapping Title'
            },

        }
    }

    static dataForSort() {
        return {
            randomOrder: {
                user1: {
                    forename: 'Tony',
                    surname: 'Ruddock',
                    startDate: new Date(2002, 2, 11),
                    age: 53
                },
                user2: {
                    forename: 'Nick',
                    surname: 'Forder',
                    startDate: new Date(2008, 2, 8),
                    age: 56
                },
                user3: {
                    forename: 'Peter',
                    surname: 'Yemchura',
                    startDate: new Date(1978, 7, 21),
                    age: 58
                },
                user4: {
                    forename: 'Philip',
                    surname: 'Harvey',
                    startDate: new Date(2002, 5, 16),
                    age: 49
                },
                user5: {
                    forename: 'Jim',
                    surname: 'Spence',
                    startDate: new Date(2008, 0, 4),
                    age: 47
                }
            },
            keysSortedByForeNameAscending: [
                'user5',
                'user2',
                'user3',
                'user4',
                'user1'
            ],
            keysSortedByForeNameDescending: [
                'user1',
                'user4',
                'user3',
                'user2',
                'user5'
            ],
            keysSortedByAgeAscending: [
                'user5',
                'user4',
                'user1',
                'user2',
                'user3',
            ],
            keysSortedByAgeDescending: [
                'user3',
                'user2',
                'user1',
                'user4',
                'user5',
            ],
            keysSortedByStartDateAscending: [
                'user3',
                'user1',
                'user4',
                'user5',
                'user2',
            ],
            keysSortedByStartDateDescending: [
                'user2',
                'user5',
                'user4',
                'user1',
                'user3',
            ],
        }
    }
}
