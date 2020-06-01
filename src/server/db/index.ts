import * as mysql from "mysql";
import config from "../config";
import { IUser, IShoe, IMessage } from "../utils/types";
import shoes from "./queries/shoes";
import users from "./queries/users";
import tokens from "./queries/tokens";
import messages from "./queries/messages";

export const Connection = mysql.createPool(config.mysql);

if (!Connection) {
  throw new Error("Can't Connect to DB!")
}

export const Query = (
  query: string,
  values?: Array<string | number | IUser | IShoe | IMessage>
) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query(query, values, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

export default { shoes, users, tokens, messages };
