// create Schema
// title , content , author , slug(url)
//timestamps คือ ช่วงเวลาที่ทำการบันทึก ปรับปรุง แก้ไขข้อมูล

const mongoose = require("mongoose");
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true, //ห้ามใส่ค่าว่าง
    },
    content: {
      type: {},
      required: true,
    },
    author: {
      type: String,
      default: "Admin",
    },
    slug: {
      type: String,
      lowercase: true, //ถ้าพิมพ์ตัวพิมใหญ่ปะปนมา จะแปลงให้เป็นตัวพิมพ์เล็กทั้งหมด
      unique: true, // ห้ามตั้งชื่อซ้ำ
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blogs", blogSchema);
