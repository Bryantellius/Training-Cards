import { Query } from "../index";
import { IShoe } from "../../utils/types";

export const getAllShoes = () => {
  return Query("SELECT * FROM shoes");
};

export const getOneShoe = (id: number) => {
  return Query("SELECT * FROM shoes WHERE id = ?", [id]);
};

export const insertNewShoe = (body: IShoe) => {
  return Query("INSERT INTO shoes SET ?", [body]);
};

export const removeShoe = (id: number) => {
  return Query("DELETE FROM shoes WHERE id = ?", [id]);
};

export const updateShoe = (id: number, body: IShoe) => {
  return Query("UPDATE shoes SET ? WHERE id = ?", [body, id]);
};

export default {
  getOneShoe,
  insertNewShoe,
  updateShoe,
  removeShoe,
  getAllShoes,
};
