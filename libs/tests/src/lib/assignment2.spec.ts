import { BehaviorSubject, Observable, Subject } from 'rxjs';

class Counter {
  public valueSubject: BehaviorSubject<number>;

  constructor() {
    this.valueSubject = new BehaviorSubject<number>(0);
  }

  public count() {
    this.valueSubject.next(this.valueSubject.getValue() + 1);
  }
}

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

  test('subjects should not be public', () => {
    const counter = new Counter();

    counter.valueSubject.subscribe(count => console.log(count)); //0

    counter.count(); //1
    counter.count(); //2
    counter.valueSubject.next(42);
    counter.count(); //3?
  })
});
