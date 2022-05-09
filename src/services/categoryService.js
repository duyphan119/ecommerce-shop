const db = require("../models");
const { toSlug } = require("../utils");
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const categories = await db.Category.findAll({
        nest: true,
        include: [
          {
            model: db.GroupCategory,
            as: "group_category",
            attributes: {
              exclude: ["gender_id", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.Gender,
                as: "gender",
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
        ],
        attributes: {
          exclude: ["group_category_id"],
        },
      });
      resolve({ status: 200, data: categories });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get all categories" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingCategory = await db.Category.findOne({
        nest: true,
        include: [
          {
            model: db.GroupCategory,
            as: "group_category",
            attributes: {
              exclude: ["gender_id", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.Gender,
                as: "gender",
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
        ],
        attributes: {
          exclude: ["group_category_id"],
        },
        where: { id },
      });
      resolve({ status: 200, data: existingCategory });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get category by id" },
      });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name } = body;
      const slug = toSlug(name);
      const createdCategory = await db.Category.create({
        ...body,
        slug,
      });
      resolve({ status: 200, data: createdCategory });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new category" },
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
      await db.Category.update({ ...others, slug }, { where: { id } });
      const existingCategory = await getById(id);
      resolve({ status: 200, data: existingCategory.data });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error update category" },
      });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Category.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this category is deleted" },
      });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error delete category" },
      });
    }
  });
};
module.exports = { getAll, getById, create, update, destroy };
