'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    // TODO: make sure to add bcrypt to hash passwords
    await queryInterface.bulkInsert("Users", [{
      name: 'John Doe',
      email: 'johndoe@g.c',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Jane Doe',
      email: 'janedoe@g.c',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Kanye West',
      email: 'kanyewest@g.c',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
