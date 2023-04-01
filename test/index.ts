import assert from 'assert';
import { evaluatePath } from 'doc-path';
import { diff, Difference } from '../src/objecdiff';

const testData = {
    dates: {
        original: {
            startDate: new Date('1/1/2021'),
            endDate: new Date('3/7/2023'),
        },
        new: {
            startDate: new Date('1/1/2021'),
            endDate: new Date('3/14/2023'),
            dueDate: new Date('4/1/2023'),
        }
    },
    strings: {
        original: {},
        new: {}
    },
    booleans: {
        original: {},
        new: {}
    },
    nestedDocs: {
        original: {},
        new: {}
    },
    functions: {
        original: {},
        new: {}
    },
    errors: {
        original: {},
        new: {}
    },
    nulls: {
        original: {},
        new: {}
    },
    undefineds: {
        original: {},
        new: {}
    },
    arrays: {
        original: {},
        new: {}
    },
    regexps: {
        original: {},
        new: {}
    }
};

function assertPathDifferences(paths: string[], originalRecord: Record<string, unknown>, updatedRecord: Record<string, unknown>, differences: Difference[]) {
    paths.forEach((path, index) => {
        const original = evaluatePath(originalRecord, path);
        const updated = evaluatePath(updatedRecord, path);
        assert.deepEqual(differences[index], {
            path,
            original,
            updated,
        });
    });
}

describe('objecdiff', function () {
    describe('diff', function () {

        it('should work on dates', async function() {
            const differences = diff(testData.dates.original, testData.dates.new);
            assert.equal(differences.length, 2);
            assertPathDifferences(['endDate', 'dueDate'], testData.dates.original, testData.dates.new, differences);
        });
    });
});
