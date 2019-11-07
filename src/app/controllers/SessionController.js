/* eslint-disable class-methods-use-this */
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const User = require('../models/User');
const File = require('../models/File');

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, promoter, File: file } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        promoter,
        file
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new SessionController();
