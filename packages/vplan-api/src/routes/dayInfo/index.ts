import { Router } from "express";
import { returnRedis } from "../../helpers/redis";

const dayInfoRouter = Router();

export const REDIS_DAYINFO = "DAYINFO";

dayInfoRouter.get("/", returnRedis(REDIS_DAYINFO));

export default dayInfoRouter;
