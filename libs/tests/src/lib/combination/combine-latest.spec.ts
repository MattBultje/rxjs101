import { combineLatest } from 'rxjs';
import { cold } from 'jest-marbles';

describe('combineLatest', () => {
    test('should combine latest values', () => {
        const obs = combineLatest([
            cold('-1-2---3-|'),
            cold('-A--B-C-|')
        ]);

        const expected = cold('-a-bc-de-|', {
            a: ['1', 'A'],
            b: ['2', 'A'],
            c: ['2', 'B'],
            d: ['2', 'C'],
            e: ['3', 'C'],
        })

        expect(obs).toBeObservable(expected)
    });
});
