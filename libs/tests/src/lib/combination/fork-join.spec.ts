import { forkJoin, NEVER, of, timer } from 'rxjs';

describe('forkJoin', () => {
    test('should combine last emitted values', () => {
        forkJoin([
            of(1, 2, 5),
            of(3, 4)
        ]).subscribe(console.log);
    });

    test('should never emit', done => {
        forkJoin([
            of(1),
            NEVER
        ]).subscribe(fail);

        timer(500).subscribe(done);
    });
});
