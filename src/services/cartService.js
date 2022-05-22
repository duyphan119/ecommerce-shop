const db = require("../models");
const { Op } = require("sequelize");
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const carts = await db.Cart.findAll();
      resolve({ status: 200, data: carts });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error get all carts" } });
    }
  });
};
const getByUser = async (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingCart = await db.Cart.findOne({
        where: { user_id },
        include: [
          {
            model: db.CartItem,
            as: "items",
            attributes: {
              exclude: ["cart_id", "product_detail_id"],
            },
            include: [
              {
                model: db.ProductDetail,
                as: "detail",
                attributes: {
                  exclude: [
                    "product_id",
                    "color_id",
                    "size_id",
                    "createdAt",
                    "updatedAt",
                  ],
                },
                include: [
                  {
                    model: db.Product,
                    as: "product",
                    attributes: {
                      exclude: ["createdAt", "updatedAt"],
                    },
                    include: [
                      {
                        model: db.Image,
                        as: "images",
                      },
                      {
                        model: db.Discount,
                        as: "discounts",
                        required: false,
                        where: {
                          finish: {
                            [Op.gt]: new Date(),
                          },
                        },
                        limit: 1,
                      },
                    ],
                  },
                  {
                    model: db.Color,
                    as: "color",
                    attributes: {
                      exclude: ["createdAt", "updatedAt"],
                    },
                  },
                  {
                    model: db.Size,
                    as: "size",
                    attributes: {
                      exclude: ["createdAt", "updatedAt"],
                    },
                  },
                ],
              },
            ],
          },
        ],
      });
      resolve({ status: 200, data: existingCart });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get cart by user" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingCart = await db.Cart.findOne({ where: { id } });
      resolve({ status: 200, data: existingCart });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get cart by id" },
      });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingCart = await getByUser(body.user_id);
      if (existingCart) {
        resolve({
          status: 500,
          data: { error, message: "error create new cart" },
        });
      } else {
        const createdCart = await db.Cart.create(body);
        resolve({ status: 200, data: createdCart });
      }
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new cart" },
      });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...others } = body;
      await db.Cart.update({ others }, { where: { id } });
      const existingCart = await getById(id);
      resolve({ status: 200, data: existingCart.data });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: { error, message: "error update cart" } });
    }
  });
};
module.exports = { getAll, getByUser, getById, create, update };
