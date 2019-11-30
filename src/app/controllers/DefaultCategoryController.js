const DefaultCategory = require('../models/DefaultCategory');

class DefaultCategoryController {
  async store(req, res) {
    const { name, color } = req.body;

    // Name exists validation
    const nameExists = await DefaultCategory.findOne({
      where: {
        name,
      }
    });

    if (nameExists) {
      return res.status(400).json({ error: "Name unavailable" })
    }

    // Color exists validation
    const colorExists = await DefaultCategory.findOne({
      where: {
        name,
      }
    });

    if (colorExists) {
      return res.status(400).json({ error: "Color unavailable" })
    }

    const defaultCategory = await DefaultCategory.create({
      name,
      color,
    });

    return res.json(defaultCategory);
  }

  async index(req, res) {
    const defaultCategory = await DefaultCategory.findOne({
      where: {
        id: req.params.defaultCategoryId,
      }
    })

    const { name, color } = defaultCategory;

    return res.json({ name, color });
  }

  async indexAll(req, res) {
    const categories = await DefaultCategory.findAll();

    const formattedCategories = categories.map(category => {
      return ({
        id: category.id,
        name: category.name,
        color: category.color,
      })

    })

    return res.json(formattedCategories);
  }
}

module.exports = new DefaultCategoryController();
