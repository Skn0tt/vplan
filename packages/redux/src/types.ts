import { Record, Map, List } from "immutable";
import {
  Group,
  Teacher,
  Class,
  TeacherInfo,
  AllEntries,
  TeacherEntry,
  StudentEntry,
  Short,
  Info
} from "vplan-types";

/**
 * # Actions
 */
export type PutEntriesPayload = {
  studentToday: File;
  studentTomorrow: File;
  teacherToday: File;
  teacherTomorrow: File;
  secret: string;
};

export type PutInfoPayload = {
  info: Info;
  secret: string;
};

/**
 * # State
 */
export type StudentEntriesMap = Map<Short, StudentEntry[]>;
export type TeacherEntriesMap = Map<Short, TeacherEntry[]>;

interface IAllEntriesRecord {
  teacher: TeacherEntriesMap;
  student: StudentEntriesMap;
}

export class AllEntriesRecord extends Record(
  {
    teacher: Map<Short, TeacherEntry[]>(),
    student: Map<Group, StudentEntry[]>()
  } as IAllEntriesRecord,
  "AllEntries"
) {
  constructor(props: Partial<IAllEntriesRecord>) {
    super(props);
  }
  get<T extends keyof IAllEntriesRecord>(value: T): IAllEntriesRecord[T] {
    return super.get(value);
  }
}

export class InfoRecord extends Record(
  {
    teacher: [],
    student: []
  } as Info,
  "InfoRecord"
) {
  constructor(props: Partial<Info>) {
    super(props);
  }
  get<T extends keyof Info>(value: T): Info[T] {
    return super.get(value);
  }
}

/**
 * AppState
 */
interface IAppState {
  entries: AllEntriesRecord;
  loading: number;
  group: Group;
  teachers: Map<string, TeacherInfo>;
  marked: ReadonlySet<Class>;
  info: InfoRecord;
}

export class AppState extends Record(
  {
    entries: new AllEntriesRecord({}),
    loading: 0,
    group: "5A",
    teachers: Map<string, TeacherInfo>(),
    marked: new Set<Class>(),
    info: new InfoRecord({})
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
