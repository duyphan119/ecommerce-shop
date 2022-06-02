const db = require("../models");
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const colors = await db.Color.findAll({
        order: [["value", "asc"]],
      });
      resolve({ status: 200, data: colors });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get all colors" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingColor = await db.Color.findOne({ where: { id } });
      resolve({ status: 200, data: existingColor });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get color by id" },
      });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdColor = await db.Color.create(body);
      existingColor = await getById(createdColor.id);
      resolve({ status: 200, data: existingColor.data });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new color" },
      });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...others } = body;
      await db.Color.update(others, { where: { id } });
      const existingColor = await getById(id);
      resolve({ status: 200, data: existingColor.data });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error update color" } });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Color.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this color is deleted" },
      });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error delete color" } });
    }
  });
};
module.exports = { getAll, getById, create, update, destroy };
