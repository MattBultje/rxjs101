import { of, timer } from 'rxjs';
import { delay, finalize, switchMap, tap } from 'rxjs/operators';
import { tapLog } from 'rxjs-util/dist';
import { cold } from 'jest-marbles';

describe('switchMap', () => {
    test('should call second observable with results of first', done => {
        const typeAhead = () => of(1, 2, 3)
            .pipe(
                delay(100),
                tapLog()
            );

        const getData = url => of(`data from '${url}'`)
            .pipe(
                delay(200), // simulate a slow http call, the first two calls will be cancelled by switchMap
                tapLog()
            );

        typeAhead().pipe(
            switchMap(url => getData(url))
        )
            .subscribe({ complete: done });
    });

    test('should not complete in main pipe', done => {
        cold('--1--')
            .pipe(
                switchMap(() => cold('-2-|')),
                finalize(() => fail('should not complete'))
            )
            .subscribe();

        timer(500).subscribe(done);
    });

    test('should set loading for second call', () => {
        const setLoading = loading => console.log(`set loading to ${loading}`);

        cold('-1-1-')
            .pipe(
                tap(() => setLoading(true)),
                switchMap(() => of('data')
                    .pipe(finalize(() => setLoading(false))))
            )
            .subscribe()
    })
});
