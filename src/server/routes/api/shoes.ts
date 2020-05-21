import * as express from "express";
import db from "../../db";

const router = express.Router();

router.get("/:id?", async (req, res, next) => {
  let id = Number(req.params.id);
  if (id) {
    try {
      let [shoe] = await db.shoes.getOneShoe(id);
      res.json(shoe);
    } catch (err) {
      next(err);
    }
  } else {
    try {
      let shoes = await db.shoes.getAllShoes();
      res.json(shoes);
    } catch (err) {
      next(err);
    }
  }
});

router.post("/", async (req, res, next) => {
  try {
    let body = req.body;
    let result = await db.shoes.insertNewShoe(body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    let id = Number(req.params.id);
    let body = req.body;
    let result = await db.shoes.updateShoe(id, body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let id = Number(req.params.id);
    let result = await db.shoes.removeShoe(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
