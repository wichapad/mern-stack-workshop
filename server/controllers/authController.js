const jwt = require("jsonwebtoken"); //สร้าง token
const{ expressjwt: expressjwt} = require("express-jwt") //ตรวจสอบ token

exports.login = (req, res) => {
  //ข้อมูลคนที่เข้าสู่ระบบ
  const { username, password } = req.body;
  if (password === process.env.PASSWORD) {
    //login สำเร็จ
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.json({ token, username });
  } else {
    return res.status(400).json({
      error: "Password is correct",
    });
  }
};

//ตรวจสอบ token
exports.requireLogin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});
