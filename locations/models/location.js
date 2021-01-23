'use strict';

const { DataTypes, Model, QueryTypes } = require('sequelize');
const Connection = require('../db/connection');
const { OperationNotAllowed } = require('../errors');
const db = Connection.getInstance().connection;

class Location extends Model {}

Location.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    coordinates: {
        type: DataTypes.GEOMETRY,
        allowNull: false,
    },
    point: {
        type: DataTypes.VIRTUAL,
        get () {
            return this.coordinates.coordinates[0] + "," + this.coordinates.coordinates[1];
        }
    }
}, {
    sequelize: db,
    modelName: 'Location',
    tableName: 'locations',
    timestamps: false
});

module.exports = Location;