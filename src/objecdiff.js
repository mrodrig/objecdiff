'use strict';

let _ = require('underscore'), // Require underscore
    path = require('doc-path'); // Require doc-path

module.exports = {
    diff: diff
};

function walkTreeForKeys(object) {
    let keys = [];
    let tmpKeys = _.keys(object);
    _.each(tmpKeys, function (key) {
        if (_.isObject(object[key])) {
            let subKeys = walkTreeForKeys(object[key]);
            subKeys = _.map(subKeys, function (subKey) { return key + '.' + subKey; });
            return keys = keys.concat(subKeys);
        }
        return keys.push(key);
    });
    return keys;
}

function diff(objectA, objectB) {
    if (_.isUndefined(objectA) || !_.isObject(objectA) ||
        _.isUndefined(objectB) || !_.isObject(objectB)) {
            throw new Error('Two valid objects must be provided.');
    }
    let combinedKeys = _.union(walkTreeForKeys(objectA), walkTreeForKeys(objectB));

    let differences = [];

    _.each(combinedKeys, function (docPath) {
        let objectAVal = path.evaluatePath(objectA, docPath),
            objectBVal = path.evaluatePath(objectB, docPath);

        if (!_.isEqual(objectAVal, objectBVal)) {
            return differences.push({
                documentPath: docPath,
                original: objectAVal,
                new: objectBVal
            });
        }
    });

    return differences;
}