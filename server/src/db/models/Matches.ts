import { Sequelize, DataTypes } from 'sequelize';
import { MatchesStatic } from '../../types/matches';

module.exports = (sequelize: Sequelize) => {
  const matches = sequelize.define('matches', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      primaryKey: true,
    },
    profileId: DataTypes.UUID,
    // userId1: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
    // userId2: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
  }) as MatchesStatic;

  // @ts-ignore
  matches.associate = ({ users, profiles, messages }) => {
    // matches.belongsTo(users, {
    //   as: 'UserId1',
    //   foreignKey: 'userId1',
    //   onDelete: 'cascade',
    // });

    // matches.belongsTo(users, {
    //   as: 'UserId2',
    //   foreignKey: 'userId2',
    //   onDelete: 'cascade',
    // });

    matches.belongsToMany(users, {
      through: profiles,
    });

    // matches.belongsToMany(users, {
    //   through: matchedUsers,
    //   foreignKey: 'matchId',
    //   sourceKey: 'id',
    // });

    matches.hasMany(messages, {
      foreignKey: 'matchId',
      onDelete: 'cascade',
    });
  };

  return matches;
};
