import * as express from "express";
import shoeRouter from "./shoes";
import messageRouter from "./messages";
import assetRouter from "./assets";
import * as passport from "passport";
import db from "../../db";

const router = express.Router();

router.use((req, res, next) => {
  passport.authenticate("bearer", { session: false }, (err, user, info) => {
    if (user) req.user = user;
    return next();
  })(req, res, next);
});

router.use("/shoes", shoeRouter);
router.use("/messages", messageRouter);
router.use("/assets", assetRouter);

router.get("/users", async (req, res, next) => {
  try {
    let users = await db.users.getAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.delete("/users/:id", async (req, res, next) => {
  let id = Number(req.params.id);
  try {
    let result = await db.users.remove(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
