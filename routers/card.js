const { Router } = require("express");
const Card = require("../models").card;
const Bid = require("../models").bid;

const authMiddleware = require("../auth/middleware");

const router = new Router();

router.post("/", authMiddleware, async (req, res, next) => {
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
    imageUrl,
    minimumBid,
    columnIndex,
  } = req.body;
  if (
    // !aangeboden ||
    // !gevraagd ||
    // !title ||
    // !description ||
    // !name ||
    // !telephone ||
    // !email ||
    // !date ||
    // !userId ||
    // !imageUrl ||
    // !minimumBid ||
    // !columnIndex
    true === false
  ) {
    res.status(400).send("Bad Request!");
  } else {
    try {
      const newCard = await Card.create({
        aangeboden,
        gevraagd,
        title,
        description,
        name,
        telephone,
        email,
        date,
        userId,
        imageUrl,
        minimumBid,
        hearts: 0,
      });
      res.send(newCard);
    } catch (error) {
      next(error);
    }
  }
});

router.delete("/:cardId", async (req, res, next) => {
  try {
    const cardId = parseInt(req.params.cardId);
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

router.put("/", async (req, res, next) => {
  console.log("cardProps (req.body) in put ################### ", req.body);
  const {
    aangeboden,
    columnIndex,
    date,
    description,
    email,
    gevraagd,
    name,
    telephone,
    title,
    cardId,
  } = req.body;
  try {
    // const cardId = parseInt(req.params.listId);
    const toUpdate = await Card.findByPk(cardId);
    if (!toUpdate) {
      res.status(404).send("Card not found");
    } else {
      const updated = await toUpdate.update({
        aangeboden,
        columnIndex,
        date,
        description,
        email,
        gevraagd,
        name,
        telephone,
        title,
      });
      res.json(updated);
    }
  } catch (e) {
    next(e);
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
    console.log("fetchcards worked #################");
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
