import { of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { tapLog } from 'rxjs-util';

describe('Finalize', () => {

  test('should call finalize after complete', () => {
    const obs = of('some data').pipe(tapLog());

    obs.pipe(
      finalize(() => console.log(`I'm done`))
    )
      .subscribe();
  });
});
