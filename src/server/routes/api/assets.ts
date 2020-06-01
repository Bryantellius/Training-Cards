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
      let newImage: any = req.files.image;

      let buffer = new Buffer(newImage.data, "base64");

      fs.writeFile(
        path.join(__dirname, `../public/assets/${newImage.name}`),
        buffer,
        (err: Error) => {
          if (err) {
            next(err);
          }
          res.send({ msg: "File Uploaded" });
        }
      );
    } catch (err) {
      next(err);
    }
  }
);

export default router;
