import { Router } from "express";
import { getAsync, returnRedis, client } from "../../helpers/redis";
import _ = require("lodash");
import auth from "../../helpers/auth";

const infoRouter = Router();

const INFO = "INFO";

infoRouter.get("/", returnRedis(INFO));

infoRouter.put(
  "/",
  auth,
  (req, res, next) => {
    try {
      const json = JSON.parse(req.body);
      if (!json || !_.isArray(json)) {
        return res.status(400).end();
      }
    } catch (error) {
      return res.status(400).end();
    }
  },
  async (req, res, next) => {
    try {
      client.set(INFO, req.body, (err, reply) => {
        if (err) {
          throw err;
        }

        return res.status(200).end();
      });
    } catch (error) {
      return next(error);
    }
  }
);

export default infoRouter;
