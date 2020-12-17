import { concat, EMPTY, Observable, of, throwError } from 'rxjs';

class SpyObservableDep1 {
    public doDep1Stuff(): Observable<void>{
        return of();
    }
}

class SpyObservableDep2{
    public doDep2Stuff(): Observable<never>{
        return EMPTY;
    }
}

class SpyObservableMain{
    public constructor(private dep1: SpyObservableDep1, private dep2: SpyObservableDep2){
    }

    public DoMainStuff(): Observable<never>{
        return concat<never>(
            this.dep1.doDep1Stuff(),
            this.dep2.doDep2Stuff()
        );
    }
}

describe(SpyObservableMain.name, () => {
    let main: SpyObservableMain;

    const doDep1StuffMockFn = jest.fn<Observable<void>, []>(() => of(undefined));
    const doDep2StuffMockFn = jest.fn<Observable<never>, []>(() => EMPTY);

    beforeEach(() => {
        main = new SpyObservableMain({
            doDep1Stuff: doDep1StuffMockFn
        }, {
            doDep2Stuff: doDep2StuffMockFn
        })
    });

    afterEach(() => jest.clearAllMocks());

    test('should be created', () => {
        expect(main).toBeDefined();
    });

    test('happy, everything is called', done => {
        main.DoMainStuff()
            .subscribe({
                complete: () => {
                    expect(doDep1StuffMockFn).toBeCalledTimes(1);
                    expect(doDep2StuffMockFn).toBeCalledTimes(1);
                    done();
                }
            })
    });

    test('dep1 fails, dep2 called, wtf?', done => {
        doDep1StuffMockFn.mockImplementation(() => throwError('fails'));
        main.DoMainStuff()
            .subscribe({
                error: () => {
                    expect(doDep1StuffMockFn).toBeCalledTimes(1);
                    expect(doDep2StuffMockFn).toBeCalledTimes(1);
                    done();
                }
            })
    });

    let doDep1StuffObs: Observable<void>;
    let doDep2StuffObs: Observable<never>;

    const setupObservables = () => {
        doDep1StuffObs = of(undefined);
        doDep2StuffObs = of();
    
        jest.spyOn(doDep1StuffObs, 'subscribe');
        jest.spyOn(doDep2StuffObs, 'subscribe');

        doDep1StuffMockFn.mockImplementation(() => doDep1StuffObs);
        doDep2StuffMockFn.mockImplementation(() => doDep2StuffObs);
    }

    test('dep1 fails, dep2 observable created, dep2 observable not subscribed to', done => {
        setupObservables();
        doDep1StuffMockFn.mockImplementation(() => throwError('fails'));
        main.DoMainStuff()
            .subscribe({
                error: () => {
                    expect(doDep1StuffMockFn).toBeCalledTimes(1); // Referentie wordt geevalueerd
                    expect(doDep2StuffMockFn).toBeCalledTimes(1); // Referentie wordt geevalueerd
                    // Referenties worden uitgevoerd, er zijn blijkbaar 2 observables.
                    // Er wordt gesubscribed op de observable van main, we gaan iets doen!
                    // Er wordt gesubscribed op dep1.
                    // Observable in error-state, want dep1 fails. Observable van main dus ook in error-state.
                    // Klaar...
                    // Er wordt niet gesubscribed op dep2.
                    expect(doDep2StuffObs.subscribe).toBeCalledTimes(0);
                    done();
                }
            })
    });

    test('happy, really, everything is called', done => {
        setupObservables();
        main.DoMainStuff()
            .subscribe({
                complete: () => {
                    expect(doDep1StuffMockFn).toBeCalledTimes(1);
                    expect(doDep1StuffObs.subscribe).toBeCalledTimes(1);
                    expect(doDep2StuffMockFn).toBeCalledTimes(1);
                    expect(doDep2StuffObs.subscribe).toBeCalledTimes(1);
                    done();
                }
            })
    });
});
