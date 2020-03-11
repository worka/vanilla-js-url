import _decodeUrlParameter from './_decodeUrlParameter';

/**
 * @param query
 * @returns {{}}
 */
export default function _buildParams(query) {
    const params = {};

    if (query) {
        query.split('&').forEach(_query => {
            const row = _query.split('=', 2);

            let key = row[0];
            let value = row[1] || '';

            if (key.substr(-2) === '[]') {
                key = key.substr(0, key.length - 2);

                if (params[key] === undefined || !Array.isArray(params[key])) {
                    params[key] = [];
                }

                params[key].push(_decodeUrlParameter(value));
            } else {
                params[key] = _decodeUrlParameter(value);
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
