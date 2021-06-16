import { TodosQuery, TodosStore } from './todos.store';
import { distinctUntilChanged, skip, tap } from 'rxjs/operators';

describe('entity store select', () => {
    let store: TodosStore;
    let query: TodosQuery;

    beforeEach(() => {
        store = new TodosStore();
        query = new TodosQuery(store);
    });

    test('should return immediately with null on select', done => {
        query.selectEntity(todo => todo.message === 'hi')
            .subscribe(todo => {
                expect(todo).toBeFalsy();
                done();
            });
    });

    test('should return object as second emit', done => {
        query.selectEntity(todo => todo.message === 'hi')
            .pipe(skip(1))
            .subscribe(todo => {
                expect(todo).toBeTruthy();
                expect(todo.message).toBe('hi');
                done();
            });

        setTimeout(() =>
                store.add({ message: 'hi', id: 2 })
            , 100);
    });

    test('should emit with distinctUntilChanged', done => {
        const obs = query.selectActiveId()
            .pipe(distinctUntilChanged());

        store.add({ message: 'hoi', id: 4 });
        store.setActive(4);
        obs.subscribe(console.log);

        obs.subscribe(id => {
            expect(id).toBe(4);
            done();
        });
    });

    test('should return immediately with null on selectActive', done => {
        query.selectActiveId()
            .subscribe(id => {
                    expect(id).toBeFalsy();
                    done();
                },
                console.error
            );
    });

    test('should not emit todos when changing active', done => {
        query.selectActiveId()
            .pipe(
                tap(id => console.log(`active id: ${id}`)),
                skip(1))
            .subscribe(done);

        query.selectAll()
            .pipe(
                tap(() => console.log('selectAll next')),
                skip(1))
            .subscribe(() => fail());

        store.add({ message: 'hi', id: 6 });

        setTimeout(() => {
            store.setActive(6)
        }, 10);
    })
});
