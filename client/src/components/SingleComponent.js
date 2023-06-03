import axios from "axios";
import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import { Parser } from "html-to-react";

const SingleComponent = (props) => {
  const [blog, setBlog] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((err) => alert(err));
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container p-5">
      <NavbarComponent />
      {blog && (
        <div className="mt-3">
          <h1>{blog.title}</h1>
          <div className="pt-3">{Parser().parse(blog.content)}</div>
          <p className="text-muted">
            Author:{blog.author} Date:
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default SingleComponent;
