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
        var _loop2 = function _loop2(key) {
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
            _loop2(key);
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
        addParams: addParams
    };

    return url;
});
