/**
 * @param array
 * @param value
 * @returns {{}}
 */
export default function _buildNesting(array, value) {
    const object = {};
    object[array[array.length - 1]] = value;

    return array.length === 1
        ? object
        : _buildNesting(array.slice(0, array.length - 1), object);
}

/**
 * Description:
 *
 * IN: [ 'bar', 'foo', 'goo' ], 5
 * OUT: { bar: { foo: { goo: '5' } } }
 */
