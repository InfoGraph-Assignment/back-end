'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { set } = require('express/lib/application');
require('dotenv').config();



const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },

        address: {
            type: DataTypes.STRING,
            allowNull : false
        },

        gender:{
            type : DataTypes.STRING,
            allowNull : false
        },

        birthDate :{
            type : DataTypes.STRING,
            allowNull : false
        },
        

        role: {
            type: DataTypes.ENUM('admin', 'customer'),
            defaultValue: 'customer'
        },

        capabilities: {
            type: DataTypes.VIRTUAL,
            get() {
                const acl = {
                    admin: ["read", "create", "update", "delete"],
                    customer: ["read", "create", "update"]
                };

                return acl[this.role];
            }
        },

        token : {
            type: DataTypes.VIRTUAL,
            get() {
                let createdAt = new Date(this.createdAt).toLocaleDateString();
                createdAt = createdAt.split("/")[1] + " / " + createdAt.split("/")[0] + " / " + createdAt.split("/")[2]  
                return jwt.sign({
                    id: this.id,
                    userName : this.userName,
                    email: this.email,
                    role: this.role,
                    capabilities: this.capabilities,
                    address: this.address,
                    phone: this.phone,
                    gender : this.gender,
                    birthDate : this.birthDate,
                    createdAt : createdAt

                }, process.env.JWT_SECRET || 'secret');
            },

            set(tokenObject){
                let token = jwt.sign(tokenObject, process.env.JWT_SECRET || 'secret');
                return token;
            }
        }
    });

    User.beforeCreate((user) => {
        user.password = bcrypt.hashSync(user.password, 10);
    });

    User.authenticateBasic = (email, password) => {
     
        return User.findOne({  where: { email } }) 
        .then( async (user) => {
          
            if (user && await bcrypt.compare(password, user.password)) {
                return user;
            }
            else {
                throw new Error("No such user");
            }
        });
    };


    User.authenticateToken = (token) => {
        console.log(token);
        return jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
            if (err) {
                throw new Error("Invalid token");
            } else {
                return decoded;
            }
        });
    };

    return User;
}

module.exports = UserModel;