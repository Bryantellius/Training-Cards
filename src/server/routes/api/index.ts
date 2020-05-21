import * as express from "express";
import shoeRouter from "./shoes";

const router = express.Router();

router.use("/shoes", shoeRouter);

export default router;
