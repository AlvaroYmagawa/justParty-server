/* eslint-disable class-methods-use-this */
const { isBefore, parseISO } = require('date-fns');
const Event = require('../models/Event');
const User = require('../models/User');
const File = require('../models/File');

class EventController {
  async store(req, res) {
    const { name, description, localization, banner_id, price } = req.body;

    // Is Promoter validation
    const isPromoter = await User.findOne({
      where: { id: req.userId, promoter: true },
    });

    if (!isPromoter) {
      return res.status(401).json({
        error: 'Only promoters can create events',
      });
    }

    // Past date validation
    const date = parseISO(req.body.date);

    if (isBefore(date, new Date())) {
      return res.status(401).json({ error: 'Past dates are not permitted' });
    }

    // Past sales_date validation
    const sales_date = parseISO(req.body.sales_date);

    if (isBefore(date, sales_date)) {
      return res
        .status(401)
        .json({ error: 'Past sales dates are not permitted' });
    }

    const event = await Event.create({
      name,
      description,
      localization,
      date,
      price,
      sales_date,
      promoter_id: req.userId,
      banner_id,
    });

    return res.json(event);
  }

  async show(req, res) {
    const event = await Event.findByPk(req.params.eventId, {
      include: [
        {
          model: User,
          as: 'promoter',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    })

    return res.json(event);
  }

  async indexAll(req, res) {
    const events = await Event.findAll({
      where: {
        canceled_at: null,
      },
      order: ['date'],
      attributes: [
        'id',
        'price',
        'selling',
        'name',
        'description',
        'localization',
        'date',
        'sales_date',
        'past',
        'cancelable',
        'canceled_at',
      ],
      include: [
        {
          model: User,
          as: 'promoter',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json(events);
  }

  async index(req, res) {
    const events = await Event.findAll({
      where: {
        promoter_id: req.params.promoterId,
        canceled_at: null,
      },
      order: ['date'],
      attributes: [
        'id',
        'name',
        'price',
        'description',
        'localization',
        'date',
        'sales_date',
        'past',
        'selling',
        'cancelable',
        'canceled_at',
      ],
      include: [
        {
          model: User,
          as: 'promoter',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json(events);
  }

  async update(req, res) {
    const event = await Event.findByPk(req.params.eventId, {
      include: [
        {
          model: User,
          as: 'promoter',
          attributes: ['name', 'email'],
        },
      ],
    });

    // Event Exists validation
    if (!event) {
      return res.status(401).json({ error: 'Event not found' });
    }

    // Is your event validation
    if (event.promoter_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to chenge this event",
      });
    }

    const {
      name,
      localization,
      description,
      date,
      sales_date,
      banner_id,
    } = await event.update(req.body);

    return res.json({
      name,
      localization,
      description,
      date,
      sales_date,
      banner_id,
    });
  }

  async delete(req, res) {
    const event = await Event.findByPk(req.params.eventId, {
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });

    // Event Exists validation
    if (!event) {
      return res.status(401).json({ error: 'Event not found' });
    }

    // Is your event validation
    if (event.promoter_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to cancel this event",
      });
    }

    // Cancellation date validation
    if (isBefore(event.sales_date, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel events before the sales date.',
      });
    }

    event.canceled_at = new Date();
    await event.save();

    return res.json(event);
  }
}

module.exports = new EventController();
