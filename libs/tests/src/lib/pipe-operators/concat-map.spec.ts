import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

describe('concatMap', () => {
    test('should call second observable with results of first', () => {
        const getUrl = () => of('/url');
        const getData = url => of(`data from '${url}'`);

        getUrl().pipe(
            concatMap(url => getData(url))
        )
            .subscribe(value => console.log(value));
    });
});
