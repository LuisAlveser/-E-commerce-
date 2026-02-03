'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Products.belongsTo(models.Category,{foreignKey:"id_category"});

      Products.hasMany(models.Order_Item,{foreignKey:"id_product"});
      Products.belongsTo(models.User,{foreignKey:"id_user"});
    }
  }
  Products.init({
    id_category: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DOUBLE,
    image_url: DataTypes.STRING,
    stock_quantity: DataTypes.INTEGER,
    id_user:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};