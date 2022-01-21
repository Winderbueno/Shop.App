//#region NgRx, Action Creator
import { props } from '@ngrx/store';
import { createAction } from '@action/creator/action-creator';
import { ModuleEnum } from '@action/enum/module.enum';
import { EmitterTypeEnum } from '@action/enum/emitter-type.enum';
//#endregion

//#region Model
import { Category } from '../model/category.model';
//#endregion

export const loadCategoryAction = createAction(
  ModuleEnum.CATEGORISATION,
  EmitterTypeEnum.Store,
  'loadCategory',
  props<{ category: Category[] }>()
);

export const addCategoryAction = createAction(
  ModuleEnum.CATEGORISATION,
  EmitterTypeEnum.Store,
  'addCategory',
  props<{ category: Category }>()
);

export const deleteCategoryAction = createAction(
  ModuleEnum.CATEGORISATION,
  EmitterTypeEnum.Store,
  'deleteCategory',
  props<{ name: string }>()
);