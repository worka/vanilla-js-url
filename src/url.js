/**
 * example.com -> {}
 * example.com?bar=1&foo -> {bar: "1", foo: ""}
 * example.com?bar[]=1&bar[]=2 -> {bar: ["1", "2"]}
 */
function getParams(url) {
    url = url || window.location.href;

    const params = {};
    const splitUrl = url.split('?', 2);
    const queries = splitUrl.length === 2 ? splitUrl[1].split('&') : [];

    if (queries.length > 0) {
        for (let i = 0; i < queries.length; i++) {
            const query = queries[i].split('=', 2);

            if (query.length === 1) {
                query.push('');
            }

            let key = query[0];

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
        const uri = url.split('?', 2)[0];
        const currentParams = getParams(url);

        for (let key in newParams) {
            if (newParams.hasOwnProperty(key)) {
                const value = newParams[key];

                if (Array.isArray(value) && value.length) {
                    if (
                        currentParams[key] === undefined ||
                        !Array.isArray(currentParams[key])
                    ) {
                        currentParams[key] = [];
                    }

                    for (let i = 0; i < value.length; i++) {
                        currentParams[key].push(value[i]);
                    }
                } else {
                    currentParams[key] = newParams[key];
                }
            }
        }

        const queries = [];

        for (let key in currentParams) {
            const value = currentParams[key];

            if (Array.isArray(value) && value.length) {
                for (let j = 0; j < value.length; j++) {
                    queries.push(`${key}[]=${value[j]}`);
                }
            } else {
                queries.push(`${key}=${value}`);
            }
        }

        url = `${uri}?${queries.join('&')}`;
    }

    return url;
}

export default {
    getParams,
    addParams
};
