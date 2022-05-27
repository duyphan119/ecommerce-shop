const db = require("../models");
const getAll = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { position, page, isShow } = query;
      let banners;
      if (position && page) {
        banners = await db.Banner.findAll({
          where: {
            position,
            page,
            isShow: isShow ? (isShow === "true" ? true : false) : true,
          },
        });
      } else {
        banners = await db.Banner.findAll();
      }
      resolve({ status: 200, data: banners });
    } catch (error) {
      console.log(error);
      resolve({
        status: 500,
        data: { error, message: "error get all banners" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingBanner = await db.Banner.findOne({ where: { id } });
      resolve({ status: 200, data: existingBanner });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get banner by id" },
      });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdBanner = await db.Banner.create(body);
      existingBanner = await getById(createdBanner.id);
      resolve({ status: 200, data: existingBanner.data });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new banner" },
      });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...others } = body;
      await db.Banner.update(others, { where: { id } });
      const existingBanner = await getById(id);
      resolve({ status: 200, data: existingBanner.data });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error update banner" } });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Banner.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this banner is deleted" },
      });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error delete banner" } });
    }
  });
};
module.exports = { getAll, getById, create, update, destroy };
