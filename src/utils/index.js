const { Op } = require("sequelize");
const db = require("../models");
const toSlug = (str) => {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase();

  // xóa dấu
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
  str = str.replace(/(đ)/g, "d");

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, "");

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, "-");

  // xóa phần dự - ở đầu
  str = str.replace(/^-+/g, "");

  // xóa phần dư - ở cuối
  str = str.replace(/-+$/g, "");

  // return
  return str;
};

const defaultProductInclude = (user) => {
  return [
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
    {
      model: db.ProductUser,
      as: "product_users",
      required: false,
      where: {
        user_id: user ? user.id : "",
      },
      limit: 1,
    },
  ];
};

const defaultCategoryInclude = () => {
  return [
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
  ];
};

const defaultOrderItemInclude = (user) => {
  return [
    {
      model: db.ProductDetail,
      as: "detail",
      include: {
        model: db.Product,
        as: "product",
        include: defaultProductInclude(user),
      },
    },
    {
      model: db.Order,
      as: "order",
    },
  ];
};

module.exports = {
  toSlug,
  defaultProductInclude,
  defaultCategoryInclude,
  defaultOrderItemInclude,
};
