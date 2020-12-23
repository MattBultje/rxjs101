import { zip } from 'rxjs';
import { cold } from 'jest-marbles';

describe('zip', () => {
    test('should combine every nth emit', () => {
        const a = cold('-1-2---3-|');
        const b = cold('-A--B-C-|');

        const expected = cold('-a--b--c|', {
            a: ['1', 'A'],
            b: ['2', 'B'],
            c: ['3', 'C']
        });

        expect(zip(a, b)).toBeObservable(expected);
    });
});
