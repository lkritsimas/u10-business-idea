module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('swipes', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      primaryKey: true,
    },
    fromUserId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    toUserId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    like: Sequelize.BOOLEAN,

    // Timestamps
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  },
  {
    // Should not be unique - Needs fix
    // uniqueKeys: {
    //   Users: {
    //     customIndex: true,
    //     fields: ['fromUserId', 'toUserId'],
    //   },
    // },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('swipes'),
};
