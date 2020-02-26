import _buildParams from './_buildParams';
import _buildParamsExtended from './_buildParamsExtended';
import _buildQuery from './_buildQuery';
import _concat from './_concat';

function getParams(url = window.location.href) {
    const splitUrl = url.split('?', 2);

    return _buildParams(splitUrl.length === 2 ? splitUrl[1] : '');
}

function getParamsExtended(url = window.location.href) {
    const splitUrl = url.split('?', 2);

    return _buildParamsExtended(splitUrl.length === 2 ? splitUrl[1] : '');
}

function addParams(url, newParams) {
    if (newParams instanceof Object) {
        const uri = url.split('?', 2)[0];
        const currentParams = getParams(url);
        const params = _concat(currentParams, newParams);

        url = `${ uri }?${ _buildQuery(params) }`;
    }

    return url;
}

export default {
    getParams,
    getParamsExtended,
    addParams
};
