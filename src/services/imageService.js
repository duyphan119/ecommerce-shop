const { Op } = require("sequelize");
const db = require("../models");
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const images = await db.Image.findAll();
      resolve({ status: 200, data: images });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get all images" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingImage = await db.Image.findOne({ where: { id } });
      resolve({ status: 200, data: existingImage });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get image by id" },
      });
    }
  });
};
const create = async (query, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { many } = query;
      if (many) {
        const createdImages = await db.Image.bulkCreate(body);
        resolve({ status: 200, data: createdImages });
      } else {
        const createdImage = await db.Image.create(body);
        resolve({ status: 200, data: createdImage });
      }
    } catch (error) {
      console.log(error);
      resolve({
        status: 500,
        data: { error, message: "error create new image" },
      });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...others } = body;
      await db.Image.update({ ...others }, { where: { id } });
      const existingImage = await getById(id);
      resolve({ status: 200, data: existingImage.data });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error update image" } });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Image.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this image is deleted" },
      });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error delete image" } });
    }
  });
};
const destroyMany = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Image.destroy({ where: { id: { [Op.in]: body } } });
      resolve({
        status: 200,
        data: { message: "these image is deleted" },
      });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error delete image" } });
    }
  });
};
module.exports = { getAll, getById, create, update, destroy, destroyMany };
