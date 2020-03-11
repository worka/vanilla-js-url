(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? factory(exports)
        : typeof define === 'function' && define.amd
        ? define(['exports'], factory)
        : ((global = global || self), factory((global.jcurl = {})));
})(this, function(exports) {
    'use strict';

    /**
     * Thanks https://gist.github.com/bchapuis/5575512
     *
     * @param string
     * @returns {string}
     */
    function decodeUrlParameter(string) {
        return decodeURIComponent(''.concat(string).replace(/\+/g, '%20'));
    }

    /**
     * @param query
     * @returns {{}}
     */

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

                    params[key].push(decodeUrlParameter(value));
                } else {
                    params[key] = decodeUrlParameter(value);
                }
            });
        }

        return params;
    }
    /**
     * Description:
     *
     * IN: bar=1&foo
     * OUT: { bar: '1', foo: '' }
     */

    /**
     * @param array
     * @param value
     * @returns {{}}
     */
    function _buildNesting(array, value) {
        var object = {};
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

    /**
     * Thanks @anneb for his inspiration (https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6#gistcomment-2930530)
     *
     * @param target
     * @param source
     * @returns {*}
     */
    function _mergeObjectsDeep(target, source) {
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
    /**
     * Description:
     *
     * IN: { bar: { '1': '0', tr: '1' } }, { bar: { j: '2' } }
     * OUT: { bar: { '1': '0', tr: '1', j: '2' } }
     */

    /**
     * @param query
     * @returns {{}}
     */

    function _buildParamsExtended(query) {
        var params = {};
        query.split('&').forEach(function(_query, i) {
            var row = _query.split('=', 2);

            var key = row[0];
            var value = row[1] || ''; // @todo написать получение ключей по-нормальному

            var match = key.match(/(.+?)(\[(.*)\])/i);

            if (match) {
                var raw = match[3] || String(i);
                var array = raw.split('][');
                array.unshift(match[1]);

                var nesting = _buildNesting(array, decodeUrlParameter(value));

                params = _mergeObjectsDeep(params, nesting);
            }
        });
        return params;
    }
    /**
     * Description:
     *
     * IN: bar[foo][too][poo]=3&bar[foo][goo]=4&bar[foo][too][hoo]=5&newbar[tee]=5
     * OUT: { bar: { foo: { too: { poo: 3, hoo: 5 }, goo: '4' } }, newbar: { tee: '5' } }
     */

    /**
     * @param params
     * @returns {string}
     */
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
    /**
     * Description:
     *
     * IN: { bar: 2, foo: 2 }
     * OUT: bar=2&foo=2
     */

    /**
     * @param params
     * @param branch
     * @param tree
     */
    function _simplifyObject(params, branch, tree) {
        Object.keys(params).forEach(function(key) {
            var branch2 = branch.concat([key]);
            var params2 = params[key];

            if (params2 instanceof Object) {
                _simplifyObject(params2, branch2, tree);
            } else {
                branch2.push(params2);
                tree.push(branch2);
            }
        });
    }
    /**
     * Description:
     *
     * IN: {
     *      bar: { t: '1', j: '2', y: '2' },
     *      foo: 4,
     *      roo: { y: { gh: 6, tr: { t: 9 } }, t: { e: 2 } },
     *      uoo: { y: 3, t: { e: 2 } },
     *      joo: [ 2, 4 ]
     *     }
     * OUT: [
     *      [ 'bar', 't', '1' ],
     *      [ 'bar', 'j', '2' ],
     *      [ 'bar', 'y', '2' ],
     *      [ 'foo', 4 ],
     *      [ 'roo', 'y', 'gh', 6 ],
     *      [ 'roo', 'y', 'tr', 't', 9 ],
     *      [ 'roo', 't', 'e', 2 ],
     *      [ 'uoo', 'y', 3 ],
     *      [ 'uoo', 't', 'e', 2 ],
     *      [ 'joo', '0', 2 ],
     *      [ 'joo', '1', 4 ]
     *     ]
     */

    /**
     * @param params
     * @returns {string}
     */

    function _buildQueryDeep(params) {
        var tree = [];

        _simplifyObject(params, [], tree);

        var parts = tree.map(function(branch) {
            return branch.reduce(function(str, item, i) {
                if (!str) {
                    return str + item;
                } else if (i < branch.length - 1) {
                    return ''.concat(str, '[').concat(item, ']');
                } else {
                    return ''.concat(str, '=').concat(item);
                }
            }, '');
        });
        return parts.join('&');
    }
    /**
     * Description:
     *
     * IN: {
     *      bar: { t: '1', j: '2', y: '2' },
     *      foo: 4,
     *      roo: { y: { gh: 6, tr: { t: 9 } }, t: { e: 2 } },
     *      uoo: { y: 3, t: { e: 2 } },
     *      joo: [ 2, 4 ]
     *     }
     * OUT: bar[t]=1&bar[j]=2&bar[y]=2&foo=4&roo[y][gh]=6&roo[y][tr][t]=9&roo[t][e]=2&uoo[y]=3&uoo[t][e]=2&joo[0]=2&joo[1]=4
     */

    /**
     * @param currentObject
     * @param newObject
     * @returns {*}
     */
    function _mergeObjects(currentObject, newObject) {
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
    /**
     * Description:
     *
     * IN: { bar: 2 }, { foo: 2 }
     * OUT: { bar: 2 , foo: 2 }
     */

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

            var params = _mergeObjects(currentParams, newParams);

            url = ''.concat(uri, '?').concat(_buildQuery(params));
        }

        return url;
    }

    function addParamsExtended(url, newParams) {
        if (newParams instanceof Object) {
            var uri = url.split('?', 2)[0];
            var currentParams = getParams(url);

            var params = _mergeObjectsDeep(currentParams, newParams);

            url = ''.concat(uri, '?').concat(_buildQueryDeep(params));
        }

        return url;
    }
    //     getParams,
    //     getParamsExtended,
    //     addParams,
    //     addParamsExtended,
    //     // short aliases
    //     get: getParams,
    //     getExt: getParamsExtended,
    //     add: addParams,
    //     addExt: addParamsExtended
    // };

    exports.add = addParams;
    exports.addExt = addParamsExtended;
    exports.addParams = addParams;
    exports.addParamsExtended = addParamsExtended;
    exports.get = getParams;
    exports.getExt = getParamsExtended;
    exports.getParams = getParams;
    exports.getParamsExtended = getParamsExtended;

    Object.defineProperty(exports, '__esModule', { value: true });
});
