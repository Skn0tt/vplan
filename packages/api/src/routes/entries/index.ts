import { Router } from 'express';
import { createClient } from 'redis';
import { Entries } from 'vplan-types';

const entriesRouter: Router = Router();

// Redis Client
const client = createClient('redis://redis');
const ENTRIES = 'entries';

entriesRouter.get('/', async (_, res, next) => {
  client.get(ENTRIES, (err, reply) => {
    if (err) { next(err); }

    try {
      const entries: Entries = JSON.parse(reply);
      return res.json(entries);
    } catch (err) {
      return next(err);
    }
  })
})

entriesRouter.post('/', async (req, res) => {
  res.json(req.body).end();
})

export default entriesRouter;
