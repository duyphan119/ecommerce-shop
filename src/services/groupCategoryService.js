const db = require("../models");
const { toSlug } = require("../utils");
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const groupCategories = await db.GroupCategory.findAll({
        nest: true,
        include: [
          {
            model: db.Gender,
            as: "gender",
            attributes: {
              exclude: ["gender_id"],
            },
          },
        ],
      });
      resolve({ status: 200, data: groupCategories });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get all groups categories" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingGroupCategory = await db.GroupCategory.findOne({
        nest: true,
        where: { id },
        include: [
          {
            model: db.Gender,
            as: "gender",
            attributes: {
              exclude: ["gender_id"],
            },
          },
        ],
      });
      resolve({ status: 200, data: existingGroupCategory });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get group category by id" },
      });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name } = body;
      const slug = toSlug(name);
      const createdGroupCategory = await db.GroupCategory.create({
        ...body,
        slug,
      });
      resolve({ status: 200, data: createdGroupCategory });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new group category" },
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
      await db.GroupCategory.update({ ...others, slug }, { where: { id } });
      const existingGroupCategory = await getById(id);
      resolve({ status: 200, data: existingGroupCategory.data });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error update group category" },
      });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.GroupCategory.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this group category is deleted" },
      });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error delete group category" },
      });
    }
  });
};
module.exports = { getAll, getById, create, update, destroy };
