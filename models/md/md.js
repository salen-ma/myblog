import db from "../db.js"

const Md = db.defineModel('Md_List', {
  title: db.STRING(50),
  summary: db.STRING(200),
  path: db.STRING(100),
  isDelete: db.INTEGER(1),
});

export default Md;