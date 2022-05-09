const db = require("../models");
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const orderStatuses = await db.OrderStatus.findAll();
      resolve({ status: 200, data: orderStatuses });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get all orderStatuses" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingOrderStatus = await db.OrderStatus.findOne({
        where: { id },
      });
      resolve({ status: 200, data: existingOrderStatus });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get order status by id" },
      });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdOrderStatus = await db.OrderStatus.create(body);
      resolve({ status: 200, data: createdOrderStatus });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new order status" },
      });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...others } = body;
      await db.OrderStatus.update({ ...others }, { where: { id } });
      const existingOrderStatus = await getById(id);
      resolve({ status: 200, data: existingOrderStatus.data });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error update order status" },
      });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.OrderStatus.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this order status is deleted" },
      });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error delete order status" },
      });
    }
  });
};
module.exports = { getAll, getById, create, update, destroy };
