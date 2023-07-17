'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    // TODO: make sure to add bcrypt to hash passwords
    await queryInterface.bulkInsert("Users", [{
      name: 'John Doe',
      email: 'johndoe@g.c',
      password: await bcrypt.hash("password", 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Jane Doe',
      email: 'janedoe@g.c',
      password: await bcrypt.hash("password", 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Kanye West',
      email: 'kanyewest@g.c',
      password: await bcrypt.hash("password", 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    
    const users = await queryInterface.sequelize.query(`SELECT id FROM users`);
    const userId = users[0][0].id;

    await queryInterface.bulkInsert(
      "posts",
      [
        {
          title: "see you again",
          content: "say something im giving up on you",
          UserId: userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "watch this",
          content: "watch this watch this watch this",
          UserId: userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    
    const posts = await queryInterface.sequelize.query(`SELECT id FROM posts`);
    const postId = posts[0][0].id;
    const fooId = users[0][1].id;

    await queryInterface.bulkInsert("comments", [
      {
        content: "do you ever feel like a plastic bag?",
        UserId: fooId,
        PostId: postId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("posts", null, {});
    await queryInterface.bulkDelete("users", null, {});
  }
};
