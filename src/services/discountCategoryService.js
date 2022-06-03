const db = require("../models");
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const discounts = await db.DiscountCategory.findAll({
        nest: true,
        include: [
          {
            model: db.Category,
            as: "category",
          },
        ],
      });
      resolve({ status: 200, data: discounts });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get all discounts" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingDiscount = await db.DiscountCategory.findOne({
        where: { id },
      });
      resolve({ status: 200, data: existingDiscount });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get discount category by id" },
      });
    }
  });
};
const create = async (query, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { many } = query;
      if (many) {
        const createdDiscounts = await db.DiscountCategory.bulkCreate(body);
        resolve({ status: 200, data: createdDiscounts });
      } else {
        const createdDiscount = await db.DiscountCategory.create(body);
        resolve({ status: 200, data: createdDiscount });
      }
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new discount category" },
      });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...others } = body;
      await db.DiscountCategory.update(others, { where: { id } });
      const existingDiscount = await getById(id);
      resolve({ status: 200, data: existingDiscount.data });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error update discount category" },
      });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.DiscountCategory.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this discount category is deleted" },
      });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error delete discount category" },
      });
    }
  });
};
module.exports = { getAll, getById, create, update, destroy };
