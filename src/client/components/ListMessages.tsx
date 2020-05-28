import * as React from "react";
import { apiService } from "../utils/apiService";
import { IMessage } from "../utils/Types";

const ListMessages: React.FC<IListMessagesProps> = () => {
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  const displayMessages = async () => {
    let messages = await apiService("/api/messages");
    setMessages(messages);
  };

  const remove = async (id: Number) => {
    let res = await apiService(`/api/messages/${id}`, "DELETE");
    displayMessages();
  };

  React.useEffect(() => {
    displayMessages();
  }, []);

  return (
    <main className="container my-3">
      <h5 className="text-center">Messages</h5>
      <ul className="list-group-flush">
        {messages.map((message: IMessage) => {
          return (
            <li
              className="list-group-item"
              key={`${message.id}-${message.lastname}`}
            >
              <div className="d-flex justify-content-between">
                <h5>
                  {message.firstname} {message.lastname}
                </h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x text-danger"
                  onClick={() => remove(message.id)}
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
              <p>{message.message}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export interface IListMessagesProps {}

export default ListMessages;
