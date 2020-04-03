import _buildNesting from './_buildNesting';
import _mergeObjectsDeep from './_mergeObjectsDeep';
import _decodeUrlParameter from './_decodeUrlParameter';

/**
 * @param query
 * @param decode
 * @returns {{}}
 */
export default function _buildParamsExtended(query, decode = true) {
    let params = {};

    if (query) {
        query.split('&').forEach((_query, i) => {
            // %26 => &
            if (decode) {
                _query = _decodeUrlParameter(_query);
            }

            const row = _query.split('=', 2);

            let key = row[0];
            let value = row[1] || '';

            // @todo написать получение ключей по-нормальному
            const match = key.match(/(.+?)(\[(.*)\])/i);

            // example.com?s%5B%5D=4%264&s%5B%5D=3&r=s+s%2Bs
            //@todo не срабатывает, так как r без []

            if (match) {
                const raw = match[3] || i.toString();
                const array = raw.split('][');
                array.unshift(match[1]);

                const nesting = _buildNesting(array, _decodeUrlParameter(value));

                params = _mergeObjectsDeep(params, nesting);
            }
        });
    }

    return params;
}

/**
 * Description:
 *
 * IN: bar[foo][too][poo]=3&bar[foo][goo]=4&bar[foo][too][hoo]=5&newbar[tee]=5
 * OUT: { bar: { foo: { too: { poo: 3, hoo: 5 }, goo: '4' } }, newbar: { tee: '5' } }
 */
