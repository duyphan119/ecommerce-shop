const db = require("../models");
const { toSlug } = require("../utils");
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const genders = await db.Gender.findAll({
        nest: true,
        include: [
          {
            model: db.GroupCategory,
            as: "group_categories",
            include: [
              {
                model: db.Category,
                as: "categories",
              },
            ],
          },
        ],
      });
      resolve({ status: 200, data: genders });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get all genders" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingGender = await db.Gender.findOne({ where: { id } });
      resolve({ status: 200, data: existingGender });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get gender by id" },
      });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name } = body;
      const slug = toSlug(name);
      const createdGender = await db.Gender.create({ ...body, slug });
      resolve({ status: 200, data: createdGender });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new gender" },
      });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...others } = body;
      const { name } = others;
      const slug = toSlug(name);
      await db.Gender.update({ ...others, slug }, { where: { id } });
      const existingGender = await getById(id);
      resolve({ status: 200, data: existingGender.data });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error update gender" } });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Gender.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this gender is deleted" },
      });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error delete gender" } });
    }
  });
};
module.exports = { getAll, getById, create, update, destroy };
