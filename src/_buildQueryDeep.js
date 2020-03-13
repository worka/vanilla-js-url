import _simplifyObject from './_simplifyObject';

/**
 * @param params
 * @param encode
 * @returns {string}
 */
export default function _buildQueryDeep(params, encode = false) {
    const tree = [];

    _simplifyObject(params, [], tree);

    let parts = tree.map(branch => {
        return branch.reduce((str, item, i) => {
            if (!str) {
                return str + item;
            } else if (i < branch.length - 1) {
                return `${ str }[${ item }]`;
            } else {
                return `${ str }=${ item }`;
            }
        }, '');
    });

    if (encode) {
        parts = parts.map(part => encodeURIComponent(part));
    }

    return parts.join('&');
}

/**
 * Description:
 *
 * IN: {
 *      bar: { t: '1', j: '2', y: '2' },
 *      foo: 4,
 *      roo: { y: { gh: 6, tr: { t: 9 } }, t: { e: 2 } },
 *      uoo: { y: 3, t: { e: 2 } },
 *      joo: [ 2, 4 ]
 *     }
 * OUT: bar[t]=1&bar[j]=2&bar[y]=2&foo=4&roo[y][gh]=6&roo[y][tr][t]=9&roo[t][e]=2&uoo[y]=3&uoo[t][e]=2&joo[0]=2&joo[1]=4
 */
