import * as React from "react";
import { apiService, User } from "../utils/apiService";

const AddMessage: React.FC<IAddMessageProps> = () => {
  const [text, setText] = React.useState<string>("");

  const send = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let alertDiv = document.getElementById("messageAlert");
    if (text === "") {
      alertDiv.classList.remove("alert-success");
      alertDiv.classList.add("alert-danger");
      alertDiv.innerHTML = "All input fields must have values.";
      alertDiv.style.display = "block";
      return;
    }
    let body = {
      userid: User.userid,
      message: text,
    };
    try {
      let res = await apiService("/api/messages", "POST", body);
      if (res) {
        alertDiv.classList.remove("alert-danger");
        alertDiv.classList.add("alert-success");
        alertDiv.innerHTML = "Message Added!";
        alertDiv.style.display = "block";
        setText("");
      }
    } catch (err) {
      alert("An error occured while trying to add a message.");
      throw err;
    }
  };

  return (
    <main className="container my-3 d-flex flex-column justify-content-center align-items-center">
      <div id="messageAlert" className="alert alert-success col-md-12"></div>
      <form className="form-group col-md-10 p-3">
        <div className="mb-3">
          <label>Message:</label>
          <textarea
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
          onClick={send}
        >
          Add
        </button>
      </form>
    </main>
  );
};

export interface IAddMessageProps {}

export default AddMessage;
