import * as dotenv from "dotenv";

const findEnv = dotenv.config();

if (!findEnv) {
  throw new Error("Can't find .env. BAD ERROR");
}

export default {
  mysql: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.SCHEMA,
  },
  port: parseInt(process.env.PORT, 10),
  auth: {
    secret: process.env.SECRET,
  },
};
