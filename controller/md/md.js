"use strict";

import formidable from "formidable";
import md from "../../utils/markdown";

import MdModel from "../../models/md/md";

let fs = require("fs");
let path = require("path");

class Markdown {
  constructor() {
    this.read = this.read.bind(this);
    this.readMd = this.readMd.bind(this);
    this.save = this.save.bind(this);
    this.create = this.create.bind(this);
  }

  addMd(mdInfo) {
    console.log("add");
    let now = Date.now();
    console.log(now);
    return MdModel.create({
      title: mdInfo.title,
      summary: mdInfo.summary,
      tags: mdInfo.tags,
      path: "E:/myblog/static/md/" + now + ".md"
    });
  }
  
  deleteMd() {}

  readFile(dir) {
    return new Promise((resolve, reject) => {
      fs.readFile(dir, "utf-8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  writeFile(data, path) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, err => {
        if (err) {
          reject(err);
        } else {
          resolve({ status: 1 });
        }
      });
    });
  }

  async getMdById(id) {
    let mdItem = await MdModel.findById(id);
    return this.readFile(mdItem.path);
  }

  async read(req, res, next) {
    let id = req.query.id;
    let doc = await this.getMdById(id);
    let mdhtml = await md.render(doc);
    res.send({ html: mdhtml });
  }

  async readMd(req, res, next) {
    let id = req.query.id;
    let data = await this.getMdById(id);
    res.send({ value: data });
  }

  async getMd(req, res, next) {
    let mdList = await MdModel.findAll();
    mdList.forEach(item => {
      item.tags = item.tags.split(",");
    });
    res.send({ mdList: mdList });
  }

  async save(req, res, next) {
    const form = new formidable.IncomingForm();
    console.log("write...");

    form.parse(req, async (err, fields, files) => {
      let data = fields.md_str;
      let id = fields.id;
      let mdItem = await MdModel.findById(id);
      await this.writeFile(data, mdItem.path);
      res.send({ message: "保存成功" });
    });
  }

  async create(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      this.addMd(fields).then(async resinfo => {
        console.log(resinfo.path);
        await this.writeFile("# " + resinfo.title, resinfo.path);
        res.send({ message: "创建成功" });
      });
      // let mdItem = await MdModel.findById(id)
      // await this.writeFile(data, mdItem.path);
    });
  }

  async upload(req, res, next) {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, "../../static/md/mdimg/");

    form.parse(req, async (err, fields, files) => {
      let imgInfo = files.image;
      let extname = path.extname(imgInfo.name);
      let nowPath = imgInfo.path + extname;

      fs.rename(imgInfo.path, nowPath, function(err) {
        if (err) {
          throw Error("改名失败");
        }

        let url = "/md/mdimg/" + path.basename(nowPath);
        res.send({ url: url });
      });
    });
  }
}

export default new Markdown();
