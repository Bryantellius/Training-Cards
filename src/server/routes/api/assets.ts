import * as express from "express";
import fileupload from "express";
import * as fs from "fs";
import * as path from "path";

const router = express.Router();

// Need to npm i express-fileupload
// router.use(fileupload());

router.post("/", async (req, res, next) => {
//   let file = req.files;
//   let fn = file.name;
//   try {
//     console.log({ file, fn });
//     res.json("Success");
//     fs.writeFile(path.join(__dirname, `public/assets/${fn}`), body, (err) => {
//       if (err) throw err;
//       console.log("File has been saved.");
//     });
//   } catch (err) {
//     next(err);
//   }
});

export default router;
