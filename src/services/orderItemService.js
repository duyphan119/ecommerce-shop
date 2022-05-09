const db = require("../models");
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const orderItems = await db.OrderItem.findAll();
      resolve({ status: 200, data: orderItems });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get all order items" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingOrderItem = await db.OrderItem.findOne({ where: { id } });
      resolve({ status: 200, data: existingOrderItem });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get order item by id" },
      });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdOrderItem = await db.OrderItem.create(body);
      resolve({ status: 200, data: createdOrderItem });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new order item" },
      });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...others } = body;
      await db.OrderItem.update({ ...others }, { where: { id } });
      const existingOrderItem = await getById(id);
      resolve({ status: 200, data: existingOrderItem.data });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error update order item" },
      });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.OrderItem.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this order item is deleted" },
      });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error delete order item" },
      });
    }
  });
};
module.exports = { getAll, getById, create, update, destroy };
