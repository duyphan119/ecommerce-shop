const db = require("../models");
const { defaultNotificationInclude } = require("../utils");
const getAll = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { sender_id, limit, p, isRead } = query;
      let data;
      limit = !limit ? 6 : parseInt(limit);
      p = !p ? 0 : parseInt(p) - 1;
      let options = {
        nest: true,
        limit,
        offset: p,
        order: [["id", "desc"]],
        include: defaultNotificationInclude(),
      };
      if (sender_id) {
        options.where = {
          sender_id,
        };
      }
      if (isRead) {
        options.where = {
          ...options.where,
          isRead: isRead === "true",
        };
      }
      data = await db.Notification.findAll(options);
      const count = await db.Notification.count();
      resolve({
        status: 200,
        data: {
          items: data,
          total_result: count,
          total_page: Math.ceil(count / limit),
          limit,
        },
      });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: { message: error } });
    }
  });
};

const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Notification.findOne({
        where: { id },
        nest: true,
        include: defaultNotificationInclude(),
      });
      resolve({ status: 200, data });
    } catch (error) {
      resolve({ status: 500, data: { message: error } });
    }
  });
};

const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdData = await db.Notification.create(body);
      const foundData = await getById(createdData.id);
      resolve({ status: 200, data: foundData.data });
    } catch (error) {
      resolve({ status: 500, data: { message: error } });
    }
  });
};

const update = async (query, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { readAll } = query;
      const { id, ...others } = body;
      if (readAll) {
        await db.Notification.update(
          { isRead: true },
          { where: { isRead: false } }
        );
      }
      if (id) {
        await db.Notification.update(others, { where: { id } });
        const foundData = await getById(createdData.id);
        resolve({ status: 200, data: foundData.data });
      }
      resolve({ status: 200, data: { message: "Done" } });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: { message: error } });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Notification.destroy({ where: { id } });
      resolve({ status: 200, data: "This notification is deleted" });
    } catch (error) {
      resolve({ status: 500, data: { message: error } });
    }
  });
};

module.exports = { create, getAll, getById, update, destroy };
