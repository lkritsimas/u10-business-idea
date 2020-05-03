import {
  Sequelize, DataTypes, Model, BuildOptions,
} from 'sequelize';
import { v1 as uuidv1 } from 'uuid';
import { MessagesStatic } from '../../types/messages';

module.exports = (sequelize: Sequelize) => {
  const messages = sequelize.define('Messages', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv1(),
      primaryKey: true,
    },
    matchId: DataTypes.UUID,
    fromUserId: DataTypes.UUID,
    toUserId: DataTypes.UUID,
    message: DataTypes.STRING(2000),
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }) as MessagesStatic;

  // @ts-ignore
  messages.associate = ({ user }) => {
    messages.belongsTo(user, {
      foreignKey: {
        name: 'messageId',
        field: 'id',
      },
      onDelete: 'cascade',
    });
  };

  return messages;
};
