'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      email: 'johndoe@g.c',
      password: '123456',
      status: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Jane Doe',
      email: 'janedoe@g.c',
      password: '123456',
      status: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Kanye West',
      email: 'kanyewest@g.c',
      password: '123456',
      status: 2,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
