'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

// Set The Data Base
const SQL_DATABASE_URL ="postgres://fyzzotpt:hoAl8Jtqvtx0c5edg7kSsyUc5rSanAzd@salt.db.elephantsql.com/fyzzotpt";

const sequelize = new Sequelize(SQL_DATABASE_URL, {});


// Require the models
const UserModel = require('./UsersModel');
const RequestModel = require('./RequestsModel');


const User = UserModel(sequelize, DataTypes);
const Request = RequestModel(sequelize, DataTypes);



// Set the relations
User.hasMany(Request, {sourceKey:'id', foreignKey: 'userId' });
Request.belongsTo(User, {foreignKey: 'userId', targetKey: 'id' });




module.exports = {
    db : sequelize,
    User: User,
    Request: Request
}




