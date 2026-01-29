'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Order_Item.belongsTo(models.Products,{foreignKey:"id_product"});

      Order_Item.belongsTo(models.Order,{foreignKey:"id_order"});
     
    }
  }
  Order_Item.init({
    id_order: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    unit_price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Order_Item',
  });
  return Order_Item;
};