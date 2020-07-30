const { Router } = require("express");
// const Card = require("../models").card;
// const Bid = require("../models").bid;
const Message = require("../models").message;
const { Op } = require("sequelize");

const authMiddleware = require("../auth/middleware");

const router = new Router();

router.post("/", async (req, res, next) => {
  console.log("postmessages query req.body  :: ", req.body);
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

router.post("/all", async (req, res, next) => {
  const cardOwnerId = parseInt(req.body.cardOwnerId);
  const { userId } = req.body;
  console.log("#########");
  console.log("query in message/all #########", req.body);
  console.log("#########");
  if (!cardOwnerId || !userId) {
    next.send("Incomplete request");
  }
  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { fromUserId: userId, toUserId: cardOwnerId },
          { fromUserId: cardOwnerId, toUserId: userId },
        ],
      },

      order: [["createdAt", "DESC"]],
    });
    console.log("#########");
    console.log("messages in message/all #############", messages);
    console.log("#########");
    res.send(messages);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

// [
//   {
//     fromUserId: userId,
//     toUserId: cardOwnerId,
//   },
// ]
// ,
