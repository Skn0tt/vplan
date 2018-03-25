import { Router } from "express";
import { returnRedis } from "../../helpers/redis";

const dayInfoRouter = Router();

export const DAYINFO = "DAYINFO";

dayInfoRouter.get("/", returnRedis(DAYINFO));

export default dayInfoRouter;
