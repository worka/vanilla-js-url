export default function _mergeObjects(currentObject, newObject) {
    for (let key in newObject) {
        if (newObject.hasOwnProperty(key)) {
            const value = newObject[key];

            if (Array.isArray(value) && value.length) {
                if (
                    currentObject[key] === undefined ||
                    !Array.isArray(currentObject[key])
                ) {
                    currentObject[key] = [];
                }

                value.forEach(_value => {
                    currentObject[key].push(_value);
                });
            } else {
                currentObject[key] = newObject[key];
            }
        }
    }

    return currentObject;
}
