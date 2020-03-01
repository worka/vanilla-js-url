/**
 * @param params
 * @returns {string}
 */
export default function _buildQuery(params) {
    const queries = [];

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

    return queries.join('&');
}

/**
 * Description:
 *
 * IN: { bar: 2, foo: 2 }
 * OUT: bar=2&foo=2
 */
