import { Record } from "immutable";
import { Entries } from "vplan-types";

/**
 * AppState
 */
export interface IAppState {
  entries;
  loading: number;
}

export class AppState extends Record(
  {
    entries: [],
    loading: 0
  },
  "AppState"
) {
  constructor(props: Partial<IAppState>) {
    super(props);
  }
  get<T extends keyof IAppState>(value: T): IAppState[T] {
    return super.get(value);
  }
}
