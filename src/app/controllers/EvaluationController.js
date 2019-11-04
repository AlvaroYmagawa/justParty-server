import Evaluation from '../models/Evaluation';
import User from '../models/User';
import File from '../models/File';

class EvaluationController {
  async store(req, res) {
    const { promoterId } = req.params;
    const { comment, note } = req.body;

    // Is promoter validation
    const isPromoter = await User.findOne({
      where: { id: promoterId, promoter: true },
    });

    if (!isPromoter) {
      return res.status(401).json({
        error: 'You can only evaluate promoters',
      });
    }

    // Only one evaluation validation
    const madeEvaluation = await Evaluation.findOne({
      where: {
        user_id: req.userId,
        promoter_id: promoterId,
      }
    })

    if (madeEvaluation) {
      return res.status(401).json({
        error: 'You already done your evaluation for this promoter',
      });
    }

    const evaluation = await Evaluation.create({
      comment,
      note,
      user_id: req.userId,
      promoter_id: promoterId,
    })

    return res.json(evaluation);
  }

  async index(req, res) {
    const { promoterId } = req.params;

    // Is promoter validation
    const isPromoter = await User.findOne({
      where: { id: promoterId, promoter: true },
    });

    if (!isPromoter) {
      return res.status(401).json({
        error: 'Promoter does not exists',
      });
    }

    const evaluations = await Evaluation.findAll({
      where: { promoter_id: promoterId }, include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
          include: [{
            model: File,
            attributes: ['id', 'path', 'url'],
          }],
        }
      ]
    });

    if (!evaluations) {
      return res.status(401).json({
        error: 'This promoter does not have evaluations',
      });
    }

    return res.json(evaluations)
  }

  async update(req, res) {
    const { promoterId } = req.params;

    // Evaluation exists
    const evaluation = await Evaluation.findOne({
      where: {
        user_id: req.userId,
        promoter_id: promoterId,
      }
    });

    if (!evaluation) {
      return res.status(400).json({
        error: "Evaluation does not exists"
      })
    }

    // // Is your evaluation validation
    // const isYourEvaluation = await Evaluation.findOne({
    //   where: {
    //     id: evaluationId,
    //     user_id: req.userId,
    //   }
    // });

    // if (!isYourEvaluation) {
    //   return res.status(400).json({
    //     error: "You can only edit evaluations that you've done"
    //   })
    // }

    await evaluation.update(req.body);

    return res.json(evaluation);
  }

  async delete(req, res) {
    const { evaluationId } = req.params;

    // Evaluation exists
    const evaluation = await Evaluation.findByPk(evaluationId);

    if (!evaluation) {
      return res.status(400).json({
        error: "Evaluation does not exists"
      })
    }

    // Is your evaluation validation
    const isYourEvaluation = await Evaluation.findOne({
      where: {
        id: evaluationId,
        user_id: req.userId,
      }
    });

    if (!isYourEvaluation) {
      return res.status(400).json({
        error: "You can only edit evaluations that you've done"
      })
    }

    await evaluation.destroy();

    return res.json({ msg: 'Evaluation deleted' });
  }
}

export default new EvaluationController();
