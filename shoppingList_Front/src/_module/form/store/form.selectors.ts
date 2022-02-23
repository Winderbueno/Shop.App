//#region NgRx
import { createFeatureSelector, createSelector } from '@ngrx/store';
//#endregion

//#region Store
import { FormGroupState } from 'ngrx-forms';
import { FormValue } from '../model/form-value.model';
import { FormState } from './form.state';
import { featureKey } from '.';
//#endregion

export const selectState = createFeatureSelector<FormState>(featureKey);

export const selectForm = (formId: string) =>
  createSelector(
    selectState, 
    (state: FormState) => state[formId]);

export const selectFormValue = (formId: string) =>
  createSelector(
    selectForm(formId),
    (formState: FormGroupState<FormValue>) => 
      formState 
      && formState.value);

export const selectControlValue = (formId: string, ctrlId: string) =>
  createSelector(
    selectForm(formId),
    (formState: FormGroupState<FormValue>) => 
      formState &&
      formState.controls[ctrlId] &&
      formState.controls[ctrlId].value);