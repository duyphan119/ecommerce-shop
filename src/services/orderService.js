const db = require("../models");
const user = require("../models/user");
const getAll = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { limit, p } = query;
      let option = {
        attributes: {
          exclude: ["order_status_id"],
        },
        include: [
          {
            model: db.OrderItem,
            as: "items",
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "order_id",
                "product_detail_id",
              ],
            },
            include: [
              {
                model: db.ProductDetail,
                as: "detail",
                attributes: {
                  exclude: [
                    "createdAt",
                    "updatedAt",
                    "color_id",
                    "size_id",
                    "product_id",
                  ],
                },
                include: [
                  {
                    model: db.Size,
                    as: "size",
                    attributes: {
                      exclude: ["createdAt, updatedAt"],
                    },
                  },
                  {
                    model: db.Color,
                    as: "color",
                    attributes: {
                      exclude: ["createdAt, updatedAt"],
                    },
                  },
                  {
                    model: db.Product,
                    as: "product",
                    attributes: {
                      exclude: ["createdAt, updatedAt"],
                    },
                    include: [
                      {
                        model: db.Image,
                        as: "images",
                        attributes: {
                          exclude: ["createdAt, updatedAt"],
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: db.OrderStatus,
            as: "status",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: db.User,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
        ],
        order: [["id", "desc"]],
      };
      if (limit) {
        option.limit = parseInt(limit);
      }
      if (p && limit) {
        option.offset = parseInt(p);
      }
      const orders = await db.Order.findAll(option);
      const count = await db.Order.count();
      resolve({
        status: 200,
        data: {
          items: orders,
          total_page: Math.ceil(count / (!limit ? 1 : parseInt(limit))),
          total_result: count,
        },
      });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get all orders" },
      });
    }
  });
};
const getByUser = async (query, user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { limit, p } = query;
      const options = {
        where: { user_id },
        attributes: {
          exclude: ["order_status_id"],
        },
        include: [
          {
            model: db.OrderItem,
            as: "items",
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "order_id",
                "product_detail_id",
              ],
            },
            include: [
              {
                model: db.ProductDetail,
                as: "detail",
                attributes: {
                  exclude: [
                    "createdAt",
                    "updatedAt",
                    "color_id",
                    "size_id",
                    "product_id",
                  ],
                },
                include: [
                  {
                    model: db.Size,
                    as: "size",
                    attributes: {
                      exclude: ["createdAt, updatedAt"],
                    },
                  },
                  {
                    model: db.Color,
                    as: "color",
                    attributes: {
                      exclude: ["createdAt, updatedAt"],
                    },
                  },
                  {
                    model: db.Product,
                    as: "product",
                    attributes: {
                      exclude: ["createdAt, updatedAt"],
                    },
                    include: [
                      {
                        model: db.Image,
                        as: "images",
                        attributes: {
                          exclude: ["createdAt, updatedAt"],
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: db.OrderStatus,
            as: "status",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: db.User,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
        ],
        order: [["id", "desc"]],
      };
      const count = await db.Order.count({ where: { user_id } });
      limit = !limit ? 20 : parseInt(limit);
      p = !p ? 0 : parseInt(p) - 1;
      options.limit = limit;
      options.offset = p;

      const existingOrders = await db.Order.findAll(options);
      resolve({
        status: 200,
        data: {
          items: existingOrders,
          total_page: Math.ceil(count / limit),
          limit,
          total_result: count,
        },
      });
    } catch (error) {
      console.log(error);
      resolve({
        status: 500,
        data: { error, message: "error get order by user" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingOrder = await db.Order.findOne({ where: { id } });
      resolve({ status: 200, data: existingOrder });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get order by id" },
      });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { user_id, cart, address, total, telephone, coupon_id } = body;
      coupon_id = coupon_id ? coupon_id : 1;
      const createdRole = await db.Order.create({
        user_id,
        address,
        total,
        telephone,
        coupon_id,
        order_status_id: 1,
      });
      // Xoá hết cart item
      await db.CartItem.destroy({ where: { cart_id: cart.id } });
      // Thêm order items
      await db.OrderItem.bulkCreate(
        cart.items.map((item) => ({
          product_detail_id: item.detail.id,
          quantity: item.quantity,
          order_id: createdRole.id,
          product_price: item.detail.product.price,
        }))
      );
      resolve({ status: 200, data: createdRole });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new order" },
      });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...others } = body;
      await db.Order.update(others, { where: { id } });
      resolve({ status: 200, data: "Updated" });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error update order" } });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Order.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this role is deleted" },
      });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error delete role" } });
    }
  });
};
module.exports = { getAll, getByUser, getById, create, update, destroy };
