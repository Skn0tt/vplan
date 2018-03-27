import { Record, Map, List, Set } from "immutable";
import {
  Group,
  Teacher,
  Class,
  AllEntries,
  TeacherEntry,
  StudentEntry,
  Short,
  Info,
  AllDayInfo,
  Entry
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
  marked: Map<Group, Set<Class>>;
  info: InfoRecord;
  isTeacher: boolean;
  dayInfo: AllDayInfo;
  short: Short;
}

const defaultDayInfo = {
  week: "A",
  missingTeachers: [],
  blockedRooms: [],
  missingGroups: []
};

export class AppState extends Record(
  {
    entries: new AllEntriesRecord({}),
    loading: 0,
    group: "5A",
    marked: Map<Group, Set<Class>>(),
    info: new InfoRecord({}),
    dayInfo: {
      today: defaultDayInfo,
      tomorrow: defaultDayInfo
    },
    isTeacher: false,
    short: ""
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
