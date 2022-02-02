//#region NgRx, Action Creator
import { createAction } from '@action/creator/action-creator';
import { ModuleEnum } from '@action/enum/module.enum';
import { EmitterTypeEnum } from '@action/enum/emitter-type.enum';
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