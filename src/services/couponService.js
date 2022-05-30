const { Op } = require("sequelize");
const db = require("../models");
const getAll = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { code, percent } = query;
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
      coupons = await db.Coupon.findAll({ where });
      console.log();
      resolve({ status: 200, data: coupons });
    } catch (error) {
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
      const existingCoupon = await getById(id);
      resolve({ status: 200, data: existingCoupon.data });
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
