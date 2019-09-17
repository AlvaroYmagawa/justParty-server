import Event from '../models/Event';
import Wishlist from '../models/WishList';

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
        user_id: req.userId
      }
    });

    if (eventInList) {
      return res.status(400).json({ error: 'This event is already in your wishlist' })
    }

    const wishlist = await Wishlist.create({
      event_id,
      user_id: req.userId,
      date
    });

    return res.json(wishlist);
  }

  async index(req, res) {
    const wishlists = await Wishlist.findAll({ where: { canceled_at: null } })

    return res.json();
  }
}

export default new WishlistController();