import { Query } from "../index";
import { IUser } from "../../utils/types";

export const findOneByEmail = (email: string) => {
  return Query("SELECT * FROM users WHERE email = ?", [email]);
};

export const findOneById = (id: number) => {
  return Query("SELECT * FROM users WHERE id = ?", [id]);
};

export const newUser = (user: IUser) => {
  return Query("INSERT INTO users SET ?", [user]);
};

export const getAll = () => {
  return Query(`SELECT id, firstname, lastname, role, _created from users`);
};

export const remove = (id: number) => {
  return Query(`DELETE from users WHERE id = ?`, [id]);
};

export default {
  findOneByEmail,
  findOneById,
  newUser,
  getAll,
  remove,
};
