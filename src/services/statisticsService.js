const db = require("../models");

const getRevenue = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { type } = query;
      if (type === "daysInMonth") {
        //
        const revenues = await db.Order.findAll({
          group: [db.sequelize.fn("hour", db.sequelize.col("createdAt"))],
          attributes: [
            [db.sequelize.fn("sum", db.sequelize.col("total")), "total"],
            [db.sequelize.fn("hour", db.sequelize.col("createdAt")), "hour"],
          ],
          where: db.sequelize.where(
            db.sequelize.fn("day", db.sequelize.col("createdAt")),
            new Date().getDate()
          ),
        });
        resolve({ status: 200, data: revenues });
      }
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: { error, message: "get revenue fail" } });
    }
  });
};
module.exports = { getRevenue };
