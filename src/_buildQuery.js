/**
 * @param params
 * @param encode
 * @returns {string}
 */
export default function _buildQuery(params, encode = false) {
    let queries = [];

    function e(string) {
        return encode ? encodeURIComponent(string) : string;
    }

    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            const value = params[key];

            if (Array.isArray(value) && value.length) {
                value.forEach(_value => {
                    queries.push(`${ e(`${ key }[]`) }=${ e(_value) }`);
                });
            } else {
                queries.push(`${ e(key) }=${ e(value) }`);
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
