import { EMPTY } from 'rxjs';
import { endWith } from 'rxjs/operators';

describe('endWith', () => {
    test('should end with a fixed value', () => {
        EMPTY.pipe(
            endWith('Always end with this message')
        )
            .subscribe(value => console.log(value));
    });
});
