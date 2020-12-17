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

    // Ook al is het type <never>, een samengestelde Observable uit concat zal emitten als één van de inner observables dat ook doet.
    // Met het type <never> maak je wel expliciet dat er niet naar next, maar naar complete geluisterd zou moeten worden.
    test('should not emit data, just complete', () => {
        const obs = concat<never>(
            of('some data'),
            EMPTY
        );

        obs.subscribe({
            next: value => console.log(`Yes, it will emit with: ${value}`),
            complete: () => console.log('completed')
        });
    });
});

