import { NextFunction, RequestHandler } from "express";
import { createClient, Callback } from "redis";
import { promisify } from "util";

// Redis Client
export const client = createClient("redis://redis");
export const getAsync: (key: string) => Promise<string> = promisify(
  client.get
).bind(client);

export const redisErrHandler = (next: NextFunction): Callback<"OK"> => err =>
  err && next(err);

export const returnRedis = (key: string): RequestHandler => async (
  _,
  res,
  next
) => {
  try {
    const entries = await getAsync(key);
    return res
      .status(200)
      .send(entries)
      .end();
  } catch (error) {
    return next(error);
  }
};
