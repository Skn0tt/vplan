import { Router, NextFunction } from "express";
import { createClient } from "redis";
import {
  Grouped,
  StudentEntries,
  TeacherEntries,
  AllEntries,
  Teacher,
  DayInfo,
  AllDayInfo
} from "vplan-types";
import { parseFiles, ParseResult } from "vplan-parser";
import * as multer from "multer";
import { promisify } from "util";
import { returnRedis, redisErrHandler, client } from "../../helpers/redis";
import auth from "../../helpers/auth";
import { parseDayInfo } from "parser/src/parse";
import { DAYINFO } from "../dayInfo";

const entriesRouter: Router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const ALL_ENTRIES = "all_entries";
const STUDENT_ENTRIES = "student_entries";
const TEACHER_ENTRIES = "teacher_entries";

entriesRouter.get("/", returnRedis(ALL_ENTRIES));

entriesRouter.get("/student", returnRedis(STUDENT_ENTRIES));

entriesRouter.get("/teacher", returnRedis(TEACHER_ENTRIES));

entriesRouter.put(
  "/",
  auth,
  upload.fields([{ name: "files" }]),
  (req, res, next) => {
    let result: ParseResult;

    // Parse
    try {
      const { files } = req.files as { [key: string]: Express.Multer.File[] };
      const buffers: Buffer[] = files.map(b => b.buffer);

      result = parseFiles(buffers);
    } catch (error) {
      return res
        .status(400)
        .send(error.toString())
        .end();
    }

    client.set(
      STUDENT_ENTRIES,
      JSON.stringify(result.entries.student),
      redisErrHandler(next)
    );
    client.set(
      TEACHER_ENTRIES,
      JSON.stringify(result.entries.teacher),
      redisErrHandler(next)
    );
    client.set(
      ALL_ENTRIES,
      JSON.stringify(result.entries),
      redisErrHandler(next)
    );
    client.set(DAYINFO, JSON.stringify(result.info), redisErrHandler(next));

    return res
      .status(200)
      .json(result.entries)
      .end();
  }
);

export default entriesRouter;
