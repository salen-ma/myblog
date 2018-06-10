import db from "../db.js"

const Admin = db.defineModel('Admin', {
  user_name: db.STRING(50),
	password: db.STRING(20),
});

export default Admin;