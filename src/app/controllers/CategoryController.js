const Category = require('../models/Category');
const DefaultCategory = require('../models/DefaultCategory');

class CategoryController {
  async store(req, res) {
    const { event_id, default_category_id } = req.body;

    // Duplicate category validation
    const duplicateCategory = await Category.findOne({
      where: {
        event_id,
        default_category_id,
      }
    });

    if (duplicateCategory) {
      return res.status(400).json({ error: "Category already exists for this event." })
    }

    const category = await Category.create({
      event_id,
      default_category_id,
    });

    return res.json(category);
  }

  async index(req, res) {
    const categories = await Category.findAll({
      where: {
        event_id: req.params.eventId,
      },
      include: [{
        model: DefaultCategory,
        attributes: ['name', 'color'],
      }]
    })

    return res.json(categories);
  }
}

module.exports = new CategoryController();
