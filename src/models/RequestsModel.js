'use strict';

const RequestModel = (sequelize, DataTypes) => {
    const Request = sequelize.define('Request', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false
        },

        location : {
            type: DataTypes.STRING,
            allowNull: false
        },

        status : {
            type: DataTypes.ENUM('pending',  'accepted', 'rejected'),
            defaultValue: 'pending'
        },

        contactPhone :{
            type: DataTypes.STRING,
            allowNull: false
        },

        userId : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return Request;
}

module.exports = RequestModel;