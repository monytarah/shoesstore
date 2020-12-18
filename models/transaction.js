'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Product)
      Transaction.belongsTo(models.User)
    }
    formatRupiah(price) {  
      return `Rp. ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")},00`
    }
  };
  Transaction.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate: (instance, options) => {
        instance.quantity = 1
        instance.total_price = options.price
      }
    },
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};