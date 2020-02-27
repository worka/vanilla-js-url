import _buildNesting from './_buildNesting';
import _mergeObjects from './_mergeObjects';

export default function _buildParamsExtended(query) {
    let params = {};
    let i = 0;

    if (query) {
        query.split('&').forEach(_query => {
            const row = _query.split('=', 2);

            let key = row[0];
            let value = row[1] || '';

            const match = key.match(/(.+?)(\[(.*)\])/);

            if (match) {
                const raw = match[3] || String(i++);
                const nesting = raw.split('][');
                nesting.unshift(match[1]);
                const result = _buildNesting(nesting, value);

                params = _mergeObjects(params, result);
            }
        });
    }

    return params;
}
