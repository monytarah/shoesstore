'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Users'},
          key: 'id', 
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'Products'},
          key: 'id', 
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      total_price: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transactions');
  }
};