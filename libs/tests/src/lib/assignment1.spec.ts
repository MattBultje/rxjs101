import { Observable } from 'rxjs';

describe('assignment 1', () => {
  test('should be lazy', () => {
    const obs = new Observable(subscriber => {
      console.log('Emitting 1');
      subscriber.next(1);
      console.log('Emitting 2');
      subscriber.next(2);
      console.log('Emitting 3');
      subscriber.next(3);
      subscriber.complete();
    });

    console.warn('Subscribing for the first time');
    obs.subscribe(value => console.log(value));
    console.warn('Subscribing for the second time');
    obs.subscribe(value => console.log(value));
  });
});
