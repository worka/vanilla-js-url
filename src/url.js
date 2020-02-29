import _buildParams from './_buildParams';
import _buildParamsExtended from './_buildParamsExtended';
import _buildQuery from './_buildQuery';
import _buildQueryDeep from './_buildQueryDeep';
import _mergeObjects from './_mergeObjects';
import _mergeObjectsDeep from './_mergeObjectsDeep';

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
        const params = _mergeObjects(currentParams, newParams);

        url = `${ uri }?${ _buildQuery(params) }`;
    }

    return url;
}

function addParamsExtended(url, newParams) {
    if (newParams instanceof Object) {
        const uri = url.split('?', 2)[0];
        const currentParams = getParams(url);
        const params = _mergeObjectsDeep(currentParams, newParams);

        console.log('Result', _buildQueryDeep(params));

        url = `${ uri }?${ _buildQueryDeep(params) }`;
    }

    return url;
}

export default {
    getParams,
    getParamsExtended,
    addParams,
    addParamsExtended,
    // short aliases
    get: getParams,
    getExt: getParamsExtended,
    add: addParams,
    addExt: addParamsExtended
};
