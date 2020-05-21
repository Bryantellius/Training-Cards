import { Query } from "../index";

export const findToken = (id: number, token: string) => {
  return Query("SELECT * FROM accesstokens WHERE id = ? AND token = ?", [
    id,
    token,
  ]);
};

export const insertToken = (id: number) => {
  return Query("INSERT INTO accesstokens SET userid = ?", [id]);
};

export const updateToken = (id: number, token: string) => {
  return Query("UPDATE accesstokens SET token = ? WHERE id = ?", [token, id]);
};

export default {
  findToken,
  insertToken,
  updateToken,
};
