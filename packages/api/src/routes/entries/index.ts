import { Router, NextFunction } from "express";
import { createClient } from "redis";
import {
  Entry,
  Grouped,
  Entries,
  StudentEntries,
  TeacherEntries,
  AllEntries,
  Teacher
} from "vplan-types";
import { parseStudentView, parseTeacherView } from "vplan-parser";
import * as multer from "multer";
import { promisify } from "util";

const entriesRouter: Router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Redis Client
const client = createClient("redis://redis");
const getAsync = promisify(client.get).bind(client);
const ALL_ENTRIES = "all_entries";
const STUDENT_ENTRIES = "student_entries";
const TEACHER_ENTRIES = "teacher_entries";

const redisErrHandler = (next: NextFunction) => (err, reply) =>
  err && next(err);

const returnRedis = (key: string) => async (_, res, next) => {
  try {
    const entries: Entries = JSON.parse(await getAsync(key));
    return res
      .status(200)
      .json(entries)
      .end();
  } catch (error) {
    return next(error);
  }
};

entriesRouter.get("/", returnRedis(ALL_ENTRIES));

entriesRouter.get("/student", returnRedis(STUDENT_ENTRIES));

entriesRouter.get("/teacher", returnRedis(TEACHER_ENTRIES));

entriesRouter.post(
  "/",
  upload.fields([
    {
      name: "studentToday"
    },
    {
      name: "studentTomorrow"
    },
    {
      name: "teacherToday"
    },
    {
      name: "teacherTomorrow"
    }
  ]),
  (req, res, next) => {
    let student: StudentEntries;
    let teacher: TeacherEntries;

    // Parse
    try {
      const studentToday: string = req.files[
        "studentToday"
      ][0].buffer.toString();
      const studentTomorrow: string = req.files[
        "studentTomorrow"
      ][0].buffer.toString();
      const teacherToday: string = req.files[
        "teacherToday"
      ][0].buffer.toString();
      const teacherTomorrow: string = req.files[
        "teacherTomorrow"
      ][0].buffer.toString();

      student = parseStudentView(studentToday, studentTomorrow);
      teacher = parseTeacherView(teacherToday, teacherTomorrow);
    } catch (error) {
      return res
        .status(400)
        .send(error.toString())
        .end();
    }

    client.set(STUDENT_ENTRIES, JSON.stringify(student), redisErrHandler(next));
    client.set(TEACHER_ENTRIES, JSON.stringify(teacher), redisErrHandler(next));
    client.set(
      ALL_ENTRIES,
      JSON.stringify({ student, teacher }),
      redisErrHandler(next)
    );

    return res.status(200).end();
  }
);

export default entriesRouter;
