//ตรวจสอบ route ว่ามีการลงชื่อเข้าใช้หรือยัง
import { getUser } from "./services/authorize";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      getUser() ? (
        <Component {...props} /> //ถ้ามีการ login จะเปิดใช้งาน path ได้
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }} //ถ้าไม่มีการ login จะ redirect ไป หน้า login
        />
      )
    }
  />
);

export default AdminRoute;
