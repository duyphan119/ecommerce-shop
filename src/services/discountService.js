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
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdDiscount = await db.Discount.create(body);
      existingDiscount = await getById(createdDiscount.id);
      resolve({ status: 200, data: existingDiscount.data });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new discount" },
      });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...others } = body;
      await db.Discount.update(others, { where: { id } });
      const existingDiscount = await getById(id);
      resolve({ status: 200, data: existingDiscount.data });
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
module.exports = { getAll, getById, create, update, destroy };
