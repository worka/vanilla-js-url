/**
 * Performs a deep merge of `source` into `target`.
 * Mutates `target` only but not its objects and arrays.
 *
 * Thanks @anneb for his inspiration (https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6#gistcomment-2930530).
 */
export default function _mergeObjectsDeep(target, source) {
    const isObject = obj => obj && obj instanceof Object;

    if (!isObject(target) || !isObject(source)) {
        return source;
    }

    Object.keys(source).forEach(key => {
        const targetValue = target[key];
        const sourceValue = source[key];

        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
            target[key] = targetValue.concat(sourceValue);
        } else if (isObject(targetValue) && isObject(sourceValue)) {
            target[key] = _mergeObjectsDeep(
                Object.assign({}, targetValue),
                sourceValue
            );
        } else {
            target[key] = sourceValue;
        }
    });

    return target;
}
