const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    uId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'u_id'
    },
    uFirstname: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'u_firstname'
    },
    uLastname: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'u_lastname'
    },
    bId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'b_id'
    },
    uRole: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'u_role'
    },
    del: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "\"N\""
    },
    createDate: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'create_date'
    },
    createBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'create_by'
    },
    updateDate: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'update_date'
    },
    updateBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'update_by'
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false
  });
};
