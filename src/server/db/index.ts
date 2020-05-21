import * as mysql from "mysql";
import config from "../config";
import { IUser, IShoe } from "../utils/types";
import shoes from "./queries/shoes";
import users from "./queries/users";
import tokens from "./queries/tokens";

export const Connection = mysql.createPool(config.mysql);

export const Query = (
  query: string,
  values?: Array<string | number | IUser | IShoe>
) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query(query, values, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

export default { shoes, users, tokens };
