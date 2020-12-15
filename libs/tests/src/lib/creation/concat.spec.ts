import { concat, EMPTY, of } from 'rxjs';
import { tapLog } from 'rxjs-util';

// Concat is like a queue, when the first observable completes, the second is subscribed to
describe('Concat', () => {

  test('can call second observable after first completes', () => {
    const obs = concat(
      of('first observable').pipe(tapLog()),
      of(2).pipe(tapLog())
    );

    obs.subscribe(value => {
      console.log(`emit with '${value}'`);
    });
  });

  test('should not emit data, just complete', () => {
    const obs = concat<never>(
      of('some data'),
      EMPTY
    );

    obs.subscribe({
      next: value => console.error(value),
      complete: () => console.log('completed')
    });
  });
});

