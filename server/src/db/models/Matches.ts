import {
  Sequelize, DataTypes, Model, BuildOptions,
} from 'sequelize';
import { v1 as uuidv1 } from 'uuid';
import { MatchesStatic } from '../../types/matches';

module.exports = (sequelize: Sequelize) => {
  const matches = sequelize.define('Matches', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv1(),
      primaryKey: true,
    },
    fromUserId: DataTypes.UUID,
    toUserId: DataTypes.UUID,
  }) as MatchesStatic;

  // @ts-ignore
  matches.associate = ({ user }) => {
    matches.belongsTo(user, {
      foreignKey: {
        name: 'matchId',
        field: 'id',
      },
      onDelete: 'cascade',
    });
  };

  return matches;
};
