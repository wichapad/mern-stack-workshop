import NavbarComponent from "./NavbarComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate, getUser } from "../services/authorize";
import { withRouter } from "react-router-dom";

const LoginComponent = (props) => {
  // eslint-disable-next-line
  const [state, setState] = useState({
    username: "",

    password: "",
  });
  const { username, password } = state;

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/login`, { username, password })
      .then((response) => {
        //login สำเร็จ
        authenticate(response, () => props.history.push("/create"));
      })
      .catch((err) => {
        Swal.fire("Alert!", err.response.data.error, "error");
      });
  };

  useEffect(() => {
    getUser() && props.history.push('/'); //ถ้ามี user อยู่ใน sessionstorage จะไม่สามารถเข้ามาหน้า login ได้
    // eslint-disable-next-line
  },[]);

  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>Login (Admin)</h1>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={inputValue("username")}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={inputValue("password")}
          />
        </div>
        <br />
        <input type="submit" value="Login" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default withRouter(LoginComponent);
