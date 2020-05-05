module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('messages', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      primaryKey: true,
    },
    matchId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'matches',
        key: 'id',
      },
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
    message: Sequelize.STRING(2000),

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
    readAt: Sequelize.DATE,
  },
  {
    // Should not be unique - Needs fix
    // uniqueKeys: {
    //   Users: {
    //     customIndex: true,
    //     fields: ['matchId', 'fromUserId', 'toUserId'],
    //   },
    // },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('messages'),
};
