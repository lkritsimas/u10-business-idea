import { Sequelize, DataTypes } from 'sequelize';
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
  swipes.associate = ({ users }) => {
    swipes.belongsTo(users, {
      onDelete: 'cascade',
    });
  };

  return swipes;
};
