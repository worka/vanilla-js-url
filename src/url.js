function getParams(url) {
    url = url || window.location.href;

    const params = {};
    const splitUrl = url.split('?', 2);
    const queries = splitUrl.length === 2 ? splitUrl[1].split('&') : [];

    queries.forEach(query => {
        const row = query.split('=', 2);

        let key = row[0];
        let value = row[1] || '';

        if (key.substr(-2) === '[]') {
            key = key.substr(0, key.length - 2);

            if (params[key] === undefined) {
                params[key] = [];
            }

            params[key].push(decodeURIComponent(value));
        } else {
            params[key] = decodeURIComponent(value);
        }
    });

    return params;
}

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
