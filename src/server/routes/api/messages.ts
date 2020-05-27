import * as express from "express";
import db from "../../db";

const router = express.Router();

router.get("/:id?", async (req, res, next) => {
  let id = Number(req.params.id);
  if (id) {
    try {
      let [message] = await db.messages.getOneMessage(id);
      res.json(message);
    } catch (err) {
      next(err);
    }
  } else {
    try {
      let messages = await db.messages.getAllMessages();
      res.json(messages);
    } catch (err) {
      next(err);
    }
  }
});

router.post("/", async (req, res, next) => {
  try {
    let body = req.body;
    let result = await db.messages.insertNewMessage(body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    let id = Number(req.params.id);
    let body = req.body;
    let result = await db.messages.updateMessage(id, body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let id = Number(req.params.id);
    let result = await db.messages.removeMessage(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
