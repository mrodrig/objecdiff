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
        },
    },
    strings: {
        original: {
            firstName: 'Mike',
            lastName: 'R',
            city: 'Boston',
        },
        updated: {
            firstName: 'Dan',
            name: 'Dan G',
            color: {
                favorite: 'blue',
            },
            city: 'Boston',
        },
    },
    booleans: {
        original: {
            enabled: true,
            wasPreviouslyEnabled: false,
        },
        updated: {
            enabled: false,
            wasPreviouslyEnabled: true,
        },
    },
    nestedDocs: {
        original: {
            singleLevel: {
                fieldLevel: '1',
            },
        },
        updated: {
            singleLevel: {
                fieldLevel: 'unknown',
            },
            multiLevel: {
                firstLevel: {
                    a: 1,
                    anotherLevel: {
                        b: 2,
                    },
                },
            },
        },
    },
    functions: {
        original: {
            identity: (x: unknown) => x,
        },
        updated: {
            flatten: (l: unknown[]) => l.flat()
        }
    },
    errors: {
        original: {
            anError: new Error('test error'),
        },
        updated: {
            another: new Error('second error'),
        }
    },
    nulls: {
        original: {
            nullValue: null,
        },
        updated: {
            another: null,
        }
    },
    undefineds: {
        original: {
            und: undefined,
        },
        updated: {
            another: undefined,
        }
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
            const expectedPathDiffs = ['endDate', 'dueDate'];

            const differences = diff(data.original, data.updated);
            assert.equal(differences.length, expectedPathDiffs.length);
            assertPathDifferences(expectedPathDiffs, data.original, data.updated, differences);
        });

        it('should work on strings', async function() {
            const data = testData.strings;
            const expectedPathDiffs = ['firstName', 'lastName', 'name', 'color.favorite'];
            
            const differences = diff(data.original, data.updated);
            assert.equal(differences.length, expectedPathDiffs.length);
            assertPathDifferences(expectedPathDiffs, data.original, data.updated, differences);
        });

        it('should work on booleans', async function() {
            const data = testData.booleans;
            const expectedPathDiffs = ['enabled', 'wasPreviouslyEnabled'];
            
            const differences = diff(data.original, data.updated);
            assert.equal(differences.length, expectedPathDiffs.length);
            assertPathDifferences(expectedPathDiffs, data.original, data.updated, differences);
        });

        it('should work on nested docs', async function() {
            const data = testData.nestedDocs;
            const expectedPathDiffs = ['singleLevel.fieldLevel', 'multiLevel.firstLevel.a', 'multiLevel.firstLevel.anotherLevel.b'];
            
            const differences = diff(data.original, data.updated);
            assert.equal(differences.length, expectedPathDiffs.length);
            assertPathDifferences(expectedPathDiffs, data.original, data.updated, differences);
        });

        it('should work on functions', async function() {
            const data = testData.functions;
            const expectedPathDiffs = ['identity', 'flatten'];
            
            const differences = diff(data.original, data.updated);
            assert.equal(differences.length, expectedPathDiffs.length);
            assertPathDifferences(expectedPathDiffs, data.original, data.updated, differences);
        });

        it('should work on errors', async function() {
            const data = testData.errors;
            const expectedPathDiffs = ['anError', 'another'];
            
            const differences = diff(data.original, data.updated);
            assert.equal(differences.length, expectedPathDiffs.length);
            assertPathDifferences(expectedPathDiffs, data.original, data.updated, differences);
        });

        it('should work on nulls', async function() {
            const data = testData.nulls;
            const expectedPathDiffs = ['nullValue', 'another'];
            
            const differences = diff(data.original, data.updated);
            assert.equal(differences.length, expectedPathDiffs.length);
            assertPathDifferences(expectedPathDiffs, data.original, data.updated, differences);
        });

        // it('should work on undefined', async function() {
        //     const data = testData.undefineds;
        //     const expectedPathDiffs = ['und', 'another'];
            
        //     const differences = diff(data.original, data.updated);
        //     assert.equal(differences.length, expectedPathDiffs.length);
        //     assertPathDifferences(expectedPathDiffs, data.original, data.updated, differences);
        // });
    });
});
