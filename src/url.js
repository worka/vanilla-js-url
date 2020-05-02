import _buildParams from './_buildParams';
import _buildParamsExtended from './_buildParamsExtended';
import _buildQuery from './_buildQuery';
import _buildQueryDeep from './_buildQueryDeep';
import _mergeObjects from './_mergeObjects';
import _mergeObjectsDeep from './_mergeObjectsDeep';

function getParams(url = window.location.href, decode = true) {
    const splitUrl = url.split('?', 2);

    return _buildParams(splitUrl.length === 2 ? splitUrl[1] : '', decode);
}

function getParamsExtended(url = window.location.href, decode = true) {
    const splitUrl = url.split('?', 2);

    return _buildParamsExtended(splitUrl.length === 2 ? splitUrl[1] : '', decode);
}

function addParams(url, newParams, encode = false) {
    if (newParams instanceof Object) {
        const uri = url.split('?', 2)[0];
        const currentParams = getParams(url);
        const params = _mergeObjects(currentParams, newParams);

        url = `${ uri }?${ _buildQuery(params, encode) }`;
    }

    return url;
}

function addParamsExtended(url, newParams, encode = false) {
    if (newParams instanceof Object) {
        const uri = url.split('?', 2)[0];
        const currentParams = getParams(url);
        const params = _mergeObjectsDeep(currentParams, newParams);

        url = `${ uri }?${ _buildQueryDeep(params, encode) }`;
    }

    return url;
}

function getPath(url = window.location.href) {
    let path = '/';

    const match = url
        .replace(/^((?:https?:)?\/\/)/i, '') // remove scheme
        .match(/\/(?![#?&\s])([^#?\s]+)/);

    if (match) {
        path += match[1];

        if (path[path.length - 1] === '/') {
            path = path.substr(0, path.length - 1);
        }
    }

    return path;
}

export {
    getParams,
    getParamsExtended,
    addParams,
    addParamsExtended,
    getPath,
    // short aliases
    getParams as get,
    getParamsExtended as getExt,
    addParams as add,
    addParamsExtended as addExt,
    getPath as path
};
