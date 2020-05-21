import * as express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.json("Shoes");
  } catch (err) {
    next(err);
  }
});

export default router;
