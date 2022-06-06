const db = require("../models");
const { defaultSizeGuideInclude } = require("../utils");
const getAll = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { limit, p } = query;
      limit = !limit ? 10 : parseInt(limit);
      p = !p ? 0 : parseInt(p) - 1;
      const sizeGuides = await db.SizeGuide.findAll({
        nest: true,
        limit,
        offset: p,
        include: defaultSizeGuideInclude(),
      });
      const count = await db.SizeGuide.count();
      resolve({
        status: 200,
        data: {
          items: sizeGuides,
          total_result: count,
          limit,
          total_page: Math.ceil(count / limit),
        },
      });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get all sizeGuides" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingSizeGuide = await db.SizeGuide.findOne({ where: { id } });
      resolve({ status: 200, data: existingSizeGuide });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get size guide by id" },
      });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdSizeGuide = await db.SizeGuide.create(body);
      resolve({ status: 200, data: createdSizeGuide });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new size guide" },
      });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...others } = body;
      await db.SizeGuide.update({ ...others }, { where: { id } });
      const existingSizeGuide = await getById(id);
      resolve({ status: 200, data: existingSizeGuide.data });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error update size guide" },
      });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.SizeGuide.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this size guide is deleted" },
      });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error delete size guide" },
      });
    }
  });
};
module.exports = { getAll, getById, create, update, destroy };
