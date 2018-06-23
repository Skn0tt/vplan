import { Router } from "express";
import {
  getAsync,
  returnRedis,
  client,
  redisErrHandler
} from "../../helpers/redis";
import * as _ from "lodash";
import auth from "../../helpers/auth";

const messagesRouter = Router();

const REDIS_MESSAGES = "MESSAGES";
const REDIS_MESSAGES_TEACHER = "MESSAGES_TEACHER";
const REDIS_MESSAGES_STUDENT = "MESSAGES_STUDENT";

messagesRouter.get("/", returnRedis(REDIS_MESSAGES));

messagesRouter.get("/teacher", returnRedis(REDIS_MESSAGES_TEACHER));
messagesRouter.get("/student", returnRedis(REDIS_MESSAGES_STUDENT));

messagesRouter.put(
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
      client.set(
        REDIS_MESSAGES,
        JSON.stringify(req.body),
        redisErrHandler(next)
      );
      client.set(
        REDIS_MESSAGES_STUDENT,
        JSON.stringify(req.body.student),
        redisErrHandler(next)
      );
      client.set(
        REDIS_MESSAGES_TEACHER,
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

messagesRouter.put(
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
      client.set(
        REDIS_MESSAGES_TEACHER,
        JSON.stringify(req.body),
        redisErrHandler(next)
      );

      const info = JSON.parse(await getAsync(REDIS_MESSAGES));
      info.teacher = req.body;
      client.set(REDIS_MESSAGES, JSON.stringify(info), redisErrHandler(next));

      return res
        .status(200)
        .json(req.body)
        .end();
    } catch (error) {
      return next(error);
    }
  }
);

messagesRouter.put(
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
      client.set(
        REDIS_MESSAGES_STUDENT,
        JSON.stringify(req.body),
        redisErrHandler(next)
      );

      const info = JSON.parse(await getAsync(REDIS_MESSAGES));
      info.student = req.body;
      client.set(REDIS_MESSAGES, JSON.stringify(info), redisErrHandler(next));
      return res
        .status(200)
        .json(req.body)
        .end();
    } catch (error) {
      return next(error);
    }
  }
);

export default messagesRouter;
