import * as express from "express";
import * as path from "path";
import router from "./routes";
import * as helmet from "helmet";
import * as compression from "compression";
import * as morgan from "morgan";
import { Error } from "./utils/types";
import * as passport from "passport";
import "./middleware/bearerstrategy";
import "./middleware/localstrategy";

const app = express();

app.use(helmet());
app.use(compression());

app.use(express.static("public"));
app.use(passport.initialize());
app.use(express.json());

app.use(morgan("dev"));
app.use(router);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(err.status || 500);
    res.json({ errors: { err: err.message } });
  }
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
