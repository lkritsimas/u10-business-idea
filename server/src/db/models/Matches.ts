import { Sequelize, DataTypes } from 'sequelize';
import { MatchesStatic } from '../../types/matches';

module.exports = (sequelize: Sequelize) => {
  const matches = sequelize.define('matches', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      primaryKey: true,
    },
    userId1: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId2: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }) as MatchesStatic;

  // @ts-ignore
  matches.associate = ({ users, messages }) => {
    matches.belongsTo(users, {
      foreignKey: 'userId1',
      onDelete: 'cascade',
    });

    matches.belongsTo(users, {
      foreignKey: 'userId2',
      onDelete: 'cascade',
    });

    matches.hasMany(messages, {
      foreignKey: 'matchId',
      onDelete: 'cascade',
    });
  };

  return matches;
};
