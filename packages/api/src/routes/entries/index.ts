import { Router } from "express";
import { createClient } from "redis";
import { Entry } from "vplan-types";
import { parseStudent, parseTeacher } from "vplan-parser";
import * as multer from "multer";
import read from "../helpers/read";

const entriesRouter: Router = Router();
const upload = multer();

// Redis Client
const client = createClient("redis://redis");
const ENTRIES = "entries";

entriesRouter.get("/", async (_, res, next) => {
  client.get(ENTRIES, (err, reply) => {
    if (err) {
      next(err);
    }

    try {
      const entries: Entry[] = JSON.parse(reply);
      return res.json(entries);
    } catch (err) {
      return next(err);
    }
  });
});

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
  async (req, res) => {
    const studentToday: string = read(req.files["studentToday"][0]);
    const studentTomorrow: string = read(req.files["studentTomorrow"][0]);
    const teacherToday: string = read(req.files["teacherToday"][0]);
    const teacherTomorrow: string = read(req.files["teacherTomorrow"][0]);

    const entries = {
      student: {
        today: parseStudent(studentToday),
        tomorrow: parseStudent(studentTomorrow)
      },
      teacher: {
        today: parseStudent(teacherToday),
        tomorrow: parseStudent(teacherTomorrow)
      }
    };

    res.json(req.body).end();
  }
);

export default entriesRouter;
