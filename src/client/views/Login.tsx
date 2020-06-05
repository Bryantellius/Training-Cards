import * as React from "react";
import { useHistory } from "react-router-dom";
import { apiService, setAccesstoken } from "../utils/apiService";

const Login: React.FC<ILoginProps> = () => {
  const history = useHistory();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let body = {
      email,
      password,
    };
    try {
      let result = await apiService("/auth/login", "POST", body);
      console.log(result);
      if (result) {
        setAccesstoken(result.token, {
          userid: result.userid,
          role: result.role,
        });
        history.push("/");
      } else {
        document.getElementById("failedAlert").innerHTML = "Login Information Is Incorrect";
        document.getElementById("failedAlert").classList.remove("hide");
      }
    } catch (err) {
      throw e;
    }
  };

  return (
    <main className="container my-5 d-flex flex-column justify-content-center align-items-center">
      <div className="alert alert-danger hide w-100" id="failedAlert"></div>
      <h1 className="text-center">Employee Portal</h1>
      <form className="border rounded p-3 col-md-6">
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="loginEmail"
            aria-describedby="email"
            value={email}
            placeholder="Email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="loginPassword"
            value={password}
            placeholder="Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <button
          type="submit"
          className="btn btn-info d-block w-50 mx-auto my-2"
          onClick={login}
        >
          Login
        </button>
      </form>
    </main>
  );
};

export interface ILoginProps {}

export default Login;
