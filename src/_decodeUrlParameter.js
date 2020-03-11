/**
 * Thanks https://gist.github.com/bchapuis/5575512
 *
 * @param string
 * @returns {string}
 */
export default function decodeUrlParameter(string) {
    return decodeURIComponent(`${ string }`.replace(/\+/g, '%20'));
}
