import { of } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';
import { tapLog } from 'rxjs-util/dist';

describe('mergeMap', () => {
    test('should call second observable with results of first', done => {
        const typeAhead = () => of(1,2,3)
            .pipe(
            delay(100),
            tapLog()
            );

        const getData = url => of(`data from '${url}'`)
            .pipe(
                tapLog()
            );

        typeAhead().pipe(
            mergeMap(url => getData(url))
        )
            .subscribe({ complete: done });
    });
});
