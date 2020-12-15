import { EMPTY, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

describe('Retry', () => {

  test('when catching an error, retry is not performing a retry', done => {
    const obs = new Observable(subscriber => {
      console.log('running the observable');
      subscriber.error('err');
    });

    obs.pipe(
      catchError(() => EMPTY),
      retry(3)
    )
      .subscribe({
        complete: () => {
          console.warn('klaar!');
          done();
        }
      });
  });

  test('should retry after error', done => {
    const obs = new Observable(subscriber => {
      console.log('running the observable');
      subscriber.error('err');
    });

    obs.pipe(
      retry(3)
    )
      .subscribe({
        error: err => {
          console.log(err);
          done();
        }
      });
  });
});
