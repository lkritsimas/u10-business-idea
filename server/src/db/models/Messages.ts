import { Sequelize, DataTypes } from 'sequelize';
import { MessagesStatic } from '../../types/messages';

module.exports = (sequelize: Sequelize) => {
  const messages = sequelize.define('messages', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      primaryKey: true,
    },
    matchId: DataTypes.UUID,
    fromUserId: DataTypes.UUID,
    toUserId: DataTypes.UUID,
    message: DataTypes.STRING(2000),
    readAt: DataTypes.DATE,
  }) as MessagesStatic;

  // @ts-ignore
  messages.associate = ({ users, profiles, matches }) => {
    messages.belongsTo(users, {
      foreignKey: 'fromUserId',
      onDelete: 'cascade',
    });

    messages.belongsTo(profiles, {
      foreignKey: 'matchId',
      onDelete: 'cascade',
    });

    messages.belongsToMany(matches, {
      through: profiles,
      foreignKey: 'matchId',
      onDelete: 'cascade',
    });

    // messages.belongsToMany(users, {
    //   through: profiles,
    //   foreignKey: 'matchId',
    //   onDelete: 'cascade',
    // });

    // messages.belongsTo(matches, {
    //   foreignKey: 'matchId',
    //   onDelete: 'cascade',
    // });
  };

  return messages;
};
