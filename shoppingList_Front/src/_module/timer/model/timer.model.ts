import { TypedAction } from "@ngrx/store/src/models";

export class Timer {

    name!: string;
    time?: number;

    timeoutHandler!: number;
    action!: TypedAction<string>;

    constructor(init?:Partial<Timer>) {
        Object.assign(this, init);
    }
}