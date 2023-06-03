import NavbarComponent from "./components/NavbarComponent";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Parser } from "html-to-react";
import { getUser ,getToken} from "./services/authorize";

function App() {
  const [blogs, setBlogs] = useState([]);

  const fectchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((err) => alert(err));
  };
  useEffect(() => {
    //ดึงข้อมูลจาก API
    fectchData();
  }, []);

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "Do you sure delete?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      //กด OK
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };
  const deleteBlog = (slug) => {
    // ส่ง req ไปที่ api เพื่อลบข้อมูล
    axios
      .delete(`${process.env.REACT_APP_API}/blog/${slug}`,{ headers: { Authorization: `Bearer ${getToken()}` } })
      .then((response) => {
        Swal.fire("Deleted!", response.data.message, "success");
        fectchData(); //ดึงข้อมูลล่าสุดที่อยู่ในฐานข้อมูลมาใช้งาน
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container p-5">
      <NavbarComponent />
      {blogs.map((blog, index) => (
        <div
          className="row"
          key={index}
          style={{ borderBottom: "1px solid silver" }}
        >
          <div className="col pt-3 pb-2">
            <Link to={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>
            <div className="pt-3">
              {Parser().parse(blog.content.substring(0, 180))}
            </div>
            <p className="text-muted">
              Author:{blog.author} Date:
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            {getUser() && (
              <div>
                <Link
                  className="btn btn-outline-success"
                  to={`blog/edit/${blog.slug}`}
                >
                  Edit
                </Link>{" "}
                &nbsp;
                <button
                  className="btn btn-outline-danger"
                  onClick={() => confirmDelete(blog.slug)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
