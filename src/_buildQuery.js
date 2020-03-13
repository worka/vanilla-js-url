/**
 * @param params
 * @param encode
 * @returns {string}
 */
export default function _buildQuery(params, encode = false) {
    let queries = [];

    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            const value = params[key];

            if (Array.isArray(value) && value.length) {
                value.forEach(_value => {
                    queries.push(`${ key }[]=${ _value }`);
                });
            } else {
                queries.push(`${ key }=${ value }`);
            }
        }
    }

    if (encode) {
        queries = queries.map(query => encodeURIComponent(query));
    }

    return queries.join('&');
}

/**
 * Description:
 *
 * IN: { bar: 2, foo: 2 }
 * OUT: bar=2&foo=2
 */
