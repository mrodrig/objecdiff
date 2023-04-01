import { diff } from '../src/objecdiff';

const a = {
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

console.log(diff(a, b));
