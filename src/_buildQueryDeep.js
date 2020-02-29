import _simplifyObject from './_simplifyObject';

export default function _buildQueryDeep(params) {
    const tree = [];

    _simplifyObject(params, [], tree);

    const parts = tree.map(branch => {
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

    return parts.join('&');
}
