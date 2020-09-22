const flatten = require('./flattenFunctional');

describe('functional flatten', () => {
  test('flattens a nested object 1', () => {
    const oldObj = {
      name: 'Sara',
      gender: 'Apache Attack Helicopter',
      address: {
        location: {
          city: 'SF',
          state: 'CA',
        },
        preferredLocation: {
          city: 'SF',
          state: ['CA', 'MN'],
        },
        other: undefined,
      },
    };

    const expectedOutput = {
      oldObj_name: 'Sara',
      oldObj_gender: 'Apache Attack Helicopter',
      oldObj_address_location_city: 'SF',
      oldObj_address_location_state: 'CA',
      oldObj_address_preferredLocation_city: 'SF',
      oldObj_address_preferredLocation_state: ['CA', 'MN'],
      oldObj_address_other: undefined,
    };

    const flatObj = flatten(oldObj, 'oldObj');

    expect(flatObj).toStrictEqual(expectedOutput);
  });

  test('flattens a nested object 2', () => {
    const obj = {
      first: {
        second: {
          third: {
            number: 9999,
            null: null,
            undef: undefined,
            array: [1, 2, 3],
            fourth: {
              string: 'We got beets!',
            },
          },
        },
      },
    };

    const expectedOutput = {
      root_first_second_third_number: 9999,
      root_first_second_third_null: null,
      root_first_second_third_undef: undefined,
      root_first_second_third_array: [1, 2, 3],
      root_first_second_third_fourth_string: 'We got beets!',
    };

    const flatObj = flatten(obj, 'root');

    expect(flatObj).toStrictEqual(expectedOutput);
  });
});
