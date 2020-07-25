const { Router } = require("express");
// const Card = require("../models").card;
// const Bid = require("../models").bid;
const Message = require("../models").message;

const authMiddleware = require("../auth/middleware");

const router = new Router();

// router.post("/", async (req, res, next) => {
//   console.log("postmessages query req.body  :: ", req.body);
//   const { fromUserId, toUserId, text } = req.body;
//   if (!fromUserId || !toUserId || !text) {
//     res.status(400).send("Bad Request");
//   } else {
//     try {
//       const newMessage = await Message.create({
//         fromUserId,
//         toUserId,
//         text,
//       });
//       res.send(newMessage);
//     } catch (error) {
//       next(error);
//     }
//   }
// });

router.post("/", async (req, res, next) => {
  try {
    const cardOwnerId = parseInt(req.body.cardOwnerId);
    const { userId } = req.body;
    // console.log("endpoint werkt ::::::::::::::", id);
    const query = await Message.findAll({
      where: {
        fromUserId: userId,
        toUserId: cardOwnerId,
      },
      order: [["createdAt", "DESC"]],
    });
    res.send(query);
    // const query = await Message.findAll();
    // res.send(query);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
