import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map, distinctUntilChanged, filter } from 'rxjs/operators';
import { IAction, ISelector, IReducers } from './model';

export class Store<T> {

  private readonly stateSubject: BehaviorSubject<T>;
  private readonly reducers: IReducers<T>;

  constructor(initialState: T, reducers: IReducers<T>) {
    this.stateSubject = new BehaviorSubject<T>(initialState);
    this.reducers = reducers;
  }

  public select(selector: ISelector<T>): Observable<any> {
    return this.stateSubject.asObservable()
      .pipe(
        map(state => selector.select(state)),
        filter(val => val !== undefined),
        distinctUntilChanged()
      );
  }

  public dispatch(action: IAction): void {
    const oldState = this.stateSubject.getValue();
    const reducer = this.reducers[action.type];
    const newState = (reducer) ? reducer.reduce(oldState, action) : oldState;
    if (oldState !== newState) {
      this.stateSubject.next(newState);
    }
  }

}
