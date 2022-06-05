const { Op } = require("sequelize");
const db = require("../models");
const getAll = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { code, percent, limit, p } = query;
      limit = !limit ? 10 : parseInt(limit);
      p = !p ? 0 : parseInt(p) - 1;
      let coupons;
      let where = {};
      if (code) {
        where = {
          ...where,
          code,
          finish: {
            [Op.gt]: new Date(),
          },
        };
      }
      if (percent) {
        where = {
          ...where,
          percent,
        };
      }
      const count = await db.Coupon.count({ where });
      coupons = await db.Coupon.findAll({ where, limit, offset: p });
      resolve({
        status: 200,
        data: {
          items: coupons,
          total_result: count,
          total_page: Math.ceil(count / limit),
          limit,
        },
      });
    } catch (error) {
      console.log(error);
      resolve({
        status: 500,
        data: { error, message: "error get all coupons" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingCoupon = await db.Coupon.findOne({ where: { id } });
      resolve({ status: 200, data: existingCoupon });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get coupon by id" },
      });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdCoupon = await db.Coupon.create(body);
      console.log(body);
      resolve({ status: 200, data: createdCoupon });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new coupon" },
      });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...others } = body;
      await db.Coupon.update({ ...others }, { where: { id } });
      resolve({ status: 200, data: "updated" });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error update coupon" } });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Coupon.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this coupon is deleted" },
      });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error delete coupon" } });
    }
  });
};
module.exports = { getAll, getById, create, update, destroy };
