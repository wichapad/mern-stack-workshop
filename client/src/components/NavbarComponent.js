import { Link, withRouter } from "react-router-dom";
import { getUser, logout } from "../services/authorize";

const NavbarComponent = ({history}) => {
  return (
    <nav>
      <ul className="nav nav-tabs">
        <li className="nav-item pr-3 pt-3 pb-3">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        {getUser() && ( //ถ้ายังมี ข้อมูล user เก็บใน session storage ให้แสดง link Write Content
          <li className="nav-item pr-3 pt-3 pb-3">
          <Link to="/create" className="nav-link">
            Write Content
          </Link>
        </li>
        )}
        
        {!getUser() && ( //ถ้ายังไม่มี ข้อมูล user เก็บใน session storage ให้แสดง link login
          <li className="nav-item pr-3 pt-3 pb-3">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        )}
        {getUser() && ( //ถ้ายังมี ข้อมูล user เก็บใน session storage ให้แสดง link logout
          <li className="nav-item pr-3 pt-3 pb-3">
            <button className="nav-link" onClick={()=>logout(()=>history.push("/"))}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default withRouter(NavbarComponent);
