/* eslint-disable class-methods-use-this */
const { Op } =  require('sequelize');
const Event =  require('../models/Event');
const Wishlist = require('../models/WishList');
const File = require('../models/File');
const User = require('../models/User');

class WishlistController {
  async store(req, res) {
    const { event_id, date } = req.body;

    // Event exists
    const eventExists = await Event.findByPk(event_id);

    if (!eventExists) {
      return res.status(401).json({ error: 'Event not found' });
    }

    // eventInList
    const eventInList = await Wishlist.findOne({
      where: {
        event_id,
        user_id: req.userId,
      },
    });

    if (eventInList) {
      return res
        .status(400)
        .json({ error: 'This event is already in your wishlist' });
    }

    const wishlist = await Wishlist.create({
      event_id,
      user_id: req.userId,
      date,
    });

    return res.json(wishlist);
  }

  async index(req, res) {
    const wishlists = await Wishlist.findAll({
      where: { canceled_at: null, user_id: req.userId },
      include: [
        {
          model: Event,
          attributes: ['id', 'name', 'date', 'sales_date'],
          include: [
            {
              model: File,
              as: 'banner',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(wishlists);
  }

  async delete(req, res) {
    const wishlist = await Wishlist.findByPk(req.params.wishlistId);

    wishlist.canceled_at = new Date();

    await wishlist.save();

    return res.json(wishlist);
  }
}

module.exports = new WishlistController();
