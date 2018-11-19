'use strict';

let key = require('deeks'),
    _ = require('underscore'), // Require underscore
    path = require('doc-path'); // Require doc-path

module.exports = {
    diff: diff
};

function diff(objectA, objectB) {
    if (_.isUndefined(objectA) || !_.isObject(objectA) ||
        _.isUndefined(objectB) || !_.isObject(objectB)) {
            throw new Error('Two valid objects must be provided.');
    }

    let combinedKeys = _.union(key.deepKeys(objectA), key.deepKeys(objectB));


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