const db = require("../models");
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const roles = await db.Role.findAll({ order: [["id", "desc"]] });
      resolve({ status: 200, data: roles });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error get all roles" } });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingRole = await db.Role.findOne({ where: { id } });
      resolve({ status: 200, data: existingRole });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get role by id" },
      });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdRole = await db.Role.create(body);
      resolve({ status: 200, data: createdRole });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new role" },
      });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...others } = body;
      await db.Role.update({ ...others }, { where: { id } });
      const existingRole = await getById(id);
      resolve({ status: 200, data: existingRole.data });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error update role" } });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Role.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this role is deleted" },
      });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error delete role" } });
    }
  });
};
module.exports = { getAll, getById, create, update, destroy };
