module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Install Postgres extensions
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "postgis";');

    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
      },
      discoverable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
        type: Sequelize.ENUM(['M', 'F']),
        allowNull: false,
      },
      attractedTo: {
        type: Sequelize.ARRAY(Sequelize.ENUM('M', 'F')),
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
      // // Should not be unique - Needs fix
      // uniqueKeys: {
      //   users: {
      //     customIndex: true,
      //     fields: ['discoverable', 'position', 'gender', 'age'],
      //   },
      // },
    });
  },

  down: (queryInterface, Sequelize) => queryInterface.dropTable('users'),
};
