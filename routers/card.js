const { Router } = require("express");
const Card = require("../models").card;
const Bid = require("../models").bid;
const User = require("../models").user;
const Favorite = require("../models").favorite;

const authMiddleware = require("../auth/middleware");

const router = new Router();

router.post("/", authMiddleware, async (req, res, next) => {
  const { userId, columnIndex, cardProps } = req.body;
  if (!userId || !columnIndex || !cardProps) {
    res.status(400).send("Bad Request");
  } else {
    try {
      const newCard = await Card.create({
        ...cardProps,
        userId,
        columnIndex,
      });
      res.send(newCard);
    } catch (error) {
      next(error);
    }
  }
  return null;
});

router.delete("/", authMiddleware, async (req, res, next) => {
  try {
    const cardId = req.body.cardId;
    const toDelete = await Card.findByPk(cardId);
    if (!toDelete) {
      res.status(404).send("Card not found");
    } else {
      const deleted = await toDelete.destroy();
      if (deleted)
        try {
          const favsToDelete = await Favorite.findAll({
            where: {
              cardId,
            },
          });
          const deletedFavs = favsToDelete.forEach(
            async (fav) => await fav.destroy()
          );
        } catch (e) {
          console.log(e);
        }

      res.json(deleted);
    }
  } catch (e) {
    next(e);
  }
  return null;
});

router.delete("/all", authMiddleware, async (req, res, next) => {
  try {
    const toDelete = await Card.findAll();
    if (!toDelete) {
      res.status(404).send("Cards not found");
    } else {
      const deleted = toDelete.forEach(async (card) => await card.destroy());
      res.json(deleted);
    }
  } catch (e) {
    next(e);
  }
  return null;
});

router.put("/", authMiddleware, async (req, res, next) => {
  const {
    aangeboden,
    gevraagd,
    title,
    description,
    name,
    telephone,
    email,
    date,
    userId,
    cardId,
    columnIndex,
  } = req.body;
  try {
    const toUpdate = await Card.findByPk(cardId);
    if (!toUpdate) {
      res.status(404).send("Card not found");
    } else {
      const updated = await toUpdate.update({
        aangeboden: aangeboden,
        gevraagd: gevraagd,
        title: title,
        description: description,
        name: name,
        telephone: telephone,
        email: email,
        date: date,
        userId: userId,
        imageUrl: " ",
        minimumBid: 0,
        hearts: 0,
        columnIndex: columnIndex,
      });
      res.json(updated);
    }
  } catch (e) {
    next(e);
  }
  return null;
});

router.put("/index", async (req, res, next) => {
  const { cardId, columnIndex } = req.body;
  try {
    const toUpdate = await Card.findByPk(cardId);
    if (!toUpdate) {
      res.status(404).send("Card not found");
    } else {
      const updated = await toUpdate.update({
        columnIndex,
      });
      res.json(updated);
    }
  } catch (e) {
    next(e);
  }
  return null;
});

router.post("/usercards", async (req, res, next) => {
  const { userId } = req.body;
  try {
    const cards = await Card.findAll({
      where: {
        userId: userId,
      },
      order: [["createdAt", "DESC"]],
    });
    res.send(cards);
  } catch (error) {
    next(error);
  }
  return null;
});

router.post("/userfavorites", async (req, res, next) => {
  const { userId } = req.body;
  try {
    const favorites = await Favorite.findAll({
      where: {
        userId,
      },
      include: [Card],
      order: [["createdAt", "DESC"]],
    });
    if (!favorites) {
      res.status(404);
    } else {
      const favCards = favorites.map((fav) => fav.card.dataValues);
      res.json(favCards);
    }
  } catch (error) {
    next(error);
  }
  return null;
});

router.get("/highestbid/:cardId", async (req, res, next) => {
  const id = parseInt(req.params.cardId);
  try {
    const bidAmounts = await Bid.findAll({
      where: {
        cardId: id,
      },
      order: [["amount", "DESC"]],
    });
    if (bidAmounts[0]) {
      const highestBid = bidAmounts[0].amount;
      const highestBidEmail = bidAmounts[0].email;
      res.send({ cardId: id, highestBid, highestBidEmail });
    } else {
      res.send({ cardId: id, highestBid: 0, highestBidEmail: " " });
    }
  } catch (error) {
    next(error);
  }
  return null;
});

router.post("/bid", authMiddleware, async (req, res, next) => {
  const { cardId, amount, email } = req.body;
  try {
    const card = await Card.findByPk(cardId);
    const minimum = card.minimumBid;

    const bidAmounts = await Bid.findAll({
      where: {
        cardId: cardId,
      },
      order: [["amount", "DESC"]],
    });

    if (!bidAmounts[0]) {
      if (amount >= minimum && amount) {
        try {
          const bid = await Bid.create({
            cardId,
            email,
            amount,
          });

          res.send(bid);
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      if (amount > bidAmounts[0].amount) {
        try {
          const bid = await Bid.create({
            cardId,
            email,
            amount,
          });

          res.send(bid);
        } catch (e) {
          console.log(e);
        }
      }
    }
  } catch (error) {
    next(error);
  }
  return null;
});

router.get("/", async (req, res, next) => {
  try {
    const cards = await Card.findAll({
      include: [Bid],
      order: [["updatedAt", "DESC"]],
    });

    res.send({ cards });
  } catch (error) {
    next(error);
  }
  return null;
});

router.get("/:cardId", async (req, res, next) => {
  const id = parseInt(req.params.cardId);
  try {
    const cardDetail = await Card.findByPk(id, {
      include: [{ model: Bid }, { model: User }],
      order: [["updatedAt", "DESC"]],
    });

    if (!cardDetail) {
      res.status(404).send("Not Found!");
    } else {
      res.send({ cardDetail });
    }
  } catch (error) {
    next(error);
  }
  return null;
});

module.exports = router;
