const { v1: uuidv1 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      type: Sequelize.UUID,
      defaultValue: uuidv1(),
      primaryKey: true,
    },
    disabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    // GitHub
    githubUsername: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    // Personal details
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gender: {
      type: Sequelize.ENUM('M', 'F'),
      allowNull: false,
    },
    attractedTo: {
      type: Sequelize.ARRAY(Sequelize.ENUM(['M', 'F'])),
      allowNull: false,
    },
    age: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    bio: Sequelize.STRING(500),
    occupation: Sequelize.ARRAY(Sequelize.STRING),
    education: Sequelize.ARRAY(Sequelize.STRING),

    // Geolocation
    position: Sequelize.GEOMETRY('POINT'), // Requires PostGIS extension

    // Uploads
    photo1: Sequelize.STRING,
    photo2: Sequelize.STRING,
    photo3: Sequelize.STRING,
    photo4: Sequelize.STRING,
    photo5: Sequelize.STRING,
    photo6: Sequelize.STRING,

    // Settings
    minAge: {
      type: Sequelize.INTEGER,
      defaultValue: 18,
    },
    maxAge: {
      type: Sequelize.INTEGER,
      defaultValue: 55,
    },
    maxDistance: {
      type: Sequelize.INTEGER,
      defaultValue: 30,
    },
    distanceType: Sequelize.ENUM('km', 'mi'),

    // OAuth stuff should go here
    refreshToken: Sequelize.STRING,

    // Timestamps
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  },
  {
    // Should not be unique - Needs fix
    uniqueKeys: {
      users: {
        customIndex: true,
        fields: ['disabled', 'position', 'gender', 'age'],
      },
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
