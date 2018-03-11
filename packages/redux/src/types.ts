import { Record, Map } from "immutable";
import {
  Group,
  Teacher,
  Class,
  TeacherInfo,
  AllEntries,
  Informations,
  TeacherEntry,
  StudentEntry,
  Short
} from "vplan-types";

interface IAllEntriesMap {
  teacher: Map<Short, TeacherEntry>;
  student: Map<Group, StudentEntry>;
}

export class AllEntriesMap extends Record(
  {
    teacher: Map<Short, TeacherEntry>(),
    student: Map<Group, StudentEntry>()
  } as IAllEntriesMap,
  "AllEntries"
) {
  constructor(props: Partial<AllEntries>) {
    super(props);
  }
  get<T extends keyof IAppState>(value: T): IAppState[T] {
    return super.get(value);
  }
}

/**
 * AppState
 */
interface IAppState {
  entries: AllEntriesMap;
  loading: number;
  group: Group;
  teachers: Map<string, TeacherInfo>;
  marked: ReadonlySet<Class>;
  info: Informations;
}

export class AppState extends Record(
  {
    entries: new AllEntriesMap({}),
    loading: 0,
    group: "5A",
    teachers: Map<string, TeacherInfo>(),
    marked: new Set<Class>(),
    info: []
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
