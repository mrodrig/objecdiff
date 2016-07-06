'use strict';

var _ = require('underscore'), // Require underscore
    path = require('doc-path'); // Require doc-path

var walkTreeForKeys = function (object) {
    var keys = [];
    var tmpKeys = _.keys(object);
    _.each(tmpKeys, function (key) {
        if (_.isObject(object[key])) {
            var subKeys = walkTreeForKeys(object[key]);
            subKeys = _.map(subKeys, function (subKey) { return key + '.' + subKey; });
            return keys = keys.concat(subKeys);
        }
        return keys.push(key);
    });
    return keys;
};

// Export the following functions that will be client accessible
module.exports = {

    diff: function (objectA, objectB) {
        if (_.isUndefined(objectA) || !_.isObject(objectA) || 
            _.isUndefined(objectB) || !_.isObject(objectB)) {
                throw new Error('Two valid objects must be provided.');
        }
        var combinedKeys = _.union(walkTreeForKeys(objectA), walkTreeForKeys(objectB));

        var differences = [];

        _.each(combinedKeys, function (docPath) {
            var objectAVal = path.evaluatePath(objectA, docPath),
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
};