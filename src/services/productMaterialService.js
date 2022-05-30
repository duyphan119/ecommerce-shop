const { Op } = require("sequelize");
const db = require("../models");
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const productsMaterials = await db.ProductMaterial.findAll();
      resolve({ status: 200, data: productsMaterials });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get all product materials" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingProductMaterial = await db.ProductMaterial.findOne({
        where: { id },
      });
      resolve({ status: 200, data: existingProductMaterial });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get product material by id" },
      });
    }
  });
};
const create = async (query, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { many } = query;
      if (many) {
        const createdProductMaterials = await db.ProductMaterial.bulkCreate(
          body
        );
        resolve({ status: 200, data: createdProductMaterials });
      } else {
        const createdProductMaterial = await db.ProductMaterial.create(body);
        resolve({ status: 200, data: createdProductMaterial });
      }
    } catch (error) {
      console.log(error);
      resolve({
        status: 500,
        data: { error, message: "error create new product material material" },
      });
    }
  });
};
const update = async (query, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, materials, ...others } = body;
      const { many } = query;
      if (many) {
        await db.ProductMaterial.bulkCreate(materials, {
          updateOnDuplicate: ["material_id"],
        });
      } else {
        await db.ProductMaterial.update({ ...others }, { where: { id } });
      }
      const existingProductMaterial = await getById(id);
      resolve({ status: 200, data: existingProductMaterial.data });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error update product material" },
      });
    }
  });
};
const destroy = async (query, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.ProductMaterial.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this product material is deleted" },
      });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error delete product material" },
      });
    }
  });
};
const destroyMany = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(body);
      await db.ProductMaterial.destroy({ where: { id: { [Op.in]: body } } });
      resolve({
        status: 200,
        data: { message: "these product material is deleted" },
      });
    } catch (error) {
      console.log(error);
      resolve({
        status: 500,
        data: { error, message: "error delete product material" },
      });
    }
  });
};
module.exports = { getAll, getById, create, update, destroy, destroyMany };
