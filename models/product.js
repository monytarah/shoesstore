'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    formatRupiah(price) {  
      return `Rp. ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")},00`
    }

    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, { through: models.Transaction })
    }
  };
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};