import { EMPTY, Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

export function preventEmitsFrom<T>(obs: Observable<T>): Observable<never> {
    return obs.pipe(
        concatMap(() => EMPTY)
    );
}
