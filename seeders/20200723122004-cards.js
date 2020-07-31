"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "cards",
      [
        {
          aangeboden: false,
          gevraagd: true,
          title: "kapper gezocht",
          description:
            "ben jij een buurt kapper en heb je tijd om haar te knippen? bel me dan graag!",
          name: "thomas2",
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
          title: "fiets te koop",
          description:
            "hoi ik heb een oude fiets te koop, beetje olie ertussen en gaan! prijs - 20 eu",
          name: "thomas1",
          telephone: "012345690",
          email: "thomas1@thomas1.com",
          date: "01-06-2020",
          userId: 1,
          imageUrl: "",
          minimumBid: 20,
          hearts: 0,
          columnIndex: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          aangeboden: true,
          gevraagd: true,
          title: "zolder spullen te koop",
          description:
            "ik heb allerlei oude zolder spullen te koop, kom kijken! ik ben ook benieuwd wat u te koop heeft",
          name: "thomas3",
          telephone: "012345690",
          email: "thomas1@thomas1.com",
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
          title: "tv gratis op te halen",
          description: "tv uit de jaren tachtig, te groot past niet in mn huis",
          name: "thomas4",
          telephone: "012345690",
          email: "thomas4@thomas4.com",
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
