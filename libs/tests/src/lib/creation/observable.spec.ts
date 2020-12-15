import { Observable, of } from 'rxjs';
import { tapLog } from 'rxjs-util/dist';

describe('Observable', () => {
  test('should be lazy', () => {
    const obs = new Observable(subscriber => {
      subscriber.next('some data');
      subscriber.complete();
    }).pipe(tapLog());

    console.log('Subscribing for the first time');
    obs.subscribe();

    console.log('Subscribing for the second time');
    obs.subscribe();
  });

  test('should accept an observer', () => {
    const obs = of('some data');

    obs.subscribe({
      next: value => console.log(`next: ${value}`),
      complete: () => console.log('completed'),
      error: err => console.error(err)
    })
  })
});
