/* eslint-disable class-methods-use-this */
const User = require('../models/User');
const File = require('../models/File');

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

module.exports = new FileController();
