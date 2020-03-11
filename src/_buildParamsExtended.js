import _buildNesting from './_buildNesting';
import _mergeObjectsDeep from './_mergeObjectsDeep';
import _decodeUrlParameter from './_decodeUrlParameter';

/**
 * @param query
 * @returns {{}}
 */
export default function _buildParamsExtended(query) {
    let params = {};

    query.split('&').forEach((_query, i) => {
        const row = _query.split('=', 2);

        let key = row[0];
        let value = row[1] || '';

        // @todo написать получение ключей по-нормальному
        const match = key.match(/(.+?)(\[(.*)\])/i);

        if (match) {
            const raw = match[3] || String(i);
            const array = raw.split('][');
            array.unshift(match[1]);

            const nesting = _buildNesting(array, _decodeUrlParameter(value));

            params = _mergeObjectsDeep(params, nesting);
        }
    });

    return params;
}

/**
 * Description:
 *
 * IN: bar[foo][too][poo]=3&bar[foo][goo]=4&bar[foo][too][hoo]=5&newbar[tee]=5
 * OUT: { bar: { foo: { too: { poo: 3, hoo: 5 }, goo: '4' } }, newbar: { tee: '5' } }
 */
