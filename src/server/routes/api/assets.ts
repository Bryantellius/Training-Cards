import * as express from "express";
import * as fileUpload from "express-fileupload";
import * as fs from "fs";
import * as path from "path";

const router = express.Router();

router.use(fileUpload());

router.post(
  "/",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      if (!req.files) {
        res.json({ msg: "no go bro" });
        return;
      }

      console.log(`req.files > ${req.files}`);

      res.json({ msg: "Done" });
      // fs.writeFile(path.join(__dirname, `/public/assets/${fn}`), file, (err) => {
      //   if (err) throw err;
      //   console.log("File has been saved.");
      // });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
