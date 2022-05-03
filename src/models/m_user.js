/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mUser', {
    uId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'u_id'
    },
    uFirstName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'u_first_name'
    },
    uLastName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'u_last_name'
    },
    pId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'p_id'
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'create_date'
    },
    updateDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'update_date'
    },
    del: {
      type: DataTypes.STRING(5),
      allowNull: true,
      defaultValue: 'N',
      field: 'del'
    }
  }, {
    tableName: 'm_user',
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updateAt: false
  })
}
