import {
  Sequelize, DataTypes, Model, BuildOptions,
} from 'sequelize';
import { v1 as uuidv1 } from 'uuid';
import { UserStatic } from '../../types/user';

module.exports = (sequelize: Sequelize) => {
  const user = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv1(),
      primaryKey: true,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    // Personal details
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('M', 'F'),
      allowNull: false,
    },
    attractedTo: DataTypes.ARRAY(DataTypes.ENUM('M', 'F')),
    age: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    bio: DataTypes.STRING(500),
    occupation: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        len: {
          args: [0, 2],
          msg: 'occupation cannot exceed 2 items',
        },
      },
    },
    education: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        len: {
          args: [0, 2],
          msg: 'education cannot exceed 2 items',
        },
      },
    },

    // Geolocation
    position: DataTypes.GEOMETRY('POINT'), // Requires PostGIS extension

    // Uploads
    photo1: DataTypes.STRING,
    photo2: DataTypes.STRING,
    photo3: DataTypes.STRING,
    photo4: DataTypes.STRING,
    photo5: DataTypes.STRING,
    photo6: DataTypes.STRING,

    // Settings
    minAge: {
      type: DataTypes.INTEGER,
      defaultValue: 18,
    },
    maxAge: {
      type: DataTypes.INTEGER,
      defaultValue: 55,
    },
    maxDistance: {
      type: DataTypes.INTEGER,
      defaultValue: 30,
    },
    distanceType: DataTypes.ENUM('km', 'mi'),

    // OAuth stuff should go here
    refreshToken: DataTypes.STRING,
  },
  {
    indexes: [
      {
        fields: ['disabled', 'position', 'gender', 'age'],
      },
    ],
  }) as UserStatic;

  // @ts-ignore
  user.associate = ({ matches, messages }) => {
    user.hasMany(matches, {
      foreignKey: {
        name: 'matchId',
        field: 'id',
      },
      onDelete: 'cascade',
    });

    user.hasMany(messages, {
      foreignKey: {
        name: 'messageId',
        field: 'id',
      },
      onDelete: 'cascade',
    });
  };

  return user;
};
