import { Query } from "../index";
import { IMessage } from "../../utils/types";

export const getAllMessages = () => {
  return Query(
    "SELECT s.id, u.firstname, u.lastname, s.message, s._created as time FROM social s JOIN users u ON s.userid = u.id"
  );
};

export const getOneMessage = (id: number) => {
  return Query(
    "SELECT s.id, u.firstname, u.lastname, s.message, s._created as time FROM social s JOIN users u ON s.userid = u.id WHERE id = ?",
    [id]
  );
};

export const insertNewMessage = (body: IMessage) => {
  return Query("INSERT INTO social SET ?", [body]);
};

export const removeMessage = (id: number) => {
  return Query("DELETE FROM social WHERE id = ?", [id]);
};

export const updateMessage = (id: number, body: IMessage) => {
  return Query("UPDATE social SET ? WHERE id = ?", [body, id]);
};

export default {
  getAllMessages,
  getOneMessage,
  insertNewMessage,
  removeMessage,
  updateMessage,
};
