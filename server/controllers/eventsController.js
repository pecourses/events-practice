const { parse } = require('query-string');
const {
  Event,
  EventCategory,
  User,
  Sequelize: { Op },
} = require('./../db/models');

module.exports.getAllEvents = async (req, res, next) => {
  //   const { isOnline, creatorId, categoryId, limit = 10, offset = 0, order = 'ASC' } = req.query;

  // if query contains filter + pagination
  //   const where = {};
  //   if (isOnline) {
  //     where.isOnline = isOnline;
  //   }
  //   if (creatorId) {
  //     where.creatorId = creatorId;
  //   }
  //   if (categoryId) {
  //     where.categoryId = categoryId.split(',')// '2,3' => ['2', '3']
  //   }

  const parcedQuery = parse(req.url.slice(2), { arrayFormat: 'comma' }); // if only filter in query

  try {
    const foundEvents = await Event.findAll({
      where: parcedQuery,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: EventCategory,
          as: 'category',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'creator',
          attributes: ['name'],
        },
      ],
      raw: true,
    });
    res.status(200).send({ data: foundEvents });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
// where: { creatorId: 1, isOnline: true, categoryId: {[Op]:[2,3]} },
