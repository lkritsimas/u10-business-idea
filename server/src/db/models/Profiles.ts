import {
  Sequelize, DataTypes, Model, BuildOptions,
} from 'sequelize';

export interface Profiles {
  id: string;
  matchId: string; // Swiping user
  userId: string; // User receiving swipe
  matchedUserId: string;
}

export type ProfilesStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Profiles;
};

module.exports = (sequelize: Sequelize) => {
  const profiles = sequelize.define('profiles', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      primaryKey: true,
    },
    matchId: DataTypes.UUID, // Swiping user
    userId: DataTypes.UUID, // User receiving swipe
    matchedUserId: DataTypes.UUID, // User receiving swipe
  }) as ProfilesStatic;

  // @ts-ignore
  profiles.associate = ({ users, matches, messages }) => {
    profiles.belongsTo(matches, {
      onDelete: 'cascade',
    });

    profiles.belongsTo(users, {
      foreignKey: 'matchedUserId',
      onDelete: 'cascade',
    });

    profiles.hasMany(messages, {
      foreignKey: 'matchId',
      sourceKey: 'matchId',
    });

    // profiles.belongsToMany(users, {
    //   through: 'matches',
    //   as: 'matchedUser',
    //   foreignKey: 'matchedUserId',
    //   onDelete: 'cascade',
    // });
    // profiles.belongsTo(users, {
    //   foreignKey: 'toUserId',
    //   onDelete: 'cascade',
    // });
  };

  return profiles;
};
