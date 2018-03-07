import { Record, Map } from "immutable";
import { Entries, Class, Teacher } from "vplan-types";

/**
 * AppState
 */
export interface IAppState {
  entries: Entries;
  loading: number;
  class: Class;
  teachers: Map<string, Teacher>;
}

export class AppState extends Record(
  {
    entries: [],
    loading: 0,
    class: "5A",
    teachers: Map<string, Teacher>()
  } as IAppState,
  "AppState"
) {
  constructor(props: Partial<IAppState>) {
    super(props);
  }
  get<T extends keyof IAppState>(value: T): IAppState[T] {
    return super.get(value);
  }
}
