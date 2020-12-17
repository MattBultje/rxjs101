import { zip } from 'rxjs';
import { cold } from 'jest-marbles';

describe('combineLatest', () => {
    test('should combine latest values', () => {
        const obs = zip([
            cold('-1-2---3-|'),
            cold('-A--B-C-|')
        ]);

        obs.subscribe(console.log);
    });
});
