/* eslint-disable class-methods-use-this */
import { isBefore, parseISO } from 'date-fns';
import * as Yup from 'yup';
import Event from '../models/Event';
import User from '../models/User';

class EventController {
  async store(req, res) {
    const { name, description, localization } = req.body;

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
      sales_date,
      promoter_id: req.userId,
    });

    return res.json(event);
  }

  async index(req, res) {
    const events = await Event.findAll({
      where: {
        cancelled_at: null,
      },
    });
    return res.json(events);
  }

  async update(req, res) {
    // Is your event validation
    const event = await Event.findByPk(req.params.eventId, {
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!event) {
      return res.status(401).json({ error: 'Event not found' });
    }

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
    } = await event.update(req.body);

    return res.json({ name, localization, description, date, sales_date });
  }

  async delete(req, res) {
    // Is your event validation
    const event = await Event.findByPk(req.params.eventId, {
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!event) {
      return res.status(401).json({ error: 'Event not found' });
    }

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

export default new EventController();
