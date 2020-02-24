function _buildNesting(nesting, value) {
    const object = {};
    object[nesting[nesting.length - 1]] = value;

    return nesting.length === 1
        ? object
        : _buildNesting(nesting.slice(0, nesting.length - 1), object);
}

function _concat2(object1, object2) {
    console.log(1, object1, object2);

    for (let prop in object2) {
        if (object2.hasOwnProperty(prop)) {
            if (object2[prop] instanceof Object) {
                object1 = object1.hasOwnProperty(prop) ? object1[prop] : null;

                _concat2(object1, object2[prop]);
            } else {
                object1 = Object.assign(object1, object2);

                console.log(`Finite value: ${object2[prop]}`);
            }
        }
    }

    console.log(2, object1, object2);
}

function _buildParams(query) {
    const params = {};

    if (query) {
        query.split('&').forEach(_query => {
            const row = _query.split('=', 2);

            let key = row[0];
            let value = row[1] || '';

            ///////
            ///////
            ///////
            const match = key.match(/.+?(\[(.*)\])/);

            if (match) {
                const raw = match[2] || '0';
                const nesting = raw.split('][');
                const result = _buildNesting(nesting, value);

                // console.log('done', result);
                _concat2(
                    { foo: { too: { poo: '3' } } },
                    { foo: { too: { hoo: '5' } } }
                );
            }
            ///////
            ///////
            ///////

            if (key.substr(-2) === '[]') {
                key = key.substr(0, key.length - 2);

                if (params[key] === undefined || !Array.isArray(params[key])) {
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
    const queries = [];

    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            const value = params[key];

            if (Array.isArray(value) && value.length) {
                value.forEach(_value => {
                    queries.push(`${key}[]=${_value}`);
                });
            } else {
                queries.push(`${key}=${value}`);
            }
        }
    }

    return queries.join('&');
}

function _concat(currentObject, newObject) {
    for (let key in newObject) {
        if (newObject.hasOwnProperty(key)) {
            const value = newObject[key];

            if (Array.isArray(value) && value.length) {
                if (
                    currentObject[key] === undefined ||
                    !Array.isArray(currentObject[key])
                ) {
                    currentObject[key] = [];
                }

                value.forEach(_value => {
                    currentObject[key].push(_value);
                });
            } else {
                currentObject[key] = newObject[key];
            }
        }
    }

    return currentObject;
}

function getParams(url = window.location.href) {
    const splitUrl = url.split('?', 2);

    return _buildParams(splitUrl.length === 2 ? splitUrl[1] : '');
}

function addParams(url, newParams) {
    if (newParams instanceof Object) {
        const uri = url.split('?', 2)[0];
        const currentParams = getParams(url);
        const params = _concat(currentParams, newParams);

        url = `${uri}?${_buildQuery(params)}`;
    }

    return url;
}

export default {
    getParams,
    addParams
};
