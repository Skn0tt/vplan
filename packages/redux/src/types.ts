import { Record, Map } from "immutable";
import { Group, Teacher, Class, TeacherInfo, Entry } from "vplan-types";

/**
 * AppState
 */
export interface IAppState {
  entries: ReadonlyArray<Entry>;
  loading: number;
  group: Group;
  teachers: Map<string, TeacherInfo>;
  marked: ReadonlySet<Class>;
}

export class AppState extends Record(
  {
    entries: [],
    loading: 0,
    group: "5A",
    teachers: Map<string, TeacherInfo>(),
    marked: new Set<Class>()
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
