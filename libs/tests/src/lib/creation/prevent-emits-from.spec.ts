import { of } from 'rxjs';
import { preventEmitsFrom } from './prevent-emits-from';

describe('preventEmitsFrom', () => {
    test('should not emit data', done => {
        const obs = of('some data');

        preventEmitsFrom(obs)
            .subscribe({
                next: fail,
                complete: done
            })
    })
})
