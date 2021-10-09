//#region NgRx
import { createSelector, createFeatureSelector } from '@ngrx/store';
//#endregion

//#region Store
import { AlertState } from './alert.state';
import { featureKey } from '.';
//#endregion

export const selectState = createFeatureSelector<AlertState>(featureKey);
export const selectCurrentAlert = createSelector(selectState, (state: AlertState) => state.alert);

export const isAlerting = createSelector(selectState, (state: AlertState) => state.alert != undefined);
