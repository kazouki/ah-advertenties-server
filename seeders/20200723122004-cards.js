"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "cards",
      [
        {
          aangeboden: false,
          gevraagd: true,
          title: "card 1 / columnIndex 1 userId 2",
          description:
            "ben jij een buurt kapper en heb je tijd om haar te knippen? bel me dan graag!",
          name: "rita",
          telephone: "01234567263",
          email: "rita@gmail.com",
          date: "05-03-2020",
          userId: 2,
          imageUrl: "",
          minimumBid: 0,
          hearts: 0,
          columnIndex: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          aangeboden: true,
          gevraagd: false,
          title: "card 2 / columnIndex 2 / userId 1",
          description:
            "hoi ik heb een oude fiets te koop, beetje olie ertussen en gaan! prijs - 20 eu",
          name: "henk",
          telephone: "012345690",
          email: "henk@aol.com",
          date: "01-06-2020",
          userId: 1,
          imageUrl: "",
          minimumBid: 0,
          hearts: 0,
          columnIndex: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          aangeboden: true,
          gevraagd: true,
          title: "card 3 / columnIndex 3 / userId 3",
          description:
            "ik heb allerlei oude zolder spullen te koop, kom kijken! ik ben ook benieuwd wat u te koop heeft",
          name: "sjon",
          telephone: "012345690",
          email: "sjon@yahoo.com",
          date: "03-07-2020",
          userId: 3,
          imageUrl: "",
          minimumBid: 0,
          hearts: 0,
          columnIndex: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          aangeboden: true,
          gevraagd: true,
          title: "card 4 / columnIndex 3 / userId 4",
          description: "tv uit de jaren tachtig, te groot past niet in mn huis",
          name: "gerard",
          telephone: "012345690",
          email: "gerard@yahoo.com",
          date: "05-08-2020",
          userId: 4,
          imageUrl: "",
          minimumBid: 0,
          hearts: 0,
          columnIndex: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("cards", null, {});
  },
};
