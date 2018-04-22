import { Router } from "express";
import {
  getAsync,
  returnRedis,
  client,
  redisErrHandler
} from "../../helpers/redis";
import * as _ from "lodash";
import auth from "../../helpers/auth";

const infoRouter = Router();

const INFO = "INFO";
const INFO_TEACHER = "INFO_TEACHER";
const INFO_STUDENT = "INFO_STUDENT";

infoRouter.get("/", returnRedis(INFO));

infoRouter.get("/teacher", returnRedis(INFO_TEACHER));
infoRouter.get("/student", returnRedis(INFO_STUDENT));

infoRouter.put(
  "/",
  auth,
  (req, res, next) => {
    try {
      const json = req.body;
      if (
        !json ||
        !_.isObject(json) ||
        !_.has(json, "teacher") ||
        !_.has(json, "student") ||
        !_.isArray(json.student) ||
        !_.isArray(json.teacher)
      ) {
        return res.status(400).end();
      }

      return next();
    } catch (error) {
      return res.status(400).end();
    }
  },
  async (req, res, next) => {
    try {
      client.set(INFO, JSON.stringify(req.body), redisErrHandler(next));
      client.set(
        INFO_STUDENT,
        JSON.stringify(req.body.student),
        redisErrHandler(next)
      );
      client.set(
        INFO_TEACHER,
        JSON.stringify(req.body.teacher),
        redisErrHandler(next)
      );

      return res
        .status(200)
        .json(req.body)
        .end();
    } catch (error) {
      return next(error);
    }
  }
);

infoRouter.put(
  "/teacher",
  auth,
  (req, res, next) => {
    try {
      const json = req.body;
      if (!json || !_.isArray(json)) {
        return res.status(400).end();
      }

      return next();
    } catch (error) {
      return res.status(400).end();
    }
  },
  async (req, res, next) => {
    try {
      client.set(INFO_TEACHER, JSON.stringify(req.body), redisErrHandler(next));

      const info = JSON.parse(await getAsync(INFO));
      info.teacher = req.body;
      client.set(INFO, JSON.stringify(info), redisErrHandler(next));

      return res
        .status(200)
        .json(req.body)
        .end();
    } catch (error) {
      return next(error);
    }
  }
);

infoRouter.put(
  "/student",
  auth,
  (req, res, next) => {
    try {
      const json = req.body;
      if (!json || !_.isArray(json)) {
        return res.status(400).end();
      }

      return next();
    } catch (error) {
      return res.status(400).end();
    }
  },
  async (req, res, next) => {
    try {
      client.set(INFO_STUDENT, JSON.stringify(req.body), redisErrHandler(next));

      const info = JSON.parse(await getAsync(INFO));
      info.student = req.body;
      client.set(INFO, JSON.stringify(info), redisErrHandler(next));
      return res
        .status(200)
        .json(req.body)
        .end();
    } catch (error) {
      return next(error);
    }
  }
);

export default infoRouter;
