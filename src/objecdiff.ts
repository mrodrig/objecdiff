'use strict';

import { isEqual } from 'lodash';
import { deepKeys } from 'deeks';
import { evaluatePath } from 'doc-path';

export interface Difference {
    path: string;
    original: unknown;
    updated: unknown;
}

export function diff(objectA: object, objectB: object) {
    if (typeof objectA === 'undefined' || !(typeof objectA === 'object') || typeof objectB === 'undefined' || !(typeof objectB === 'object')) {
        throw new Error('Two valid objects must be provided.');
    }

    const aKeys = deepKeys(objectA);
    const bKeys = deepKeys(objectB);
    const combinedKeys = [ ...new Set([...aKeys, ...bKeys]) ];
    const differences: Difference[] = [];

    combinedKeys.forEach(docPath => {
        const objectAVal = evaluatePath(objectA, docPath),
            objectBVal = evaluatePath(objectB, docPath);

        if (!isEqual(objectAVal, objectBVal)) {
            differences.push({
                path: docPath,
                original: objectAVal,
                updated: objectBVal
            });
        }
    });

    return differences;
}