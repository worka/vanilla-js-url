(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
        ? define(factory)
        : ((global = global || self), (global.JcURL = factory()));
})(this, function() {
    'use strict';

    function _buildParams(query) {
        var params = {};

        if (query) {
            query.split('&').forEach(function(_query) {
                var row = _query.split('=', 2);

                var key = row[0];
                var value = row[1] || '';

                if (key.substr(-2) === '[]') {
                    key = key.substr(0, key.length - 2);

                    if (
                        params[key] === undefined ||
                        !Array.isArray(params[key])
                    ) {
                        params[key] = [];
                    }

                    params[key].push(decodeURIComponent(value));
                } else {
                    params[key] = decodeURIComponent(value);
                }
            });
        }

        return params;
    }

    function _buildNesting(nesting, value) {
        var object = {};
        object[nesting[nesting.length - 1]] = value;
        return nesting.length === 1
            ? object
            : _buildNesting(nesting.slice(0, nesting.length - 1), object);
    }

    /**
     * Performs a deep merge of `source` into `target`.
     * Mutates `target` only but not its objects and arrays.
     *
     * Thanks @anneb for his inspiration (https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6#gistcomment-2930530).
     */
    function _mergeObjects(target, source) {
        var isObject = function isObject(obj) {
            return obj && obj instanceof Object;
        };

        if (!isObject(target) || !isObject(source)) {
            return source;
        }

        Object.keys(source).forEach(function(key) {
            var targetValue = target[key];
            var sourceValue = source[key];

            if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
                target[key] = targetValue.concat(sourceValue);
            } else if (isObject(targetValue) && isObject(sourceValue)) {
                target[key] = _mergeObjects(
                    Object.assign({}, targetValue),
                    sourceValue
                );
            } else {
                target[key] = sourceValue;
            }
        });
        return target;
    }

    function _buildParamsExtended(query) {
        var params = {};

        if (query) {
            query.split('&').forEach(function(_query) {
                var row = _query.split('=', 2);

                var key = row[0];
                var value = row[1] || '';
                var match = key.match(/.+?(\[(.*)\])/);

                if (match) {
                    var raw = match[2] || '0';
                    var nesting = raw.split('][');

                    var result = _buildNesting(nesting, value); // где то тут теряется название самого параметра, у нас щас только его ключи

                    params = _mergeObjects(params, result);
                }
            });
        }

        return params;
    }

    function _buildQuery(params) {
        var queries = [];

        var _loop = function _loop(key) {
            if (params.hasOwnProperty(key)) {
                var value = params[key];

                if (Array.isArray(value) && value.length) {
                    value.forEach(function(_value) {
                        queries.push(''.concat(key, '[]=').concat(_value));
                    });
                } else {
                    queries.push(''.concat(key, '=').concat(value));
                }
            }
        };

        for (var key in params) {
            _loop(key);
        }

        return queries.join('&');
    }

    function _concat(currentObject, newObject) {
        var _loop = function _loop(key) {
            if (newObject.hasOwnProperty(key)) {
                var value = newObject[key];

                if (Array.isArray(value) && value.length) {
                    if (
                        currentObject[key] === undefined ||
                        !Array.isArray(currentObject[key])
                    ) {
                        currentObject[key] = [];
                    }

                    value.forEach(function(_value) {
                        currentObject[key].push(_value);
                    });
                } else {
                    currentObject[key] = newObject[key];
                }
            }
        };

        for (var key in newObject) {
            _loop(key);
        }

        return currentObject;
    }

    function getParams() {
        var url =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : window.location.href;
        var splitUrl = url.split('?', 2);
        return _buildParams(splitUrl.length === 2 ? splitUrl[1] : '');
    }

    function getParamsExtended() {
        var url =
            arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : window.location.href;
        var splitUrl = url.split('?', 2);
        return _buildParamsExtended(splitUrl.length === 2 ? splitUrl[1] : '');
    }

    function addParams(url, newParams) {
        if (newParams instanceof Object) {
            var uri = url.split('?', 2)[0];
            var currentParams = getParams(url);

            var params = _concat(currentParams, newParams);

            url = ''.concat(uri, '?').concat(_buildQuery(params));
        }

        return url;
    }

    var url = {
        getParams: getParams,
        getParamsExtended: getParamsExtended,
        addParams: addParams
    };

    return url;
});
