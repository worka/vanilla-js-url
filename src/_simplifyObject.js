/**
 * @param params
 * @param branch
 * @param tree
 */
export default function _simplifyObject(params, branch, tree) {
    Object.keys(params).forEach(key => {
        const branch2 = branch.concat([key]);
        const params2 = params[key];

        if (params2 instanceof Object) {
            _simplifyObject(params2, branch2, tree);
        } else {
            branch2.push(params2);
            tree.push(branch2);
        }
    });
}

/**
 * Description:
 *
 * IN: {
 *      bar: { t: '1', j: '2', y: '2' },
 *      foo: 4,
 *      roo: { y: { gh: 6, tr: { t: 9 } }, t: { e: 2 } },
 *      uoo: { y: 3, t: { e: 2 } },
 *      joo: [ 2, 4 ]
 *     }
 * OUT: [
 *      [ 'bar', 't', '1' ],
 *      [ 'bar', 'j', '2' ],
 *      [ 'bar', 'y', '2' ],
 *      [ 'foo', 4 ],
 *      [ 'roo', 'y', 'gh', 6 ],
 *      [ 'roo', 'y', 'tr', 't', 9 ],
 *      [ 'roo', 't', 'e', 2 ],
 *      [ 'uoo', 'y', 3 ],
 *      [ 'uoo', 't', 'e', 2 ],
 *      [ 'joo', '0', 2 ],
 *      [ 'joo', '1', 4 ]
 *     ]
 */
