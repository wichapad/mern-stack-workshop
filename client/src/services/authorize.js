// เก็บข้อมูล หรือ เก็บ Token username ลง Session Storage
export const authenticate = (response, next) => {
  if (window !== "undifined") {
    // เก็บข้อมูลลง Session storage
    sessionStorage.setItem("token", JSON.stringify(response.data.token));
    sessionStorage.setItem("user", JSON.stringify(response.data.username));
  }
  next();
};

//ดึงข้อมูล token

export const getToken = () => {
  if (window !== "undifined") {
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token"));
    }
  } else {
    return false;
  }
};

//ดึงข้อมูล user
export const getUser = () => {
  if (window !== "undifined") {
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user"));
    }
  } else {
    return false;
  }
};

//logout
export const logout = (next) => {
  if (window !== "undifined") {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }
  next();
};
