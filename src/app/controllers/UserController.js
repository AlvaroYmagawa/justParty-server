/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password')]),
      promoter: Yup.boolean().required(),
      adress: Yup.string(),
      contact: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    // Email Validation
    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res.status(400).json({ error: 'E-mail already registered' });
    }

    const user = await User.create(req.body);
    return res.json(user);
  }

  async index(req, res) {
    const user = await User.findByPk(req.params.userId, {
      include: [
        {
          model: File,
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    const { name, email, adress, contact, File: file, description, likes, dislikes } = user;

    return res.json({
      name,
      email,
      adress,
      contact,
      file,
      description,
      likes,
      dislikes,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => {
          return oldPassword ? field.required() : field;
        }),
      confirmPassword: Yup.string().when('password', (password, field) => {
        return password ? field.required().oneOf([Yup.ref('password')]) : field;
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const user = await User.findByPk(req.userId);

    const { newEmail, oldPassword } = req.body;

    // Email validation
    if (newEmail && newEmail !== user.email) {
      const emailExists = await User.findOne({ where: { newEmail } });

      if (emailExists) {
        return res.status(400).json({ error: 'E-mail already registered' });
      }
    }

    // Oldpassword validation
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);

    const { id, name, email, promoter, adress, contact, File: file } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      file,
      adress,
      contact,
      promoter,
    });
  }
}

export default new UserController();
