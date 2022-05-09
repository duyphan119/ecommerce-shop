const db = require("../models");
const { toSlug } = require("../utils");

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
      const { limit, p, type } = query;
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
          offset: !p ? 0 : parseInt(p),
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
      } else {
        products = await db.Product.findAll({
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
          limit: !limit ? 20 : parseInt(limit),
          offset: !p ? 0 : parseInt(p),
        });
        count = await db.Product.count();
      }
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
        limit: parseInt(limit),
        offset: !p ? 0 : parseInt(p),
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
        data: { items: existingProducts, total_page: 1 },
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
      const { limit, p } = query;
      let existingProducts = await db.Product.findAll({
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
        where: { "$Category.Group_Category.slug$": slug },
        limit: parseInt(limit),
        offset: !p ? 0 : parseInt(p),
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
        data: { items: existingProducts, total_page: 1 },
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
const getByCategorySlug = async (slug) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingProducts = await db.Product.findAll({
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
        where: { "$Category.slug$": slug },
      });
      resolve({ status: 200, data: existingProducts });
    } catch (error) {
      console.log(error);
      resolve({
        status: 500,
        data: { error, message: "error get product by gender slug" },
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
};
