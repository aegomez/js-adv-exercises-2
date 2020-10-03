const { setProperty } = require('./setProperty');

describe('setProperty', () => {
  test('Creates a new deeply nested property', () => {
    const object = {};
    const value = 'The value';
    setProperty(object, 'path.to.nested.property', value);

    expect(object.path.to.nested.property).toEqual(value);
  });

  test('Assigns an existing deeply nested property', () => {
    const object = {
      prop: {
        already: {
          exists: {},
        },
      },
    };
    const value = 'Another one';
    setProperty(object, 'prop.already.exists', { one: value });
    setProperty(object, 'prop.already.exists.two', value);

    expect(object.prop.already.exists.one).toEqual(value);
    expect(object.prop.already.exists.two).toEqual(value);
  });

  test('Path properties that are objects, arrays or functions are valid', () => {
    const root = {
      public: {
        obj: {},
        arr: [],
        fun: () => true,
      },
    };
    setProperty(root, 'public.obj.key', 1);
    setProperty(root, 'public.arr.key', 2);
    setProperty(root, 'public.fun.key', 3);

    expect(root.public.obj.key).toEqual(1);
    expect(root.public.arr.key).toEqual(2);
    expect(root.public.fun.key).toEqual(3);
  });

  test('Path properties that are NOT objects, arrays or functions are not valid', () => {
    const object = {
      a: 'foo',
      b: 0,
      c: false,
      d: null,
      e: undefined,
    };
    const copy = { ...object };

    expect(() => setProperty(object, 'a.x', 5)).toThrow(
      'not an object, function or array'
    );
    expect(() => setProperty(object, 'b.x', 6)).toThrow(
      'not an object, function or array'
    );
    expect(() => setProperty(object, 'c.x', 7)).toThrow(
      'not an object, function or array'
    );
    expect(() => setProperty(object, 'd.x', 8)).toThrow(
      'not an object, function or array'
    );
    expect(() => setProperty(object, 'e.x', 9)).toThrow(
      'not an object, function or array'
    );

    expect(object).toEqual(copy);
  });

  test('Invalid inputs are rejected', () => {
    expect(() => setProperty()).toThrow('Invalid input');
    expect(() => setProperty({})).toThrow('Invalid input');
    expect(() => setProperty({}, 0)).toThrow('Invalid input');
  });

  test('Omitting the last argument sets the value as undefined', () => {
    const obj = { main: {} };
    setProperty(obj, 'main.next.next');
    const bool = Object.prototype.hasOwnProperty.call(obj.main.next, 'next');

    expect(bool).toBe(true);
    expect(obj.main.next.next).toEqual(undefined);
  });

  test('Any string path is valid', () => {
    const obj = Object.create(null);
    setProperty(obj, '...!', 'but');
    setProperty(obj, '👻.👻.👻', 'why');
    setProperty(obj, '(╯°□°)╯︵ ┻━┻', '?');

    expect(obj['']['']['']['!']).toEqual('but');
    expect(obj['👻']['👻']['👻']).toEqual('why');
    expect(obj['(╯°□°)╯︵ ┻━┻']).toEqual('?');
  });
});
