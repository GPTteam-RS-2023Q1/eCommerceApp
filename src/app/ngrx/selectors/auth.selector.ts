import { createFeatureSelector } from '@ngrx/store';
import { AuthState, authStateName } from '../state.model';

export const selectAuthState = createFeatureSelector<AuthState>(authStateName);
