module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('matches', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      primaryKey: true,
    },
    userId1: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    userId2: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
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
    unmatchedAt: Sequelize.DATE,
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('matches'),
};
