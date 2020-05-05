const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        githubUsername: 'oerjan',
        name: 'Örjan',
        gender: 'M',
        attractedTo: Sequelize.literal('ARRAY[\'M\', \'F\']::"enum_users_attractedTo"[]'),
        age: '1985-01-01',
        bio: 'Testy test test',
        distanceType: 'km',
      },
      {
        githubUsername: 'lucyrawx',
        name: 'Lucy',
        gender: 'F',
        attractedTo: Sequelize.literal('ARRAY[\'M\']::"enum_users_attractedTo"[]'),
        age: '1995-01-01',
        bio: 'Heeeeyo!',
        occupation: ['Cashier', 'Walmart'],
        education: ['Student', 'freecodecamp.org'],
        distanceType: 'mi',
      },
      {
        githubUsername: 'michaeljscott',
        name: 'Michael',
        gender: 'M',
        attractedTo: Sequelize.literal('ARRAY[\'F\']::"enum_users_attractedTo"[]'),
        age: '1964-03-15',
        bio: 'Hi I\'m Date Mike. Nice to meet me.',
        occupation: ['Regional Manager', 'Dunder Mifflin'],
        distanceType: 'mi',
      },
      {
        githubUsername: 'charlie',
        name: 'Charlie',
        gender: 'M',
        attractedTo: Sequelize.literal('ARRAY[\'F\']::"enum_users_attractedTo"[]'),
        age: '1976-02-09',
        bio: 'Favorite food: Milk steak. You should know what that means.\nFavorite Hobby: Magnets. Just magnets.\nLikes: Ghouls, funny little green ghouls.',
        occupation: ['Janitor', 'Paddy\'s Pub'],
        distanceType: 'mi',
      },
      {
        githubUsername: 'ronaldmcdonald',
        name: 'Mac',
        gender: 'M',
        attractedTo: Sequelize.literal('ARRAY[\'M\']::"enum_users_attractedTo"[]'),
        age: '1977-04-14',
        bio: 'I\'m Not Fat. I\'m Cultivating Mass.',
        occupation: ['Manager', 'Paddy\'s Pub'],
        distanceType: 'mi',
      },
    ], {});

    const userIds = await queryInterface.sequelize.query(
      'SELECT id from users;',
    );

    await queryInterface.bulkInsert('swipes', [
      {
        fromUserId: userIds[0][0].id,
        toUserId: userIds[0][1].id,
        like: true,
      },
      {
        fromUserId: userIds[0][1].id,
        toUserId: userIds[0][0].id,
        like: true,
      },
      {
        fromUserId: userIds[0][1].id,
        toUserId: userIds[0][2].id,
        like: true,
      },
      {
        fromUserId: userIds[0][2].id,
        toUserId: userIds[0][1].id,
        like: true,
      },
      {
        fromUserId: userIds[0][2].id,
        toUserId: userIds[0][3].id,
        like: false,
      },
      {
        fromUserId: userIds[0][3].id,
        toUserId: userIds[0][2].id,
        like: true,
      },
    ], {});

    await queryInterface.bulkInsert('matches', [
      {
        userId1: userIds[0][0].id,
        userId2: userIds[0][1].id,
      },
      {
        userId1: userIds[0][0].id,
        userId2: userIds[0][2].id,
      },
      {
        userId1: userIds[0][0].id,
        userId2: userIds[0][3].id,
      },
    ], {});

    const matches = await queryInterface.sequelize.query(
      'SELECT "id", "userId1", "userId2" from matches;',
    );

    return queryInterface.bulkInsert(
      'messages',
      [
        {
          matchId: matches[0][0].id,
          fromUserId: matches[0][0].userId1,
          toUserId: matches[0][0].userId2,
          message: 'Heyooo!!!!!!!1111111111111111111111111111',
          readAt: Sequelize.literal('CURRENT_TIMESTAMP - INTERVAL \'1\' HOUR'),
        },
        {
          matchId: matches[0][0].id,
          fromUserId: matches[0][0].userId2,
          toUserId: matches[0][0].userId1,
          message: "don't ever talk to me again",
          readAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },

        {
          matchId: matches[0][1].id,
          fromUserId: matches[0][1].userId2,
          toUserId: matches[0][0].userId1,
          message: 'Hi',
          readAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },

        {
          matchId: matches[0][1].id,
          fromUserId: matches[0][2].userId2,
          toUserId: matches[0][0].userId1,
          message: 'Hello',
          readAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
