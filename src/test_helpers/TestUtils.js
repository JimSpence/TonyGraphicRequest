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

    static populateDealerOrders() {
        return {
            dealerOrders: {
                Request0001: {
                    contactName: 'Jimmy',
                    tyreOrders: {
                        TyreOrder0001: {
                            tyreWidth: '175',
                            tyreProfile: '75',
                            tyreRimSize: '14',
                            tyreSpeedRating: 'W',
                            season: 'SS',
                            vehicleMake: 'AD'
                        },
                        TyreOrder0002: {
                            tyreWidth: '185',
                            tyreProfile: '65',
                            tyreRimSize: '15',
                            tyreSpeedRating: 'V',
                            season: 'SS',
                            vehicleMake: 'FD'
                        },
                        TyreOrder0003: {
                            tyreWidth: '165',
                            tyreProfile: '65',
                            tyreRimSize: '15',
                            tyreSpeedRating: 'W',
                            season: 'AW',
                            vehicleMake: 'VW'
                        }
                    },
                    requestDate: 'Fri Sep 14 2018 16:20:39 GMT+0100 (British Summer Time)',
                    dealer: {
                        brandCode: 'SM',
                        brandName: 'SOME BRAND',
                        dealerNumber: 'SM1111',
                        email: 'this.dealer@somehere.com',
                        name: 'This Dealer',
                        number: '1111',
                        phone: '020 333 9999'
                    }
                },
                Request0002: {
                    contactName: 'Mary',
                    tyreOrders: {
                        TyreOrder0004: {
                            tyreWidth: '205',
                            tyreProfile: '45',
                            tyreRimSize: '18',
                            tyreSpeedRating: 'V',
                            season: 'SS',
                            vehicleMake: 'MZ'
                        }
                    },
                    requestDate: 'Tue Sep 11 2018 11:11:12 GMT+0100 (British Summer Time)',
                    dealer: {
                        brandCode: 'XX',
                        brandName: 'THIS BRAND',
                        dealerNumber: 'XX2222',
                        email: 'some.dealer@somehere.com',
                        name: 'Some Dealer',
                        number: '2222',
                        phone: '020 444 8888'
                    }
                },
                Request0003: {
                    contactName: 'Nigel',
                    tyreOrders: {
                        TyreOrder0005: {
                            tyreWidth: '215',
                            tyreProfile: '35',
                            tyreRimSize: '20',
                            tyreSpeedRating: 'W',
                            season: 'SS',
                            vehicleMake: 'MZ'
                        },
                        TyreOrder0006: {
                            tyreWidth: '195',
                            tyreProfile: '65',
                            tyreRimSize: '17',
                            tyreSpeedRating: 'H',
                            season: 'AW',
                            vehicleMake: 'NI'
                        }
                    },
                    requestDate: 'Thu Sep 27 2018 15:11:59 GMT+0100 (British Summer Time)',
                    dealer: {
                        brandCode: 'YY',
                        brandName: 'MY BRAND',
                        dealerNumber: 'YY4444',
                        email: 'my.dealer@somehere.com',
                        name: 'My Dealer',
                        number: '4444',
                        phone: '020 777 3333'
                    }
                },
                Request0004: {
                    contactName: 'Susan',
                    tyreOrders: {
                        TyreOrder0007: {
                            tyreWidth: '175',
                            tyreProfile: '75',
                            tyreRimSize: '16',
                            tyreSpeedRating: 'U',
                            season: 'AW',
                            vehicleMake: 'CT'
                        },
                        TyreOrder0008: {
                            tyreWidth: '195',
                            tyreProfile: '55',
                            tyreRimSize: '17',
                            tyreSpeedRating: 'H',
                            season: 'SS',
                            vehicleMake: 'MT'
                        },
                        TyreOrder0009: {
                            tyreWidth: '145',
                            tyreProfile: '65',
                            tyreRimSize: '14',
                            tyreSpeedRating: 'U',
                            season: 'SS',
                            vehicleMake: 'RN'
                        }
                    },
                    requestDate: 'Tue Sep 18 2018 14:19:57 GMT+0100 (British Summer Time)',
                    sentDate: 'Tue Sep 18 2018 14:20:02 GMT+0100 (British Summer Time)',
                    dealer: {
                        brandCode: 'WW',
                        brandName: 'YOUR BRAND',
                        dealerNumber: 'WW6666',
                        email: 'your.dealer@somehere.com',
                        name: 'Your Dealer',
                        number: '6666',
                        phone: '020 111 4444'
                    }
                },
                Request0005: {
                    contactName: 'Beckie',
                    tyreOrders: {
                        TyreOrder0010: {
                            tyreWidth: '185',
                            tyreProfile: '55',
                            tyreRimSize: '16',
                            tyreSpeedRating: 'V',
                            season: 'SS',
                            vehicleMake: 'TY'
                        },
                        TyreOrder0011: {
                            tyreWidth: '205',
                            tyreProfile: '65',
                            tyreRimSize: '17',
                            tyreSpeedRating: 'V',
                            season: 'SS',
                            vehicleMake: 'BM'
                        },
                        TyreOrder0012: {
                            tyreWidth: '215',
                            tyreProfile: '35',
                            tyreRimSize: '17',
                            tyreSpeedRating: 'W',
                            season: 'SS',
                            vehicleMake: 'AD'
                        },
                        TyreOrder0013: {
                            tyreWidth: '155',
                            tyreProfile: '55',
                            tyreRimSize: '15',
                            tyreSpeedRating: 'U',
                            season: 'SS',
                            vehicleMake: 'DC'
                        }
                    },
                    requestDate: 'Fri Sep 14 2018 16:27:24 GMT+0100 (British Summer Time)',
                    sentDate: 'Tue Sep 18 2018 14:20:02 GMT+0100 (British Summer Time)',
                    dealer: {
                        brandCode: 'ZZ',
                        brandName: 'SOME BRAND',
                        dealerNumber: 'ZZ1111',
                        email: 'this.dealer@somehere.com',
                        name: 'This Dealer',
                        number: '1111',
                        phone: '020 333 9999'
                    }
                },
                Request0006: {
                    contactName: 'Olivia',
                    tyreOrders: {
                        TyreOrder0014: {
                            tyreWidth: '165',
                            tyreProfile: '65',
                            tyreRimSize: '16',
                            tyreSpeedRating: 'U',
                            season: 'AW',
                            vehicleMake: 'FD'
                        }
                    },
                    requestDate: 'Thu Sep 27 2018 15:11:59 GMT+0100 (British Summer Time)',
                    dealer: {
                        brandCode: 'XX',
                        brandName: 'THIS BRAND',
                        dealerNumber: 'XX2222',
                        email: 'some.dealer@somehere.com',
                        name: 'Some Dealer',
                        number: '2222',
                        phone: '020 444 8888'
                    }
                },
                Request0007: {
                    contactName: 'Pedro',
                    tyreOrders: {
                        TyreOrder0015: {
                            tyreWidth: '175',
                            tyreProfile: '75',
                            tyreRimSize: '14',
                            tyreSpeedRating: 'H',
                            season: 'SS',
                            vehicleMake: 'MB'
                        }
                    },
                    requestDate: 'Thu Sep 27 2018 12:02:23 GMT+0100 (British Summer Time)',
                    dealer: {
                        brandCode: 'YY',
                        brandName: 'MY BRAND',
                        dealerNumber: 'YY4444',
                        email: 'my.dealer@somehere.com',
                        name: 'My Dealer',
                        number: '4444',
                        phone: '020 777 3333'
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
                    dealer: {
                        number: 123
                    }
                },
                id: 'selectId',
                title: 'Select Title'
            },
            selectReadOnly: {
                data: {
                    dealer: {
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
                    dealer: {
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
                    dealer: {
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
                },
                user6: {
                    forename: 'Mark',
                    surname: 'Bennett',
                    startDate: null,
                    age: 42
                },
                user7: {
                    forename: 'Paul',
                    surname: 'Wilson',
                    startDate: null,
                    age: 43
                }
            },
            keysSortedByForeNameAscending: [
                'user5',
                'user6',
                'user2',
                'user7',
                'user3',
                'user4',
                'user1'
            ],
            keysSortedByForeNameDescending: [
                'user1',
                'user4',
                'user3',
                'user7',
                'user2',
                'user6',
                'user5'
            ],
            keysSortedByAgeAscending: [
                'user6',
                'user7',
                'user5',
                'user4',
                'user1',
                'user2',
                'user3'
            ],
            keysSortedByAgeDescending: [
                'user3',
                'user2',
                'user1',
                'user4',
                'user5',
                'user7',
                'user6'
            ],
            keysSortedByStartDateAscending: [
                'user6',
                'user7',
                'user3',
                'user1',
                'user4',
                'user5',
                'user2'
            ],
            keysSortedByStartDateDescending: [
                'user2',
                'user5',
                'user4',
                'user1',
                'user3',
                'user6',
                'user7'
            ],
        }
    }

    static dealerOrderForEmail() {
        return {
            contactName: 'Mickey Mouse',
            tyreOrders: {
                TYREORDER1: {
                    tyreWidth: '155',
                    tyreProfile: '55',
                    tyreRimSize: '15',
                    tyreSpeedRating: 'U',
                    season: 'SS',
                    vehicleMake: 'DC',
                    quantity: '1',
                    reason: 'Random Reason 1',
                },
                TYREORDER2: {
                    tyreWidth: '195',
                    tyreProfile: '55',
                    tyreRimSize: '16',
                    tyreSpeedRating: 'U',
                    season: 'SS',
                    vehicleMake: 'AD',
                    quantity: '2',
                    reason: 'Random Reason 2',
                },
                TYREORDER3: {
                    tyreWidth: '155',
                    tyreProfile: '55',
                    tyreRimSize: '15',
                    tyreSpeedRating: 'U',
                    season: 'SS',
                    vehicleMake: 'DC',
                    quantity: '3',
                    reason: 'Random Reason 3',
                }
            },
            requestDate: 'Thu Sep 27 2018 15:11:59 GMT+0100 (British Summer Time)',
            sentDate: 'Thu Oct 11 2018 11:19:32 GMT+0100 (British Summer Time)',
            dealer: {
                brandCode: 'MM',
                brandName: 'Random Brand',
                dealerNumber: 'MM2299',
                email: 'random.dealer@randombrand.com',
                name: 'Random Dealer',
                number: '2299',
                phone: '0099 999 9991',
            }
        }
    }

    static dealerOrderEmailXml() {
        return "<?xml version='1.0'?>\n" +
                "<dealer_order>\n" +
                    "    <dealer id='MM' number='2299' contact_name='Mickey Mouse' contact_tel_number='0099 999 9991'>Random Dealer</dealer>\n" +
                    "    <tyreOrder quantity='1' reason='Random Reason 1'>TYREORDER1</tyreOrder>\n" +
                    "    <tyreOrder quantity='2' reason='Random Reason 2'>TYREORDER2</tyreOrder>\n" +
                    "    <tyreOrder quantity='3' reason='Random Reason 3'>TYREORDER3</tyreOrder>\n" +
                "</dealer_order>";
    }

    static randomArrayOfObjects() {
        return [{
            id: 1,
            forename: 'Tucker',
            surname: 'Jenkins',
            age: 53
        }, {
            id: 2,
            forename: 'Trisha',
            surname: 'Yates',
            age: 56
        }, {
            id: 3,
            forename: 'Samuel',
            surname: 'Maguire',
            age: 58
        }, {
            id: 4,
            forename: 'Fay',
            surname: 'Lucas',
            age: 49
        }, {
            id: 5,
            forename: 'Annette',
            surname: 'Firman',
            age: 47
        }, {
            id: 6,
            forename: 'Benny',
            surname: 'Green',
            age: 42
        }, {
            id: 7,
            forename: 'Michael',
            surname: 'Doyle',
            age: 43
        }];
    }

    static objectConvertedFromArray() {
        return {
            1: {
                age: 53,
                forename: 'Tucker',
                id: 1,
                surname: 'Jenkins'
                },
            2: {
                age: 56,
                forename: 'Trisha',
                id: 2,
                surname: 'Yates'
                },
            3: {
                age: 58,
                forename: 'Samuel',
                id: 3,
                surname: 'Maguire'
                },
            4: {
                age: 49,
                forename: 'Fay',
                id: 4,
                surname: 'Lucas'
                },
            5: {
                age: 47,
                forename: 'Annette',
                id: 5,
                surname: 'Firman'
                },
            6: {
                age: 42,
                forename: 'Benny',
                id: 6,
                surname: 'Green'
                },
            7: {
                age: 43,
                forename: 'Michael',
                id: 7,
                surname: 'Doyle'
            }
        }
    }
}
