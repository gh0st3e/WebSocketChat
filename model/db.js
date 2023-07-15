"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var db_config_1 = require("../config/db.config");
var sequelize = new sequelize_1.Sequelize(db_config_1.DB_CONFIG.DB, db_config_1.DB_CONFIG.USER, db_config_1.DB_CONFIG.PASSWORD, {
    host: db_config_1.DB_CONFIG.HOST,
    dialect: db_config_1.DB_CONFIG.DIALECT
});
exports.default = sequelize;
