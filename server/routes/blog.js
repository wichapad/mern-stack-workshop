//จัดการเกี่ยวกับเส้นทาง

const express = require("express");
const {
  create,
  getAllblogs,
  singleBlog,
  remove,
  update,
} = require("../controllers/blogController");
const router = express.Router();
const { requireLogin } = require("../controllers/authController");

// สร้าง router
//ใช้ express jwt เป็น middleware ตรวจสอบว่า ถ้าจะใช้ ข้อมูลapi ต้องทำการ login ก่อน
router.post("/create", requireLogin, create);

router.get("/blogs", getAllblogs);
router.get("/blog/:slug", singleBlog);

router.delete("/blog/:slug", requireLogin, remove);
router.put("/blog/:slug", requireLogin, update);
module.exports = router;
