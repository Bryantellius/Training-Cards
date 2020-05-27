import * as React from "react";
import { apiService, User } from "../utils/apiService";
import { IMessage } from "../utils/Types";
import moment from "moment";

const Home: React.FC<IHomeProps> = () => {
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const [input, setInput] = React.useState<string>(undefined);

  const send = async () => {
    let body = {
      userid: 8,
      message: input,
    };
    let result = apiService("/api/messages", "POST", body);
    window.location.reload();
  };

  const deleteMessage = async (id: Number) => {
    let result = await apiService(`/api/messages/${id}`, "DELETE");
    window.location.reload();
  };

  const displayMessages = async () => {
    let messages = await apiService("/api/messages");
    setMessages(messages);
  };

  React.useEffect(() => {
    displayMessages();
  }, []);

  return (
    <main className="container-fluid">
      <div id="home" className="bg-dark row p-3">
        <div className="col-md-5 mb-3">
          <div id="messageDiv">
            {messages.map((message: IMessage) => {
              return (
                <div
                  className="card p-2 mb-2"
                  key={`${message.id}-${message.lastname}-${message.time}`}
                >
                  <div className="card-text">
                    <h5 className="d-flex justify-content-between">
                      <span>
                        {message.firstname} {message.lastname}
                      </span>
                      <span className="deleteX" onClick={() => deleteMessage(message.id)}>X</span>
                    </h5>
                    <p>{message.message}</p>
                    <span className="text-muted d-block text-right">
                      {moment(message.time).format("MMM Do YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <hr className="bg-light my-2" />
          <div id="messageInput" className="input-group">
            <textarea
              className="form-control"
              value={input}
              placeholder="Message.."
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setInput(e.target.value)
              }
            />
            <div className="input-group-append">
              <button className="btn btn-info" onClick={send}>
                Send
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-7 mb-3">
          <img
            className="shoeIMG"
            src="/assets/coverphoto.jpg"
            alt="Trak Shak Store Front"
          />
        </div>
      </div>
    </main>
  );
};

export interface IHomeProps {}

export default Home;
