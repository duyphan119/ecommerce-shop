const db = require("../models");
const { toSlug } = require("../utils");
const { Op } = require("sequelize");
const { sequelize } = require("../models");

const formatProductColors = (product) => {
  let arrColors = [];
  product.details.forEach((item) => {
    if (arrColors.findIndex((el) => el.id === item.color.id) === -1) {
      arrColors.push({
        ...item.color.dataValues,
        sizes: product.details
          .filter((el1) => el1.color.id === item.color.id)
          .map((el2) => ({
            ...el2.size.dataValues,
            amount: el2.amount,
            sku: el2.sku,
            detail_id: el2.id,
          })),
        images: product.images
          .filter((el1) => el1.color_id === item.color.id)
          .map((el2) => el2),
      });
    }
  });
  return arrColors;
};

const getAll = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { limit, p, type, include } = query;

      let products, count;
      if (type && type === "best-seller") {
        products = await db.OrderItem.findAll({
          nest: true,
          include: {
            model: db.ProductDetail,
            as: "detail",
            include: {
              model: db.Product,
              as: "product",
              include: [
                {
                  model: db.ProductDetail,
                  as: "details",
                  separate: true,
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
                {
                  model: db.Category,
                  as: "category",
                  attributes: {
                    exclude: ["group_category_id", "createdAt", "updatedAt"],
                  },
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
                },
                {
                  model: db.Image,
                  as: "images",
                  separate: true,
                },
              ],
            },
          },
          group: [db.sequelize.col("detail.product_id")],
          order: [[db.sequelize.fn("sum", db.sequelize.col("quantity"))]],
          limit: !limit ? 5 : parseInt(limit),
          offset: (!p ? 0 : parseInt(p) - 1) * (!limit ? 5 : parseInt(limit)),
        });
        let existingOrderItems = await db.OrderItem.findAll({
          nest: true,
          include: {
            model: db.ProductDetail,
            as: "detail",
          },
          group: [db.sequelize.col("detail.product_id")],
        });
        count = existingOrderItems.length;
        products = products.map((item) => {
          const newObj = {
            ...item.detail.product.dataValues,
            colors: formatProductColors(item.detail.product),
          };
          delete newObj.details;
          delete newObj.images;
          return newObj;
        });
        resolve({
          status: 200,
          data: {
            items: products,
            total_page: Math.ceil(count / (!limit ? 20 : parseInt(limit))),
          },
        });
      } else {
        const option = {
          order: [["id", "desc"]],
          nest: true,
          attributes: {
            exclude: ["category_id"],
          },
        };
        if (limit) {
          option.limit = parseInt(limit);
        }
        if (p) {
          option.offset = parseInt(limit) * (parseInt(p) - 1);
        }
        if (include) {
          option.include = [
            {
              model: db.ProductDetail,
              as: "details",
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
            {
              model: db.Category,
              as: "category",
              attributes: {
                exclude: ["group_category_id", "createdAt", "updatedAt"],
              },
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
            },
            {
              model: db.Image,
              as: "images",
            },
          ];
        }
        products = await db.Product.findAll(option);
        if (include) {
          count = await db.Product.count();
          products = products.map((item) => {
            const newObj = {
              ...item.dataValues,
              colors: formatProductColors(item),
            };
            delete newObj.details;
            delete newObj.images;
            return newObj;
          });
          resolve({
            status: 200,
            data: {
              items: products,
              total_page: Math.ceil(count / (!limit ? 20 : parseInt(limit))),
            },
          });
        }
        resolve({
          status: 200,
          data: products,
        });
      }
    } catch (error) {
      console.log(error);
      resolve({
        status: 500,
        data: { error, message: error },
      });
    }
  });
};
const search = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { limit, q, p, include } = query;
      if (q === "") {
        resolve({
          status: 200,
          data: [],
        });
      }
      let option = {
        where: {
          [Op.or]: [
            {
              name: {
                [Op.substring]: q,
              },
            },
            {
              slug: {
                [Op.substring]: q,
              },
            },
            {
              description: {
                [Op.substring]: q,
              },
            },
          ],
        },
        order: [["id", "desc"]],
      };
      if (limit) {
        option.limit = parseInt(limit);
      }
      if (p) {
        option.offset = parseInt(limit) * (parseInt(p) - 1);
      }
      if (include) {
        option.include = [
          {
            model: db.ProductDetail,
            as: "details",
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
          {
            model: db.Category,
            as: "category",
            attributes: {
              exclude: ["group_category_id", "createdAt", "updatedAt"],
            },
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
          },
          {
            model: db.Image,
            as: "images",
          },
        ];
      }
      let products = await db.Product.findAll(option);
      if (include) {
        count = await db.Product.count();
        products = products.map((item) => {
          const newObj = {
            ...item.dataValues,
            colors: formatProductColors(item),
          };
          delete newObj.details;
          delete newObj.images;
          return newObj;
        });
        resolve({
          status: 200,
          data: !limit
            ? products
            : {
                items: products,
                total_page: Math.ceil(count / parseInt(limit)),
              },
        });
      }

      resolve({
        status: 200,
        data: products,
      });
    } catch (error) {
      console.log(error);
      resolve({
        status: 500,
        data: { error, message: error },
      });
    }
  });
};
const getByGenderSlug = async (query, slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { limit, p } = query;
      let existingProducts = await db.Product.findAll({
        order: [["id", "desc"]],
        nest: true,
        attributes: {
          exclude: ["category_id"],
        },
        include: [
          {
            model: db.ProductDetail,
            as: "details",
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
          {
            model: db.Category,
            as: "category",
            required: true,
            attributes: {
              exclude: ["group_category_id", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.GroupCategory,
                as: "group_category",
                required: true,
                attributes: {
                  exclude: ["gender_id", "createdAt", "updatedAt"],
                },
                include: [
                  {
                    model: db.Gender,
                    as: "gender",
                    required: true,
                    attributes: {
                      exclude: ["createdAt", "updatedAt"],
                    },
                  },
                ],
              },
            ],
          },
          {
            model: db.Image,
            as: "images",
          },
        ],
        where: { "$Category.Group_Category.Gender.slug$": slug },
        limit: !limit ? 10 : parseInt(limit),
        offset: (!p ? 0 : parseInt(p) - 1) * (!limit ? 10 : parseInt(limit)),
      });
      const count = await db.Product.count({
        where: { "$Category.Group_Category.Gender.slug$": slug },
        include: [
          {
            model: db.Category,
            as: "category",
            required: true,
            attributes: {
              exclude: ["group_category_id", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.GroupCategory,
                as: "group_category",
                required: true,
                attributes: {
                  exclude: ["gender_id", "createdAt", "updatedAt"],
                },
                include: [
                  {
                    model: db.Gender,
                    as: "gender",
                    required: true,
                    attributes: {
                      exclude: ["createdAt", "updatedAt"],
                    },
                  },
                ],
              },
            ],
          },
        ],
        nest: true,
      });
      existingProducts = existingProducts.map((item) => {
        const newObj = {
          ...item.dataValues,
          colors: formatProductColors(item),
        };
        delete newObj.details;
        delete newObj.images;
        return newObj;
      });
      resolve({
        status: 200,
        data: {
          items: existingProducts,
          total_page: Math.ceil(count / (!limit ? 10 : parseInt(limit))),
        },
      });
    } catch (error) {
      console.log(error);
      resolve({
        status: 500,
        data: { error, message: "error get product by gender slug" },
      });
    }
  });
};
const getByGroupCategorySlug = async (query, slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { limit, p, size, color, material, price, sortBy, sortType } = query;
      material = material ? JSON.parse(material) : [];
      color = color ? JSON.parse(color) : [];
      size = size ? JSON.parse(size) : [];
      price = price ? JSON.parse(price) : [];
      const filterWhere = { "$product.category.group_category.slug$": slug };
      if (color.length > 0) {
        filterWhere["$color.value$"] = {
          [Op.in]: color,
        };
      }
      if (size.length > 0) {
        filterWhere["$size.value$"] = {
          [Op.in]: size,
        };
      }
      if (price.length > 0) {
        filterWhere["$product.price$"] = {
          [Op.and]: [
            {
              [Op.gte]: price[0],
            },
            {
              [Op.lte]: price[1] ? price[1] : 9999999999,
            },
          ],
        };
      }
      const filteredProductId = await db.ProductDetail.findAll({
        nest: true,
        include: [
          {
            model: db.Color,
            as: "color",
          },
          {
            model: db.Size,
            as: "size",
          },
          {
            model: db.Product,
            as: "product",
            include: [
              {
                model: db.Category,
                as: "category",
                include: [
                  {
                    model: db.GroupCategory,
                    as: "group_category",
                  },
                ],
              },
            ],
          },
        ],
        where: filterWhere,
        group: ["product.id"],
      });
      const listId = filteredProductId.map((item) => item.product.id);
      let existingProducts = await db.Product.findAll({
        order: [[sortBy ? sortBy : "id", sortType ? sortType : "desc"]],
        nest: true,
        attributes: {
          exclude: ["category_id"],
        },
        include: [
          {
            model: db.ProductDetail,
            as: "details",
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
          {
            model: db.Category,
            as: "category",
            required: true,
            attributes: {
              exclude: ["group_category_id", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.GroupCategory,
                as: "group_category",
                required: true,
                attributes: {
                  exclude: ["gender_id", "createdAt", "updatedAt"],
                },
                include: [
                  {
                    model: db.Gender,
                    as: "gender",
                    required: true,
                    attributes: {
                      exclude: ["createdAt", "updatedAt"],
                    },
                  },
                ],
              },
            ],
          },
          {
            model: db.Image,
            as: "images",
          },
        ],
        limit: !limit ? 10 : parseInt(limit),
        offset: (!p ? 0 : parseInt(p) - 1) * (!limit ? 10 : parseInt(limit)),
        where: {
          id: {
            [Op.in]: listId,
          },
        },
      });
      const count = await db.Product.count({
        where: {
          id: {
            [Op.in]: listId,
          },
        },
        nest: true,
      });

      existingProducts = existingProducts.map((item) => {
        const newObj = {
          ...item.dataValues,
          colors: formatProductColors(item),
        };
        delete newObj.details;
        delete newObj.images;
        return newObj;
      });
      resolve({
        status: 200,
        data: {
          items: existingProducts,
          total_page: Math.ceil(count / (!limit ? 10 : parseInt(limit))),
          total_rows: count,
        },
      });
    } catch (error) {
      console.log(error);
      resolve({
        status: 500,
        data: { error, message: "error get product by group category slug" },
      });
    }
  });
};
const getByCategorySlug = async (query, slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { limit, p, size, color, material, price, sortBy, sortType } = query;
      material = material ? JSON.parse(material) : [];
      color = color ? JSON.parse(color) : [];
      size = size ? JSON.parse(size) : [];
      price = price ? JSON.parse(price) : [];
      const filterWhere = { "$product.category.slug$": slug };
      if (color.length > 0) {
        filterWhere["$color.value$"] = {
          [Op.in]: color,
        };
      }
      if (size.length > 0) {
        filterWhere["$size.value$"] = {
          [Op.in]: size,
        };
      }
      if (price.length > 0) {
        filterWhere["$product.price$"] = {
          [Op.and]: [
            {
              [Op.gte]: price[0],
            },
            {
              [Op.lte]: price[1] ? price[1] : 9999999999,
            },
          ],
        };
      }
      const filteredProductId = await db.ProductDetail.findAll({
        nest: true,
        include: [
          {
            model: db.Color,
            as: "color",
          },
          {
            model: db.Size,
            as: "size",
          },
          {
            model: db.Product,
            as: "product",
            include: [
              {
                model: db.Category,
                as: "category",
              },
            ],
          },
        ],
        where: filterWhere,
        group: ["product.id"],
      });
      const listId = filteredProductId.map((item) => item.product.id);
      let existingProducts = await db.Product.findAll({
        order: [[sortBy ? sortBy : "id", sortType ? sortType : "desc"]],
        nest: true,
        attributes: {
          exclude: ["category_id"],
        },
        include: [
          {
            model: db.ProductDetail,
            as: "details",
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
                model: db.Color,
                as: "color",
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
                // where:
                //   color.length > 0
                //     ? {
                //         value: {
                //           [Op.in]: color,
                //         },
                //       }
                //     : {},
              },
              {
                model: db.Size,
                as: "size",
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
                // where:
                //   size.length > 0
                //     ? {
                //         value: {
                //           [Op.in]: size,
                //         },
                //       }
                //     : {},
              },
            ],
          },
          {
            model: db.Category,
            as: "category",
            required: true,
            attributes: {
              exclude: ["group_category_id", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.GroupCategory,
                as: "group_category",
                required: true,
                attributes: {
                  exclude: ["gender_id", "createdAt", "updatedAt"],
                },
                include: [
                  {
                    model: db.Gender,
                    as: "gender",
                    required: true,
                    attributes: {
                      exclude: ["createdAt", "updatedAt"],
                    },
                  },
                ],
              },
            ],
          },
          {
            model: db.Image,
            as: "images",
          },
        ],
        limit: !limit ? 10 : parseInt(limit),
        offset: (!p ? 0 : parseInt(p) - 1) * (!limit ? 10 : parseInt(limit)),
        where: {
          id: {
            [Op.in]: listId,
          },
        },
      });
      const count = await db.Product.count({
        where: {
          id: {
            [Op.in]: listId,
          },
        },
        nest: true,
      });

      existingProducts = existingProducts.map((item) => {
        const newObj = {
          ...item.dataValues,
          colors: formatProductColors(item),
        };
        delete newObj.details;
        delete newObj.images;
        return newObj;
      });
      resolve({
        status: 200,
        data: {
          items: existingProducts,
          total_page: Math.ceil(count / (!limit ? 10 : parseInt(limit))),
          total_rows: count,
        },
      });
      // resolve({
      //   status: 200,
      //   data: listId,
      // });
    } catch (error) {
      console.log(error);
      resolve({
        status: 500,
        data: { error, message: "error get product by category slug" },
      });
    }
  });
};
const getBySlug = async (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingProduct = await db.Product.findOne({
        nest: true,
        attributes: {
          exclude: ["category_id"],
        },
        include: [
          {
            model: db.ProductDetail,
            as: "details",
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
          {
            model: db.Category,
            as: "category",
            attributes: {
              exclude: ["group_category_id", "createdAt", "updatedAt"],
            },
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
          },
          {
            model: db.Image,
            as: "images",
          },
        ],
        where: { slug },
      });

      existingProduct.dataValues.colors = formatProductColors(existingProduct);
      delete existingProduct.dataValues.details;
      delete existingProduct.dataValues.images;
      resolve({
        status: 200,
        data: existingProduct,
      });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get product by slug" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingProduct = await db.Product.findOne({
        nest: true,
        attributes: {
          exclude: ["category_id"],
        },
        include: [
          {
            model: db.ProductDetail,
            as: "details",
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
          {
            model: db.Category,
            as: "category",
            attributes: {
              exclude: ["group_category_id", "createdAt", "updatedAt"],
            },
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
          },
        ],
        where: { id },
      });
      resolve({ status: 200, data: existingProduct });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get product by id" },
      });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name } = body;
      const slug = toSlug(name);
      const createdProduct = await db.Product.create({
        ...body,
        slug,
      });
      resolve({ status: 200, data: createdProduct });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new product" },
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
      await db.Product.update({ ...others, slug }, { where: { id } });
      const existingProduct = await getById(id);
      resolve({ status: 200, data: existingProduct.data });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error update product" },
      });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Product.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this product is deleted" },
      });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error delete product" },
      });
    }
  });
};
module.exports = {
  getAll,
  getByGenderSlug,
  getByGroupCategorySlug,
  getByCategorySlug,
  getBySlug,
  getById,
  create,
  update,
  destroy,
  search,
};
