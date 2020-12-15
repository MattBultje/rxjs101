import { ReplaySubject } from 'rxjs';

describe('ReplaySubject', () => {
  // ReplaySubjects are created with a buffersize, this buffer will be replayed on subscription
  test('should replay buffer', () => {
    const subject = new ReplaySubject(2);

    console.log('Subscribing 1')
    subject.subscribe(value => console.log(`Subcriber 1 got message: ${value}`));

    subject.next('first data');
    subject.next('second value');
    subject.next('third value');

    console.log('Subscribing 2')
    subject.subscribe(value => console.log(`Subcriber 2 got message: ${value}`)); // should get second data
  });
});
