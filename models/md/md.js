import db from "../db.js"

const Md = db.defineModel('Md_List', {
  title: db.STRING(50),
  summary: db.STRING(200),
  tags: db.STRING(100),
  path: db.STRING(100),
});

export default Md;