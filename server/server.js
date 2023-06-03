// จัดการตัว module ที่เกี่ยวข้องกับระบบ

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const blogRoute = require("./routes/blog");
const authRoute = require("./routes/auth");

const app = express();

//connect could database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  })
  .then(() => console.log("Connect To Success"))
  .catch((err) => console.log(err));

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//route
app.use("/api", blogRoute);
//test route
// app.get("*", (req, res) => {
//   res.json({
//     data: "message from server",
//   });
// });

app.use('/api', authRoute)

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`start server in port ${port}`);
});
