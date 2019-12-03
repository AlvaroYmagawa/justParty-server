/* eslint-disable class-methods-use-this */
const { isBefore, parseISO } = require('date-fns');
const { Op } = require('sequelize');
const Event = require('../models/Event');
const User = require('../models/User');
const File = require('../models/File');
const Category = require('../models/Category');

class FilterController {
  async filterPromoterEvents(req, res) {
    const { search } = req.params;

    const events = await Event.findAll({
      where: {
        promoter_id: req.userId,
        canceled_at: null,
        name: {
          [Op.like]: `%${search}%`,
        },
      },
      order: ['date'],
      attributes: [
        'id',
        'name',
        'selling',
        'description',
        'localization',
        'date',
        'sales_date',
        'past',
        'price',
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

  async FilterEvents(req, res) {
    const { search } = req.params;

    const events = await Event.findAll({
      where: {
        canceled_at: null,
        name: {
          [Op.like]: `%${search}%`,
        },
      },
      order: ['date'],
      attributes: [
        'id',
        'name',
        'selling',
        'description',
        'localization',
        'date',
        'sales_date',
        'past',
        'price',
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

  async filterByCategory(req, res) {
    const { search } = req.params;

    const events = await Category.findAll({
      where: {
        default_category_id: search,
      },
      include: [
        {
          model: Event,
          order: ['date'],
          attributes: [
            'id',
            'price',
            'name',
            'selling',
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
        }
      ]
    })

    return res.json(events);
  }
}

module.exports = new FilterController();
