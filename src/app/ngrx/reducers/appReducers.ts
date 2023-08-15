import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state.model';
import { authReducer } from './auth.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  authState: authReducer,
};
