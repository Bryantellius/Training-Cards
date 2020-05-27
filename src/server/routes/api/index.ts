import * as express from "express";
import shoeRouter from "./shoes";
import messageRouter from "./messages";
import * as passport from "passport";

const router = express.Router();

router.use((req, res, next) => {
  passport.authenticate("bearer", { session: false }, (err, user, info) => {
    if (user) req.user = user;
    return next();
  })(req, res, next);
});

router.use("/shoes", shoeRouter);
router.use("/messages", messageRouter);

export default router;
