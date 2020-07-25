const { Router } = require("express");
// const Card = require("../models").card;
// const Bid = require("../models").bid;
const Message = require("../models").message;

const authMiddleware = require("../auth/middleware");

const router = new Router();

router.post("/", authMiddleware, async (req, res, next) => {
  const { fromUserId, toUserId, text } = req.body;
  if (!fromUserId || !toUserId || !text) {
    res.status(400).send("Bad Request");
  } else {
    try {
      const newMessage = await Message.create({
        fromUserId,
        toUserId,
        text,
      });
      res.send(newMessage);
    } catch (error) {
      next(error);
    }
  }
});

router.get("/", async (req, res, next) => {
  const { userId, cardOwnerId } = req.body;
  if (userId) {
    try {
      const query = await Message.findAll({
        where: {
          fromUserId: userId,
          toUserId: cardOwnerId,
        },
        order: [["createdAt", "DESC"]],
      });
      res.send(query);
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(404);
  }
});

module.exports = router;
