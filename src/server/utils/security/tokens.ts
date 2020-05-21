import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import db from "../../db";
import config from "../../config";
import { IPayload } from "../types";

export const CreateToken = async (payload: IPayload) => {
  let tokenid: any = await db.tokens.insertToken(payload.userid);
  payload.accesstokenid = tokenid.insertId;
  payload.unique = crypto.randomBytes(32).toString("hex");
  let token = await jwt.sign(payload, config.auth.secret);
  await db.tokens.updateToken(payload.accesstokenid, token);
  return token;
};

export const ValidToken = async (token: string) => {
  let payload: IPayload = <IPayload>jwt.decode(token);
  let [accesstokenid] = await db.tokens.findToken(payload.accesstokenid, token);
  if (!accesstokenid) {
    throw new Error("Invalid Token");
  } else {
    return payload;
  }
};

export default {
  CreateToken,
  ValidToken,
};
