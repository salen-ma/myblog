import db from "../db.js"

const Tags = db.defineModel('tags', {
  name: db.STRING(50),
});

export default Tags;