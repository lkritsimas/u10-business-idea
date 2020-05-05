
const { v1: uuidv1 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      id: uuidv1(),
      githubUsername: 'oerjan',
      name: 'Örjan',
      gender: 'M',
      attractedTo: Sequelize.literal('ARRAY[\'M\', \'F\']::"enum_Users_attractedTo"[]'),
      age: '1985-01-01',
      bio: 'Testy test test',
      distanceType: 'km',
    },
    {
      id: uuidv1(),
      githubUsername: 'lucyrawx',
      name: 'Lucy',
      gender: 'F',
      attractedTo: Sequelize.literal('ARRAY[\'M\']::"enum_Users_attractedTo"[]'),
      age: '1995-01-01',
      bio: 'Heeeeyo!',
      occupation: ['Cashier', 'Walmart'],
      education: ['Student', 'freecodecamp.org'],
      distanceType: 'mi',
    },
    {
      id: uuidv1(),
      githubUsername: 'michaeljscott',
      name: 'Michael',
      gender: 'M',
      attractedTo: Sequelize.literal('ARRAY[\'F\']::"enum_Users_attractedTo"[]'),
      age: '1964-03-15',
      bio: 'Hi I\'m Date Mike. Nice to meet me.',
      occupation: ['Regional Manager', 'Dunder Mifflin'],
      distanceType: 'mi',
    },
    {
      id: uuidv1(),
      githubUsername: 'charlie',
      name: 'Charlie',
      gender: 'M',
      attractedTo: Sequelize.literal('ARRAY[\'F\']::"enum_Users_attractedTo"[]'),
      age: '1976-02-09',
      bio: 'Favorite food: Milk steak. You should know what that means.\nFavorite Hobby: Magnets. Just magnets.\nLikes: Ghouls, funny little green ghouls.',
      occupation: ['Janitor', 'Paddy\'s Pub'],
      distanceType: 'mi',
    },
    {
      id: uuidv1(),
      githubUsername: 'ronaldmcdonald',
      name: 'Mac',
      gender: 'M',
      attractedTo: Sequelize.literal('ARRAY[\'M\']::"enum_Users_attractedTo"[]'),
      age: '1977-04-14',
      bio: 'I\'m Not Fat. I\'m Cultivating Mass.',
      occupation: ['Manager', 'Paddy\'s Pub'],
      distanceType: 'mi',
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
