const db = require("../models");
const user = require("../models/user");
const { Op } = require("sequelize");
const { defaultOrderInclude } = require("../utils");
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
          {
            model: db.Coupon,
            as: "coupon",
          },
        ],
        order: [["id", "desc"]],
      };
      if (limit) {
        option.limit = parseInt(limit);
      }
      if (p && limit) {
        option.offset = (parseInt(p) - 1) * parseInt(limit);
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
        include: defaultOrderInclude(),
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
      const existingOrder = await db.Order.findOne({
        where: { id },
        nest: true,
        include: defaultOrderInclude(),
      });
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
      let {
        user_id,
        cart_id,
        cart,
        address,
        total,
        telephone,
        coupon_id,
        full_name,
      } = body;
      coupon_id = coupon_id ? coupon_id : 1;
      const createdOrder = await db.Order.create({
        user_id,
        address,
        total,
        telephone,
        coupon_id,
        order_status_id: 1,
        full_name,
      });
      let items = cart.items.map((item) => ({
        product_detail_id: item.detail.id,
        quantity: item.quantity,
        order_id: createdOrder.id,
        product_price: item.detail.product.price,
      }));
      // Xo?? h???t cart item
      await db.CartItem.destroy({
        where: {
          cart_id,
          product_detail_id: {
            [Op.in]: items.map((item) => item.product_detail_id),
          },
        },
      });
      // Th??m order items
      await db.OrderItem.bulkCreate(items);
      resolve({ status: 200, data: createdOrder });
    } catch (error) {
      console.log(error);
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
      const foundData = await getById(id);
      resolve({ status: 200, data: foundData.data });
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
        data: { message: "this order is deleted" },
      });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error delete order" } });
    }
  });
};
module.exports = { getAll, getByUser, getById, create, update, destroy };
