const db = require("../models");
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const materials = await db.Material.findAll();
      resolve({ status: 200, data: materials });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get all materials" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingMaterial = await db.Material.findOne({ where: { id } });
      resolve({ status: 200, data: existingMaterial });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get material by id" },
      });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdMaterial = await db.Material.create(body);
      existingMaterial = await getById(createdMaterial.id);
      resolve({ status: 200, data: existingMaterial.data });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new material" },
      });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...others } = body;
      await db.Material.update(others, { where: { id } });
      const existingMaterial = await getById(id);
      resolve({ status: 200, data: existingMaterial.data });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error update material" },
      });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Material.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this material is deleted" },
      });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error delete material" },
      });
    }
  });
};
module.exports = { getAll, getById, create, update, destroy };
