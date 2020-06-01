import * as React from "react";
import { apiService } from "../utils/apiService";
import { IMessage } from "../utils/Types";

const ListMessages: React.FC<IListMessagesProps> = () => {
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const [text, setText] = React.useState<string>("");
  const [showing, setShowing] = React.useState<boolean>(false);
  const [editID, setEditID] = React.useState<number>(0);

  const displayMessages = async () => {
    let messages = await apiService("/api/messages");
    setMessages(messages.splice(messages.length - 3).reverse());
  };

  const remove = async (id: Number) => {
    let res = await apiService(`/api/messages/${id}`, "DELETE");
    displayMessages();
  };

  const focusModal = (message?: IMessage) => {
    setText(message?.message);
    setEditID(Number(message?.id));
    let modal = document.getElementById("messageModal");
    if (showing) {
      modal.style.display = "none";
      setShowing(false);
    } else {
      modal.style.display = "block";
      setShowing(true);
    }
  };

  const update = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    let res = await apiService(`/api/messages/${id}`, "PUT", { message: text });
    focusModal();
    displayMessages();
  };

  React.useEffect(() => {
    displayMessages();
  }, []);

  return (
    <main className="container my-3">
      <div id="messageModal">
        <div className="card align-items-center justify-content-center mx-auto col-md-6 p-3">
          <form className="form-group w-100">
            <div className="mb-3 d-flex justify-content-between">
              <label>Edit Message:</label>
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
                className="feather feather-x"
                onClick={() => focusModal()}
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <div className="mb-3">
              <textarea
                id="editMessage"
                className="form-control mb-2"
                rows={5}
                placeholder="Message.."
                value={text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setText(e.target.value)
                }
              />
            </div>
            <button
              className="btn btn-info w-50 mx-auto d-block my-3"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => update(e, editID)}
            >
              Edit
            </button>
          </form>
        </div>
      </div>
      <button
        className="d-block w-100 btn btn-light mb-3"
        onClick={displayMessages}
      >
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
          className="feather feather-refresh-ccw"
        >
          <polyline points="1 4 1 10 7 10"></polyline>
          <polyline points="23 20 23 14 17 14"></polyline>
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
        </svg>
      </button>
      <h5 className="text-center">Displayed Messages</h5>
      <ul className="list-group-flush border-top">
        {messages.map((message: IMessage) => {
          return (
            <li
              className="list-group-item"
              key={`${message.id}-${message.lastname}`}
            >
              <div className="d-flex justify-content-between">
                <h5 onClick={() => focusModal(message)} className="feather-x">
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
