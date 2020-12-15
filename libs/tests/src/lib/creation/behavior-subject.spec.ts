import { BehaviorSubject, Observable, Subject } from 'rxjs';

describe('BehaviorSubject', () => {
  // BehaviorSubjects are created with an initial value, but wil repeat the last known value after emits.
  test('BehaviorSubjects can be set up with first value', () => {
    const subject = new BehaviorSubject('first data');

    subject.subscribe(value => console.log(`Subcriber 1 got message: ${value}`));
    subject.next('second data');

    subject.subscribe(value => console.log(`Subcriber 2 got message: ${value}`)); // should get second data
  });
});
