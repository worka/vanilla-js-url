import _buildNesting from './_buildNesting';
import _mergeObjects from './_mergeObjects';

export default function _buildParamsExtended(query) {
    let params = {};

    if (query) {
        query.split('&').forEach(_query => {
            const row = _query.split('=', 2);

            let key = row[0];
            let value = row[1] || '';

            const match = key.match(/.+?(\[(.*)\])/);

            if (match) {
                const raw = match[2] || '0';
                const nesting = raw.split('][');
                const result = _buildNesting(nesting, value);

                // где то тут теряется название самого параметра, у нас щас только его ключи


                params = _mergeObjects(params, result);
            }
        });
    }

    return params;
}
