import Evaluation from '../models/Evaluation';
import User from '../models/User';

class EventController {
  async store(req, res) {
    const { promoterId } = req.params;
    const { comment, note } = req.body;

    const isPromoter = await User.findByPk(promoterId);

    if (!isPromoter) {
      return res.status(402).json({ error: "You can only evaluate promoters" });
    }

    const evaluation = await Evaluation.create({
      comment,
      note,
      user_id: req.userId,
      promoter_id: promoterId,
    })

    return res.json(evaluation);
  }
}

export default new EventController();
