declare module 'vanilla-js-url';

/**
 * @param {string} [url = window.location.href]
 * @param {boolean} [decode = true]
 */
declare function getParams(url?: string, decode?: boolean): {}

/**
 * @param {string} [url = window.location.href]
 * @param {boolean} [decode = true]
 */
declare function getParamsExtended(url?: string, decode?: boolean): {}

/**
 * @param {string} url
 * @param {Object} newParams
 * @param {boolean} [encode = false]
 */
declare function addParams(url: string, newParams: {}, encode?: boolean): string

/**
 * @param {string} url
 * @param {Object} newParams
 * @param {boolean} [encode = false]
 */
declare function addParamsExtended(url: string, newParams: {}, encode?: boolean): string

/**
 * @param {string} [url = window.location.href]
 */
declare function getPath(url): string

export {
    getParams,
    getParamsExtended,
    addParams,
    addParamsExtended,
    getPath
};
