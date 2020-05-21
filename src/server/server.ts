import * as express from "express";
import apiRouter from "./routes";
import * as helmet from "helmet";
import * as compression from "compression";
import * as morgan from "morgan";
import config from "./config/index";

const app = express();

app.use(helmet());
app.use(compression());

app.use(express.static("public"));
app.use(express.json());

app.use(morgan("dev"));
app.use(apiRouter);

const port = config.port;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
