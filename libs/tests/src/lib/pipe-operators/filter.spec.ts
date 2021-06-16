import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

describe('filter', () => {
    test('should complete when filtering', done => {
        of(1)
            .pipe(
                filter(value => value !== 1)
            )
            .subscribe({
                next: () => fail(),
                error: undefined,
                complete: done
            });
    });
});
