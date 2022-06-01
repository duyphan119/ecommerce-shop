const db = require("../models");
const { Op } = require("sequelize");
const getRevenue = async (query) => {
  return new Promise(async (resolve, reject) => {
    const dt = new Date();
    try {
      let { type, month, year } = query;
      month = month ? parseInt(month) : dt.getMonth() + 1;
      let lastMonth = month === 1 ? 12 : month - 1;
      year = year ? parseInt(year) : dt.getFullYear();
      let lastYear = lastMonth === 12 ? year - 1 : year;
      let count;
      let revenues = [];
      if (type === "hoursInDay") {
        revenues = await db.Order.findAll({
          group: [db.sequelize.fn("hour", db.sequelize.col("createdAt"))],
          attributes: [
            [db.sequelize.fn("sum", db.sequelize.col("total")), "total"],
            [db.sequelize.fn("hour", db.sequelize.col("createdAt")), "hour"],
          ],
          where: [
            db.sequelize.where(
              db.sequelize.fn("day", db.sequelize.col("createdAt")),
              new Date().getDate()
            ),
            {
              order_status_id: {
                [Op.not]: 1,
              },
            },
          ],
        });
      } else if (type === "daysInMonth") {
        revenues = await db.Order.findAll({
          group: [db.sequelize.fn("day", db.sequelize.col("createdAt"))],
          attributes: [
            [db.sequelize.fn("sum", db.sequelize.col("total")), "total"],
            [db.sequelize.fn("day", db.sequelize.col("createdAt")), "day"],
          ],
          where: [
            db.sequelize.where(
              db.sequelize.fn("month", db.sequelize.col("createdAt")),
              new Date().getMonth() + 1
            ),
            db.sequelize.where(
              db.sequelize.fn("year", db.sequelize.col("createdAt")),
              new Date().getFullYear()
            ),
            {
              order_status_id: {
                [Op.not]: 1,
              },
            },
          ],
        });
      } else if (type === "sumCurrentMonth") {
        revenues = await db.Order.findAll({
          group: [db.sequelize.fn("month", db.sequelize.col("createdAt"))],
          attributes: [
            [db.sequelize.fn("sum", db.sequelize.col("total")), "total"],
            [db.sequelize.fn("year", db.sequelize.col("createdAt")), "year"],
            [db.sequelize.fn("month", db.sequelize.col("createdAt")), "month"],
          ],
          where: {
            order_status_id: {
              [Op.not]: 1,
            },
            [Op.or]: [
              [
                db.sequelize.where(
                  db.sequelize.fn("month", db.sequelize.col("createdAt")),
                  month
                ),
                db.sequelize.where(
                  db.sequelize.fn("year", db.sequelize.col("createdAt")),
                  year
                ),
              ],
              [
                db.sequelize.where(
                  db.sequelize.fn("month", db.sequelize.col("createdAt")),
                  lastMonth
                ),
                db.sequelize.where(
                  db.sequelize.fn("year", db.sequelize.col("createdAt")),
                  lastYear
                ),
              ],
            ],
          },
        });
      }
      resolve({ status: 200, data: revenues });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: { error, message: "get revenue fail" } });
    }
  });
};
const getOrder = async (query) => {
  return new Promise(async (resolve, reject) => {
    let dt = new Date();
    try {
      let { type, month, year } = query;
      month = month ? parseInt(month) : dt.getMonth() + 1;
      let lastMonth = month === 1 ? 12 : month - 1;
      year = year ? parseInt(year) : dt.getFullYear();
      let lastYear = lastMonth === 12 ? year - 1 : year;
      let count;
      if (type === "countCurrentMonth") {
        count = await db.Order.findAll({
          group: [db.sequelize.fn("month", db.sequelize.col("createdAt"))],
          attributes: [
            [db.sequelize.fn("count", db.sequelize.col("id")), "count"],
            [db.sequelize.fn("year", db.sequelize.col("createdAt")), "year"],
            [db.sequelize.fn("month", db.sequelize.col("createdAt")), "month"],
          ],
          where: {
            [Op.or]: [
              [
                db.sequelize.where(
                  db.sequelize.fn("month", db.sequelize.col("createdAt")),
                  month
                ),
                db.sequelize.where(
                  db.sequelize.fn("year", db.sequelize.col("createdAt")),
                  year
                ),
              ],
              [
                db.sequelize.where(
                  db.sequelize.fn("month", db.sequelize.col("createdAt")),
                  lastMonth
                ),
                db.sequelize.where(
                  db.sequelize.fn("year", db.sequelize.col("createdAt")),
                  lastYear
                ),
              ],
            ],
          },
        });
        resolve({ status: 200, data: count });
      }
      resolve({ status: 200, data: { count } });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: { error, message: "get revenue fail" } });
    }
  });
};
const getComment = async (query) => {
  return new Promise(async (resolve, reject) => {
    let dt = new Date();
    try {
      let { type, month, year } = query;
      month = month ? parseInt(month) : dt.getMonth() + 1;
      let lastMonth = month === 1 ? 12 : month - 1;
      year = year ? parseInt(year) : dt.getFullYear();
      let lastYear = lastMonth === 12 ? year - 1 : year;
      let count;
      if (type === "countCurrentMonth") {
        count = await db.Comment.findAll({
          group: [db.sequelize.fn("month", db.sequelize.col("createdAt"))],
          attributes: [
            [db.sequelize.fn("count", db.sequelize.col("id")), "count"],
            [db.sequelize.fn("year", db.sequelize.col("createdAt")), "year"],
            [db.sequelize.fn("month", db.sequelize.col("createdAt")), "month"],
          ],
          where: {
            [Op.or]: [
              [
                db.sequelize.where(
                  db.sequelize.fn("month", db.sequelize.col("createdAt")),
                  month
                ),
                db.sequelize.where(
                  db.sequelize.fn("year", db.sequelize.col("createdAt")),
                  year
                ),
              ],
              [
                db.sequelize.where(
                  db.sequelize.fn("month", db.sequelize.col("createdAt")),
                  lastMonth
                ),
                db.sequelize.where(
                  db.sequelize.fn("year", db.sequelize.col("createdAt")),
                  lastYear
                ),
              ],
            ],
          },
        });
        resolve({ status: 200, data: count });
      }
      resolve({ status: 200, data: { count } });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: { error, message: "get revenue fail" } });
    }
  });
};
const getUser = async (query) => {
  return new Promise(async (resolve, reject) => {
    let dt = new Date();
    try {
      let { type, month, year } = query;
      month = month ? parseInt(month) : dt.getMonth() + 1;
      let lastMonth = month === 1 ? 12 : month - 1;
      year = year ? parseInt(year) : dt.getFullYear();
      let lastYear = lastMonth === 12 ? year - 1 : year;
      let count;
      if (type === "countCurrentMonth") {
        count = await db.User.findAll({
          group: [db.sequelize.fn("month", db.sequelize.col("createdAt"))],
          attributes: [
            [db.sequelize.fn("count", db.sequelize.col("id")), "count"],
            [db.sequelize.fn("year", db.sequelize.col("createdAt")), "year"],
            [db.sequelize.fn("month", db.sequelize.col("createdAt")), "month"],
          ],
          where: {
            [Op.or]: [
              [
                db.sequelize.where(
                  db.sequelize.fn("month", db.sequelize.col("createdAt")),
                  month
                ),
                db.sequelize.where(
                  db.sequelize.fn("year", db.sequelize.col("createdAt")),
                  year
                ),
              ],
              [
                db.sequelize.where(
                  db.sequelize.fn("month", db.sequelize.col("createdAt")),
                  lastMonth
                ),
                db.sequelize.where(
                  db.sequelize.fn("year", db.sequelize.col("createdAt")),
                  lastYear
                ),
              ],
            ],
            role_id: {
              [Op.not]: 1,
            },
          },
        });
        resolve({ status: 200, data: count });
      }
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: { error, message: "get revenue fail" } });
    }
  });
};
module.exports = { getRevenue, getUser, getOrder, getComment };
