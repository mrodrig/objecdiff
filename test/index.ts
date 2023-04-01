import assert from 'assert';
import { evaluatePath } from 'doc-path';
import { diff, Difference } from '../src/objecdiff';

const testData = {
    dates: {
        original: {
            startDate: new Date('1/1/2021'),
            endDate: new Date('3/7/2023'),
        },
        updated: {
            startDate: new Date('1/1/2021'),
            endDate: new Date('3/14/2023'),
            dueDate: new Date('4/1/2023'),
        }
    },
    strings: {
        original: {
            firstName: 'Mike',
            lastName: 'R',
            city: 'Boston'
        },
        updated: {
            firstName: 'Dan',
            name: 'Dan G',
            color: {
                favorite: 'blue'
            },
            city: 'Boston'
        }
    },
    booleans: {
        original: {},
        updated: {}
    },
    nestedDocs: {
        original: {},
        updated: {}
    },
    functions: {
        original: {},
        updated: {}
    },
    errors: {
        original: {},
        updated: {}
    },
    nulls: {
        original: {},
        updated: {}
    },
    undefineds: {
        original: {},
        updated: {}
    },
    arrays: {
        original: {},
        updated: {}
    },
    regexps: {
        original: {},
        updated: {}
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
            const data = testData.dates;

            const differences = diff(data.original, data.updated);
            assert.equal(differences.length, 2);
            assertPathDifferences(['endDate', 'dueDate'], data.original, data.updated, differences);
        });

        it('should work on strings', async function() {
            const data = testData.strings;
            
            const differences = diff(data.original, data.updated);
            assert.equal(differences.length, 4);
            assertPathDifferences(['firstName', 'lastName', 'name', 'color.favorite'], data.original, data.updated, differences);
        });
    });
});
