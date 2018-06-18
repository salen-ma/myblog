"use strict";

import formidable from "formidable";

import TagModel from "../../models/tag/tag";

class Tag {
  constructor() {
    this.addTag = this.addTag.bind(this)
  }

  checkSame(name) {
    return TagModel.findOne({
      where: {
        name: name
      }
    });
  }

  async addTag(req, res, next) {
    console.log("add tag");
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      let name = fields.tagName;
      let isSame = await this.checkSame(name)
      if(!isSame) {
        await TagModel.create({name: name});
        res.send({ status: 200,  message: "新建成功" });
      }else {
        res.send({ status: 400, message: "标签已存在" });
      }
    });
  }
}

export default new Tag();
