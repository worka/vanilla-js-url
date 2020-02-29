export default function _buildQueryDeep(params) {
    const tree = [];

    stage(params, [], tree);

    return tree;
}

function stage(params, branch, tree) {
    for (let key of Object.keys(params)) {
        const branch2 = branch.concat([key]);
        const params2 = params[key];

        if (params2 instanceof Object) {
            stage(params2, branch2, tree);
        } else {
            branch2.push(params2);
            tree.push(branch2);
        }
    }
}
