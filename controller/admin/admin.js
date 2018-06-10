'use strict'

import AdminModel from '../../models/admin/admin.js';

class Admin {
  constructor() {
    this.login = this.login.bind(this)
  }

  async login(req, res, next) {
    AdminModel.create(req.params)
    res.send(req.params)
  }
}

export default new Admin()