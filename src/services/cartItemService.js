const { Op } = require("sequelize");
const db = require("../models");
const productDetailService = require("./productDetailService");
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const carts = await db.CartItem.findAll();
      resolve({ status: 200, data: carts });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get all carts items" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingCartItem = await db.CartItem.findOne({
        where: { id },
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
      });
      resolve({ status: 200, data: existingCartItem });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get cart item by id" },
      });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { cart_id, product_detail_id, quantity } = body;

      let existingCartItem = await db.CartItem.findOne({
        where: {
          cart_id,
          product_detail_id,
        },
      });

      const existingProductDetail = await productDetailService.getById(
        product_detail_id
      );
      if (existingCartItem) {
        if (
          existingCartItem.quantity + quantity <=
          existingProductDetail.data.amount
        ) {
          await db.CartItem.update(
            {
              quantity: existingCartItem.quantity + quantity,
            },
            {
              where: {
                cart_id,
                product_detail_id,
              },
            }
          );
          existingCartItem = await db.CartItem.findOne({
            where: {
              cart_id,
              product_detail_id,
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
          });
          resolve({ status: 200, data: existingCartItem });
        } else {
          resolve({
            status: 500,
            data: { message: "stuck" },
          });
        }
      } else {
        if (quantity <= existingProductDetail.data.amount) {
          const createdCartItem = await db.CartItem.create(body);

          existingCartItem = await db.CartItem.findOne({
            where: {
              cart_id: createdCartItem.cart_id,
              product_detail_id: createdCartItem.product_detail_id,
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
          });
          resolve({ status: 200, data: existingCartItem });
        } else {
          resolve({
            status: 500,
            data: { message: "stuck" },
          });
        }
      }
    } catch (error) {
      console.log(error);
      resolve({
        status: 500,
        data: { error, message: "error create new cart item 1" },
      });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, product_detail_id, quantity } = body;
      const existingProductDetail = await productDetailService.getById(
        product_detail_id
      );
      console.log(quantity, existingProductDetail.data.amount);
      if (quantity <= existingProductDetail.data.amount) {
        await db.CartItem.update(
          {
            quantity: quantity,
          },
          { where: { id } }
        );
        let existingCartItem = await getById(id);
        resolve({ status: 200, data: existingCartItem.data });
      } else {
        resolve({
          status: 500,
          data: { message: "error update cart item" },
        });
      }
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: { error, message: "error update cart" } });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.CartItem.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "This cart item is deleted" },
      });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error update cart" } });
    }
  });
};
const destroyMany = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.CartItem.destroy({
        where: {
          id: {
            [Op.in]: body,
          },
        },
      });
      resolve({
        status: 200,
        data: { message: "This cart item is deleted" },
      });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error update cart" } });
    }
  });
};
module.exports = { getAll, getById, create, update, destroy, destroyMany };
