import { Request, NextFunction, Response } from "express";
import * as basicAuth from "basic-auth";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const credentials = basicAuth(req);

  if (credentials && credentials.pass === process.env.SECRET) {
    return next();
  }

  return res.status(401).end();
};

export default auth;
