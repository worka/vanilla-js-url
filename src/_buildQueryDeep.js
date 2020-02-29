export default function _buildQueryDeep(params, branch = [], tree = []) {

    for (let key of Object.keys(params)) {
        branch.push(key);

        if (params[key] instanceof Object) {
            branch = _buildQueryDeep(params[key], branch);
        } else {
            branch.push(params[key]);
            tree.push(branch);

            return tree;
        }
    }


    console.log(params, branch);

    return tree;
}
