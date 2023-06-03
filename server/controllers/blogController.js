// Contact to Database จัดการเกี่ยวกับการประมวลผล การเชื่อมต่อกับฐานข้อมูล //ดำเนินการกับฐานข้อมูล
const slugify = require("slugify");
const Blogs = require("../models/blogs");
const { v4: uuidv4 } = require("uuid");
//บันทึกข้อมูล เก็บเป็น รูปแบบ object
exports.create = (req, res) => {
  const { title, content, author } = req.body;
  let slug = slugify(title);

  //validate (ตรวจสอบความถูกต้องของข้อมูล)
  if (!slug) slug = uuidv4();
  switch (true) {
    case !title:
      return res.status(400).json({ error: "Please Create title" });
      break;
    case !content:
      return res.status(400).json({ error: "Please Create Content" });
      break;
  }

  //บันทึกข้อมูล
  Blogs.create({ title, content, author, slug }, (err, blog) => {
    if (err) {
      res.status(400).json({ error: "Content is duplicate" });
    }
    res.json(blog);
  });

  //test
  //   res.json({
  //     data: { title, content, author, slug },
  //   });
};
//ดึงข้อมูล Content ทั้งหมด
exports.getAllblogs = (req, res) => {
  Blogs.find({}).exec((err, blogs) => {
    res.json(blogs);
  });
};

//ดึงบทความ อ้างอิงตาม slug
exports.singleBlog = (req, res) => {
  const { slug } = req.params;
  Blogs.findOne({ slug }).exec((err, blog) => {
    res.json(blog);
  });
};

//ลบข้อมูล
exports.remove = (req, res) => {
  const { slug } = req.params;
  Blogs.findOneAndRemove({ slug }).exec((err, blog) => {
    if (err) console.log(err);
    res.json({
      message: "Delete Complete",
    });
  });
};
//อัพดตข้อมูล
exports.update = (req, res) => {
  const { slug } = req.params;
  //ส่งข้อมูล => title ,content ,author
  const { title, content, author } = req.body;
  Blogs.findOneAndUpdate(
    { slug },
    { title, content, author },
    { new: true }
  ).exec((err, blog) => {
    if (err) console.log(err);
    res.json(blog);
  });
};
