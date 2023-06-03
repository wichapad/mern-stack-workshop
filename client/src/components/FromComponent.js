import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUser, getToken } from "../services/authorize";

const FromComponent = () => {
  // eslint-disable-next-line
  const [state, setState] = useState({
    title: "",

    author: getUser(),
  });
  const { title, author } = state;

  //เขียน state content แยก เพื่อทำงานร่วมกับ react Quill
  const [content, setContent] = useState("");

  //กำหนดค่าให้ state
  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
  const submitContent = (e) => {
    //กำหนดค่าให้กับ state Contnent
    setContent(e);
  };
  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API}/create`,
        { title, content, author },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      )
      .then((response) => {
        Swal.fire("Alert!", "Save Data Success", "success");
        setState({ ...state, title: "", author: "" });
        setContent("");
      })
      .catch((err) => {
        Swal.fire("Alert!", err.response.data.error, "error");
      });
  };
  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>Write Content</h1>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={inputValue("title")}
          />
        </div>
        <div className="form-group">
          <label>Content Detail</label>
          <ReactQuill
            value={content}
            onChange={submitContent}
            theme="snow"
            className="pb-3 mb-3"
            placeholder="Write Content..."
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={inputValue("author")}
          />
        </div>
        <br />
        <input type="submit" value="Save" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default FromComponent;
