import { concat, defer, of, timer } from 'rxjs';
import { delay, skip } from 'rxjs/operators';

describe('defer', () => {
    test('should execute code on subscription', done => {
        const createDate$ = () => of(new Date());

        concat(
            createDate$()
                .pipe(delay(1500)),
            defer(() => createDate$()) // this will be executed on subscription
        )
            .subscribe(date => {
            console.log(date);
            done();
        });
    });
});
