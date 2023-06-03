import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken } from "../services/authorize";

const EditComponent = (props) => {
  // eslint-disable-next-line
  const [state, setState] = useState({
    title: "",
    author: "",
    slug: "",
  });
  const { title, author, slug } = state;

  //เขียน state content แยก เพื่อทำงานร่วมกับ react Quill
  const [content, setContent] = useState("");

  const submitContent = (e) => {
    //กำหนดค่าให้กับ state Contnent
    setContent(e);
  };

  //ดึงข้อมูลที่ต้องการ edit
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
      .then((response) => {
        const { title, content, author, slug } = response.data;
        setState({ ...state, title, author, slug });
        setContent(content);
      })
      .catch((err) => alert(err));
    // eslint-disable-next-line
  }, []);

  const showUpdateForm = () => (
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
          className="pb-5 mb-3"
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
      <input type="submit" value="Update" className="btn btn-primary" />
    </form>
  );

  //กำหนดค่าให้ state
  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
  // method put
  const submitForm = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API}/blog/${slug}`,
        {
          title,
          content,
          author,
        },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      )
      .then((response) => {
        Swal.fire("Alert!", "Update Data Success", "success");
        const { title, content, author, slug } = response.data; //response ข้อมูลชุดใหม่ที่ update จากฐานข้อมูล มาแสดง
        setState({ ...state, title, author, slug });
        setContent(content);
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>Edit Content</h1>
      {showUpdateForm()}
    </div>
  );
};

export default EditComponent;
