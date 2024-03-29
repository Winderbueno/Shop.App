//#region NgRx
import { Action, createReducer, on } from '@ngrx/store';
//#endregion

//#region State, Action
import { TimerState, initialState, adapter } from './timer.state';
import * as fromAction from './timer.actions';
//#endregion

export const featureKey = 'timer';

const timerReducer = createReducer(
  initialState,

  on(fromAction.defineTimerAction,
    (state, action) =>
      adapter.addOne(action.timer, state)),

  // When the effect have defined the timer, we add it to the state
  on(fromAction.timerDefinedAction,
    (state, action) => {
      return adapter.updateOne({
        id: action.timerId,
        changes: { timeoutHandler: action.timeoutHandler }
        }, state);
    }),

  // When the effect have deleted the timer, we delete it from the state
  on(fromAction.timerDeletedAction,
    (state, action) => {
      // TODO - have a timerId always defined
      return action.timerId === undefined ?
        state : adapter.removeOne(action.timerId, state);
    }
  ),
);

export function reducer(state: TimerState | undefined, action: Action) {
  return timerReducer(state, action);
}
