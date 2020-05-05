import { Sequelize, DataTypes } from 'sequelize';
import { SwipesStatic } from '../../types/swipes';

module.exports = (sequelize: Sequelize) => {
  const swipes = sequelize.define('swipes', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      primaryKey: true,
    },
    fromUserId: DataTypes.UUID, // Swiping user
    toUserId: DataTypes.UUID, // User receiving swipe
    like: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }) as SwipesStatic;

  // @ts-ignore
  swipes.associate = ({ users, matches }) => {
    swipes.belongsTo(users, {
      foreignKey: 'fromUserId',
      onDelete: 'cascade',
    });

    swipes.belongsTo(users, {
      foreignKey: 'toUserId',
      onDelete: 'cascade',
    });
  };

  return swipes;
};
