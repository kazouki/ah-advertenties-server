const { Router } = require("express");
const Message = require("../models").message;
const User = require("../models").user;
const Card = require("../models").card;
const { Op } = require("sequelize");

const authMiddleware = require("../auth/middleware");
const user = require("../models/user");

const router = new Router();

router.post("/", authMiddleware, async (req, res, next) => {
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

router.post("/conversation", authMiddleware, async (req, res, next) => {
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
    res.send(messages);
  } catch (e) {
    next(e);
  }
});

router.post("/inbox", authMiddleware, async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    res.send("Incomplete request");
  }
  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [{ userId }, { toUserId: userId }],
      },
      include: [User],
      order: [["createdAt", "DESC"]],
    });
    const users = await User.findAll();
    const newMessages = messages.map((message) => {
      return {
        ...message.dataValues,
        recipient: users.find((user) => {
          return user.dataValues.id === message.dataValues.toUserId;
        }),
      };
    });
    res.send(newMessages);
  } catch (e) {
    next(e);
  }
});

router.post("/remoteusername", async (req, res, next) => {
  const { cardId } = req.body;
  if (!cardId) {
    res.send("Incomplete request");
  }
  try {
    const card = await Card.findByPk(parseInt(cardId), {
      include: [User],
    });
    if (!card.user) {
      res.status(404);
    }
    console.log("card   in  /remoteusername", card);
    res.send({ name: card.user.name, id: card.user.id });
  } catch (e) {
    next(e);
  }
});

router.delete("/", authMiddleware, async (req, res, next) => {
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

router.put("/isread", authMiddleware, async (req, res, next) => {
  try {
    const toUpdate = await Message.findByPk(parseInt(req.body.id));
    if (!toUpdate) {
      res.status(404).send("Message not found");
    } else {
      const updated = await toUpdate.update(req.body);

      if (updated) {
        try {
          const allUserMessages = await Message.findAll({
            where: {
              toUserId: req.body.activeUser,
            },
          });

          const unreadMessages = allUserMessages
            .filter((message) => message.dataValues.isRead === false)
            .map((mess) => {
              return { a: req.body.activeUser, b: mess.dataValues.userId };
            });

          const unique = Array.from(
            new Set(unreadMessages.map((m) => m.b))
          ).map((a) => {
            return unreadMessages.find((obj) => obj.b === a);
          });

          res.json({ unreadMessages: unique.length });
        } catch (e) {
          console.log(e);
        }
      } else res.json(updated);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/allunread", authMiddleware, async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    res.send("Incomplete request");
  }
  try {
    const allUserMessages = await Message.findAll({
      where: {
        toUserId: userId,
      },
    });
    const unreadMessages = allUserMessages
      .filter((message) => message.dataValues.isRead === false)
      .map((mess) => {
        return { a: userId, b: mess.dataValues.userId };
      });

    const unique = Array.from(new Set(unreadMessages.map((m) => m.b))).map(
      (a) => {
        return unreadMessages.find((obj) => obj.b === a);
      }
    );
    res.json({ unreadMessages: unique.length });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
