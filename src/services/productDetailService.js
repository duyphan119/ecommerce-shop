const { Op } = require("sequelize");
const db = require("../models");
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const productsDetails = await db.ProductDetail.findAll({
        include: [
          {
            model: db.Cart,
            as: "carts",
          },
        ],
      });
      resolve({ status: 200, data: productsDetails });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get all product details details" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingProductDetail = await db.ProductDetail.findOne({
        where: { id },
      });
      resolve({ status: 200, data: existingProductDetail });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get product detail by id" },
      });
    }
  });
};
const create = async (query, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { many } = query;
      if (many) {
        const createdDetails = await db.ProductDetail.bulkCreate(body);
        resolve({ status: 200, data: createdDetails });
      } else {
        const createdProductDetail = await db.ProductDetail.create(body);
        resolve({ status: 200, data: createdProductDetail });
      }
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new product detail detail" },
      });
    }
  });
};
const update = async (query, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, details, ...others } = body;
      const { many } = query;
      if (many) {
        await db.ProductDetail.bulkCreate(details, {
          updateOnDuplicate: ["amount"],
        });
      } else {
        await db.ProductDetail.update({ ...others }, { where: { id } });
      }
      const existingProductDetail = await getById(id);
      resolve({ status: 200, data: existingProductDetail.data });
    } catch (error) {
      console.log(error);
      resolve({
        status: 500,
        data: { error, message: "error update product detail" },
      });
    }
  });
};
const destroy = async (query, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.ProductDetail.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this product detail is deleted" },
      });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error delete product detail" },
      });
    }
  });
};
module.exports = { getAll, getById, create, update, destroy };
