let objecdiff = require('../src/objecdiff.js');

let a = {
        firstName: 'Mike',
        lastName: 'R',
        city: 'Boston'
    },
    b = {
        firstName: 'Dan',
        name: 'Dan G',
        color: {
            favorite: 'blue'
        },
        city: 'Boston'
    };

console.log(objecdiff.diff(a, b));