import * as React from "react";
import { useHistory } from "react-router-dom";
import { apiService, User } from "../utils/apiService";
import { IMessage } from "../utils/Types";
import moment from "moment";

const Home: React.FC<IHomeProps> = () => {
  const history = useHistory();
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  const displayMessages = async () => {
    let messages = await apiService("/api/messages");
    setMessages(messages);
  };

  React.useEffect(() => {
    if (!User) {
      history.push("/login");
    } else {
      displayMessages();
    }
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
