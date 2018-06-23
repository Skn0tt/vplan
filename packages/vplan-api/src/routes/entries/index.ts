import { Router } from "express";
import { parseBuffers, ParseResult } from "vplan-parser";
import * as multer from "multer";
import { returnRedis, redisErrHandler, client } from "../../helpers/redis";
import auth from "../../helpers/auth";
import { REDIS_DAYINFO } from "../dayInfo";

const entriesRouter: Router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const ALL_ENTRIES = "all_entries";
const STUDENT_ENTRIES = "student_entries";
const TEACHER_ENTRIES = "teacher_entries";
const REFRESH_TIME = "refresh_time";

entriesRouter.get("/", returnRedis(ALL_ENTRIES));

entriesRouter.get("/student", returnRedis(STUDENT_ENTRIES));

entriesRouter.get("/teacher", returnRedis(TEACHER_ENTRIES));

entriesRouter.get("/refreshtime", returnRedis(REFRESH_TIME));

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

      result = parseBuffers(buffers);
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
    client.set(REFRESH_TIME, result.date.toISOString(), redisErrHandler(next));
    client.set(
      REDIS_DAYINFO,
      JSON.stringify(result.info),
      redisErrHandler(next)
    );

    return res
      .status(200)
      .json(result.entries)
      .end();
  }
);

export default entriesRouter;
