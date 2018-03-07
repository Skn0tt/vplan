export type Entry = {
  from: number;
  to: number;
  teacher: string;
  subject: string;
  room: string;
}

export type Entries = ReadonlyArray<Entry>;
