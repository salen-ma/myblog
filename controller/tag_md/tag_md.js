"use strict"

import TagMdModel from "../../models/tag_md/tag_md"

class TagMd {
  constructor() {
    
  }

  checkSame(md_id, tag_id) {
    return TagMdModel.findOne({
      where: {
        md_id: md_id,
        tag_id: tag_id,
      }
    })
  }

  async addTagMd(tag_id, md_id) {
    let isSame = await this.checkSame(md_id,tag_id)
    console.log(isSame)
    if(!isSame) {
      await TagMdModel.create({tag_id: tag_id, md_id: md_id})
    }
  }

  async getTagsByMdId(md_id) {
    return await TagMdModel.findAll({
      where: {
        md_id: md_id
      },
      raw: true
    })
  }

  async getMdByTagId(req, res, next) {
    console.log("get tags")
    let tags = await TagModel.findAll()
    res.send({ tags: tags })
  }
}

export default new TagMd()
