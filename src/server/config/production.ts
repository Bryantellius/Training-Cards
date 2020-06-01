import * as dotenv from "dotenv";

const findEnv = dotenv.config();

if (!findEnv) {
  throw new Error("Can't find .env. BAD ERROR");
}

export default {
  mysql: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
  },
  port: parseInt(process.env.PORT, 10),
  secret: process.env.SECRET,
};
