const { Router } = require("express");
const Card = require("../models").card;
const Bid = require("../models").bid;

const authMiddleware = require("../auth/middleware");

const router = new Router();

router.post("/", async (req, res, next) => {
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
});

router.delete("/", authMiddleware, async (req, res, next) => {
  try {
    const cardId = req.body.cardId;
    const toDelete = await Card.findByPk(cardId);
    if (!toDelete) {
      res.status(404).send("Card not found");
    } else {
      const deleted = await toDelete.destroy();
      res.json(deleted);
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/all", async (req, res, next) => {
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
});

router.put("/index", authMiddleware, async (req, res, next) => {
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
});

router.get("/:cardId", async (req, res, next) => {
  const id = parseInt(req.params.cardId);
  try {
    const cardDetail = await Card.findByPk(id, {
      include: [Bid],
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
});

router.patch("/", async (req, res, next) => {
  const { cardId } = req.body;
  try {
    const cardById = await Card.findByPk(cardId, {
      include: [Bid],
      order: [["updatedAt", "DESC"]],
    });
    const cardHearts = cardById.hearts;

    if (!cardId) {
      res.status(400).send("Incomplete query!");
    } else {
      try {
        if (!cardById) {
          res.status(404).send("Table Not Found!");
        } else {
          const update = await cardById.update({
            hearts: cardHearts + 1,
          });
          res.send(update);
        }
      } catch (e) {
        next(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
