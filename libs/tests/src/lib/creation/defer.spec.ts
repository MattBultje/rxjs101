import { concat, defer, of, timer } from 'rxjs';
import { skip } from 'rxjs/operators';

describe('defer', () => {
    test('should execute code on subscription', done => {
        // Emit current date at start of test
        console.log(new Date());

        const deferred = defer(() => of(new Date())); // this will be executed on subscription

        concat(
            timer(1500),
            deferred
        )
            .pipe(skip(1))// Skip first emit, not interested in output of timer
            .subscribe(date => {
            console.log(date);
            done();
        });
    });
});
