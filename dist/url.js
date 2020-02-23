(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
        ? define(factory)
        : ((global = global || self), (global.JcURL = factory()));
})(this, function() {
    'use strict';

    /**
     * example.com -> {}
     * example.com?bar=1&foo -> {bar: "1", foo: ""}
     * example.com?bar[]=1&bar[]=2 -> {bar: ["1", "2"]}
     */
    function getParams(url) {
        url = url || window.location.href;
        var params = {};
        var splitUrl = url.split('?', 2);
        var queries = splitUrl.length === 2 ? splitUrl[1].split('&') : [];

        if (queries.length > 0) {
            for (var i = 0; i < queries.length; i++) {
                var query = queries[i].split('=', 2);

                if (query.length === 1) {
                    query.push('');
                }

                var key = query[0];

                if (key.substr(-2) === '[]') {
                    key = key.substr(0, key.length - 2);

                    if (params[key] === undefined) {
                        params[key] = [];
                    }

                    params[key].push(decodeURIComponent(query[1]));
                } else {
                    params[key] = decodeURIComponent(query[1]);
                }
            }
        }

        return params;
    }
    /**
     * example.com with params {bar: 1} -> example.com?bar=1
     * example.com?bar=1&foo with params {bar: 2} -> example.com?bar=2&foo=
     * example.com?bar=1 with params {bar: [2, 3]} -> example.com?bar[]=2&bar[]=3
     * example.com?bar[]=1&bar[]=2 with params {bar: [3, 4]} -> example.com?bar[]=1&bar[]=2&bar[]=3&bar[]=4
     */

    function addParams(url, newParams) {
        if (newParams instanceof Object) {
            var uri = url.split('?', 2)[0];
            var currentParams = getParams(url);

            for (var key in newParams) {
                if (newParams.hasOwnProperty(key)) {
                    var value = newParams[key];

                    if (Array.isArray(value) && value.length) {
                        if (
                            currentParams[key] === undefined ||
                            !Array.isArray(currentParams[key])
                        ) {
                            currentParams[key] = [];
                        }

                        for (var i = 0; i < value.length; i++) {
                            currentParams[key].push(value[i]);
                        }
                    } else {
                        currentParams[key] = newParams[key];
                    }
                }
            }

            var queries = [];

            for (var _key in currentParams) {
                var _value = currentParams[_key];

                if (Array.isArray(_value) && _value.length) {
                    for (var j = 0; j < _value.length; j++) {
                        queries.push(''.concat(_key, '[]=').concat(_value[j]));
                    }
                } else {
                    queries.push(''.concat(_key, '=').concat(_value));
                }
            }

            url = ''.concat(uri, '?').concat(queries.join('&'));
        }

        return url;
    }

    var url = {
        getParams: getParams,
        addParams: addParams,
    };

    return url;
});
