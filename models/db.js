const Sequelize = require("sequelize")
import config from "../config"
const uuidv1 = require('uuid/v1');

function generateId() {
  return uuidv1();
}

console.log("init sequelize...")

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
})

const ID_TYPE = Sequelize.STRING(50)

function defineModel(name, attributes) {
  var attrs = {}
  for (let key in attributes) {
    let value = attributes[key]
    if (typeof value === "object" && value["type"]) {
      value.allowNull = value.allowNull || false
      attrs[key] = value
    } else {
      attrs[key] = {
        type: value,
        allowNull: false,
      }
    }
  }
  attrs.id = {
    type: ID_TYPE,
    primaryKey: true,
  }
  attrs.createdAt = {
    type: Sequelize.BIGINT,
    allowNull: false,
  }
  attrs.updatedAt = {
    type: Sequelize.BIGINT,
    allowNull: false,
  }
  attrs.version = {
    type: Sequelize.BIGINT,
    allowNull: false,
  }
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false,
    hooks: {
      beforeValidate: function(obj) {
        let now = Date.now()
        if (obj.isNewRecord) {
          if (!obj.id) {
            obj.id = generateId()
          }
          obj.createdAt = now
          obj.updatedAt = now
          obj.version = 0
        } else {
          obj.updatedAt = Date.now()
          obj.version++
        }
      },
    },
  })
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

var exp = {
  defineModel: defineModel,
}

for (let type of TYPES) {
  exp[type] = Sequelize[type];
}

export default exp;
