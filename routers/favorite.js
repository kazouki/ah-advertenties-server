const { Router } = require("express");
const Favorite = require("../models").favorite;
const User = require("../models").user;

const authMiddleware = require("../auth/middleware");

const router = new Router();

router.post("/", async (req, res, next) => {
  const { userId, cardId } = req.body;
  if (!userId || !cardId) {
    res.status(400).send("Bad Request");
  } else {
    try {
      const newFavorite = await Favorite.create({
        userId,
        cardId,
      });
      res.send(newFavorite);
    } catch (error) {
      next(error);
    }
  }
});

router.post("/user", async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    res.status(400).send("Bad Request");
  } else {
    try {
      const userFavorites = await Favorite.findAll({
        where: {
          userId,
        },
      });
      res.send(userFavorites);
    } catch (error) {
      next(error);
    }
  }
});

router.delete("/all", async (req, res, next) => {
  try {
    const Favorites = await Favorite.findAll();
    const deleted = Favorites.forEach(async (fav) => await fav.destroy());
    res.send(deleted);
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  const { cardId, userId } = req.body;
  try {
    const toDelete = await Favorite.findAll({
      where: { cardId, userId },
    });
    const deleted = await toDelete.forEach(async (fav) => await fav.destroy());
    res.send(deleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
