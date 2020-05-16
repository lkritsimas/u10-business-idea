import {
  Sequelize, DataTypes, Model, BuildOptions,
} from 'sequelize';

export interface MatchedUsers {
  id: string;
  matchId: string;
  userId: string;
  matchedUserId: string;
}

export type MatchedUsersStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MatchedUsers;
};

module.exports = (sequelize: Sequelize) => {
  const matchedUsers = sequelize.define('matchedUsers', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      primaryKey: true,
    },
    matchId: DataTypes.UUID,
    userId: DataTypes.UUID,
    matchedUserId: DataTypes.UUID,
  }) as MatchedUsersStatic;

  // @ts-ignore
  matchedUsers.associate = ({ users, matches }) => {
    // matchedUsers.belongsToMany(users, {
    //   through: matches,
    //   onDelete: 'cascade',
    // });

    // matchedUsers.belongsToMany(users, {
    //   through: matches,
    //   as: 'matchedUser',
    //   //   foreignKey: 'matchedUserId',
    //   onDelete: 'cascade',
    // });
  };

  return matchedUsers;
};
