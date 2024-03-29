//#region NgRx, Action Creator
import { props } from '@ngrx/store';
import { createAction } from '@action/creator/action-creator';
import { ModuleEnum } from '@action/model/module.enum';
import { EmitterTypeEnum } from '@action/model/emitter-type.enum';
//#endregion

export const closeSideNavAction = createAction(
  ModuleEnum.Core,
  EmitterTypeEnum.Store,
  'closeSideNav'
);

export const toggleSideNavAction = createAction(
  ModuleEnum.Core,
  EmitterTypeEnum.Store,
  'toggleSideNav'
);

export const accountWindowStorageChangeAction = createAction(
  ModuleEnum.Core,
  EmitterTypeEnum.Store,
  'accountWindowStorageChange',
  props<{ event: any }>()
);