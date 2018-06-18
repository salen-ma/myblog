import db from "../db.js"

const TagMd = db.defineModel('tags_md', {
  tag_id: db.STRING(50),
  md_id: db.STRING(50),
});

export default TagMd;