const db = require("../models");
const productService = require("./productService");
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingProductUser = await db.ProductUser.findOne({
        where: {
          user_id: body.user_id,
          product_id: body.product_id,
        },
      });
      let existingProduct;
      if (!existingProductUser) {
        const createdProductUser = await db.ProductUser.create(body);
        existingProduct = await productService.getById(
          { id: createdProductUser.user_id },
          createdProductUser.product_id
        );
        resolve({ status: 200, data: existingProduct.data });
      } else {
        await destroy(existingProductUser.id);
        resolve({ status: 200, data: "this product user is deleted" });
      }
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new product user" },
      });
    }
  });
};
const destroyByProduct = async (user, product_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.ProductUser.destroy({ where: { product_id, user_id: user.id } });
      resolve({
        status: 200,
        data: { message: "this product user is deleted" },
      });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error delete product user" },
      });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.ProductUser.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this product user is deleted" },
      });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error delete product user" },
      });
    }
  });
};
module.exports = { create, destroy, destroyByProduct };
