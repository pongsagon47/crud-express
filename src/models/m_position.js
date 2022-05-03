/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mPosition', {
    pId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'p_id'
    },
    pName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'p_name'
    }
  }, {
    tableName: 'm_position',
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updateAt: false
  })
}
