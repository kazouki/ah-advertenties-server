const { Router } = require("express");
// const Card = require("../models").card;
// const Bid = require("../models").bid;
const Message = require("../models").message;
const User = require("../models").user;
const Card = require("../models").card;
const { Op } = require("sequelize");

const authMiddleware = require("../auth/middleware");

const router = new Router();

router.post("/", async (req, res, next) => {
  console.log("postmessages query req.body  :: ", req.body);
  const { userId, toUserId, text } = req.body;
  if (!userId || !toUserId || !text) {
    res.status(400).send("Bad Request");
  } else {
    try {
      const newMessage = await Message.create({
        userId,
        toUserId,
        text,
      });
      res.send(newMessage);
    } catch (error) {
      next(error);
    }
  }
});

router.post("/conversation", async (req, res, next) => {
  const remoteUserId = parseInt(req.body.remoteUserId);
  const { userId } = req.body;
  if (!remoteUserId || !userId) {
    res.send("Incomplete request");
  }
  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { userId: userId, toUserId: remoteUserId },
          { userId: remoteUserId, toUserId: userId },
        ],
      },

      order: [["createdAt", "DESC"]],
    });
    console.log("########");
    console.log("messages   in /conversation", messages);
    console.log("########");
    res.send(messages);
  } catch (e) {
    next(e);
  }
});

// TODO adjust router to collect correct messages
router.post("/all", async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    res.send("Incomplete request");
  }
  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [{ userId }, { toUserId: userId }],
      },
      include: [Bid],

      order: [["createdAt", "DESC"]],
    });
    res.send(messages);
  } catch (e) {
    next(e);
  }
});

router.post("/inbox", async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    res.send("Incomplete request");
  }
  try {
    const messages = await Message.findAll({
      where: { toUserId: userId },

      include: [User],

      order: [["createdAt", "DESC"]],
    });
    res.send(messages);
  } catch (e) {
    next(e);
  }
});

router.post("/remoteusername", async (req, res, next) => {
  const { cardOwnerId } = req.body;
  if (!cardOwnerId) {
    res.send("Incomplete request");
  }
  try {
    const user = await User.findByPk(cardOwnerId);
    res.send(user.name);
  } catch (e) {
    next(e);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const toDelete = await Message.findAll();
    const deleted = await toDelete.forEach(
      async (message) => await message.destroy()
    );
    res.send(deleted);
  } catch (error) {
    next(error);
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
