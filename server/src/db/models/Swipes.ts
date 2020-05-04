import {
  Sequelize, DataTypes, Model, BuildOptions,
} from 'sequelize';
import { v1 as uuidv1 } from 'uuid';
import { SwipesStatic } from '../../types/swipes';

module.exports = (sequelize: Sequelize) => {
  const swipes = sequelize.define('Swipes', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv1(),
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
  swipes.associate = ({ user }) => {
    swipes.belongsTo(user, {
      foreignKey: {
        name: 'swipeId',
        field: 'id',
      },
      onDelete: 'cascade',
    });
  };

  return swipes;
};
