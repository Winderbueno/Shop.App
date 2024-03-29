//#region NgRx
import { createSelector, createFeatureSelector } from '@ngrx/store';
//#endregion

//#region Store, Model
import { EnumState, adapter } from './enum.state';
import { featureKey } from '.';
//#endregion

export const selectState = createFeatureSelector<EnumState>(featureKey);

/* Entity State */
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

export const selectEnumValues = (name: string | undefined) =>
  createSelector(
    selectState, 
    (state: EnumState) => {
      return name === undefined ? 
        undefined :
        state.entities[name] === undefined ?
          undefined :
          state.entities[name]!.values;
  });