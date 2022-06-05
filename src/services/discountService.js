const { Op } = require("sequelize");
const db = require("../models");
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const discounts = await db.Discount.findAll();
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
      const existingDiscount = await db.Discount.findOne({ where: { id } });
      resolve({ status: 200, data: existingDiscount });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get discount by id" },
      });
    }
  });
};
const create = async (query, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { many } = query;
      if (many) {
        const createdDiscounts = await db.Discount.bulkCreate(body, {
          updateOnDuplicate: ["finish", "new_price"],
        });
        resolve({ status: 200, data: createdDiscounts });
      } else {
        const createdDiscount = await db.Discount.create(body);
        resolve({ status: 200, data: createdDiscount });
      }
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new discount" },
      });
    }
  });
};
const update = async (query, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...others } = body;
      const { many } = query;
      if (many) {
        const updatedDiscounts = await db.Discount.bulkCreate(body, {
          updateOnDuplicate: ["finish", "new_price"],
        });
        resolve({ status: 200, data: updatedDiscounts });
      } else {
        await db.Discount.update(others, { where: { id } });
        resolve({ status: 200, data: "Updated" });
      }
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error update discount" },
      });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Discount.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this discount is deleted" },
      });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error delete discount" },
      });
    }
  });
};

const destroyMany = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(body);
      await db.Discount.destroy({ where: { id: { [Op.in]: body } } });
      resolve({
        status: 200,
        data: { message: "this discount is deleted" },
      });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error delete discount" },
      });
    }
  });
};
module.exports = { getAll, getById, create, update, destroy, destroyMany };
