import { EntityState, EntityStore, QueryEntity, StoreConfig } from '@datorama/akita';

export class Todo {
    message: string;
    id: number;
}

export type TodosState = EntityState<Todo, number>

@StoreConfig({ name: 'todos' })
export class TodosStore extends EntityStore<TodosState> {
    constructor() {
        super() ;
    }
}

export class TodosQuery extends QueryEntity<TodosState> {
    constructor(protected store: TodosStore) {
        super(store);
    }
}
