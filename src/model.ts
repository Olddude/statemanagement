import { IAction } from './model';

export interface IActions {
  [key: string]: IAction;
}

export interface IAction {
  readonly type: any;
  readonly payload?: any;
  readonly error?: any;
}

export interface ISelectors<T> {
  [key: string]: ISelector<T>
}

export interface ISelector<T> {
  select(state: T): any;
}

export interface IReducers<T> {
  [key: string]: IReducer<T>;
}

export interface IReducer<T> {
  reduce(state: T, action: IAction): T;
}

export interface IAppState {
  readonly animals: any[];
}
