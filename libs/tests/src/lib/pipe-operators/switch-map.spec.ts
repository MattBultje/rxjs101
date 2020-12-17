import { of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { tapLog } from 'rxjs-util/dist';

describe('switchMap', () => {
    test('should call second observable with results of first', done => {
        const typeAhead = () => of(1,2,3)
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
});
