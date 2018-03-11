import * as express from "express";
import * as logger from "morgan";
import * as cors from "cors";
import * as helmet from "helmet";
import * as dotenv from "dotenv";

// Routes
import entries from "./routes/entries";
import status from "./routes/status";
import info from "./routes/info";

// Env
dotenv.config();
const PRODUCTION = process.env.NODE_ENV === "production";

// App Setup
const app = express();
app.set("port", process.env.PORT || 3000);

// Security
app.disable("etag");
if (PRODUCTION) {
  app.use(helmet());
}

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cors({ origin: true }));
app.options("*", cors({ origin: true }));

// Routes
app.use("/entries", entries);
app.use("/status", status);
app.use("/info", info);

app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});
