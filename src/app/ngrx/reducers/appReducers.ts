import { ActionReducerMap } from '@ngrx/store';

import { AppState } from '../state.model';
import { authReducer } from './auth.reducer';
import { catalogReducer } from './catalog.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  authState: authReducer,
  catalog: catalogReducer,
};
