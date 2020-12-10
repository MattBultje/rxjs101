import { Observable, Subject } from 'rxjs';

describe('assignment 2', () => {
  test('subjects are broadcasting', () => {
    const subject = new Subject();

    console.warn('Subscribing for the first time');
    subject.subscribe(value => console.log(`Subcriber 1 got message: ${value}`));
    console.warn('Subscribing for the second time');
    subject.subscribe(value => console.log(`Subcriber 2 got message: ${value}`));

    subject.next(1);
    subject.next(2);
    subject.next(3);
  });
});
