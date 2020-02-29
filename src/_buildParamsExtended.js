import _buildNesting from './_buildNesting';
import _mergeObjectsDeep from './_mergeObjectsDeep';

export default function _buildParamsExtended(query) {
    let params = {};
    let i = 0;

    if (query) {
        query.split('&').forEach(_query => {
            const row = _query.split('=', 2);

            let key = row[0];
            let value = row[1] || '';

            // @todo написать получение ключей по-нормальному
            const match = key.match(/(.+?)(\[(.*)\])/);

            if (match) {
                const raw = match[3] || String(i++);
                const nesting = raw.split('][');
                nesting.unshift(match[1]);
                const result = _buildNesting(nesting, value);

                params = _mergeObjectsDeep(params, result);
            }
        });
    }

    return params;
}
