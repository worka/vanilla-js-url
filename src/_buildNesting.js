export default function _buildNesting(nesting, value) {
    const object = {};
    object[nesting[nesting.length - 1]] = value;

    return nesting.length === 1
        ? object
        : _buildNesting(nesting.slice(0, nesting.length - 1), object);
}
