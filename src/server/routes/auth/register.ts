import * as express from "express";
import db from '../../db';
import { CreateToken } from "../../utils/security/tokens";
import { hashPassword } from "../../utils/security/passwords";

const router = express.Router();

router.post(
  "/",
  async (req: any, res, next) => {
    try {
        let user = req.body;
        user.password = hashPassword(req.body.password);
        let result: any = await db.users.newUser(user);
      let token = await CreateToken({ userid: result.insertId });
      res.json({
        token,
        role: "employee",
        userid: result.insertId,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
