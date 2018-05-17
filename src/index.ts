import { Store } from './store';
import { IAppState, IReducers, IAction, ISelectors, IActions } from './model';
import { fromEvent } from 'rxjs/Observable/fromEvent';
import { throttleTime } from 'rxjs/operators';

const initialState: IAppState = {
  animals: ['cat', 'dog', 'fish']
};

const reducers: IReducers<IAppState> = {
  'add-animal': {
    reduce: (state: IAppState, action: IAction) => {
      return {...state, animals: [...state.animals, action.payload] }
    }
  },
  'remove-animal': {
    reduce: (state: IAppState) => {
      return {...state, animals: [...state.animals.slice(0, state.animals.length - 1)]}
    }
  }
};

const selectors: ISelectors<IAppState> = {
  animals: {
    select(appState: IAppState): string[] {
      return appState.animals;
    }
  }
};

const actions: IActions = {
  'add-animal': { type: 'add-animal', payload: 'cow' }
};

const div = document.createElement('div');
document.getElementById('app').appendChild(div);

const s = new Store<IAppState>(initialState, reducers);

fromEvent(document, 'mousemove')
  .pipe(
    throttleTime(1000)
  )
  .subscribe(() => s.dispatch(actions['add-animal']));

s.select(selectors.animals)
  .subscribe(_ => {
    div.innerHTML = `<p>${JSON.stringify(_)}</p>`;
  });


