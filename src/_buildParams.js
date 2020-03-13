import _decodeUrlParameter from './_decodeUrlParameter';

/**
 * @param query
 * @param decode
 * @returns {{}}
 */
export default function _buildParams(query, decode = true) {
    const params = {};

    if (query) {
        query.split('&').forEach(_query => {
            // %26 => &
            if (decode) {
                _query = _decodeUrlParameter(_query);
            }

            const row = _query.split('=', 2);

            let key = row[0];
            let value = row[1] || '';

            if (key.substr(-2) === '[]') {
                key = key.substr(0, key.length - 2);

                if (params[key] === undefined || !Array.isArray(params[key])) {
                    params[key] = [];
                }

                params[key].push(value);
            } else {
                params[key] = value;
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
