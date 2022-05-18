const cloudinary = require("../config/configCloudinary");
const { promisify } = require("util");
const fs = require("fs");
// fs.unlink trả vè callback, dùng promisify để trả về promise
const unlinkAsync = promisify(fs.unlink);
const uploadOne = async (image) => {
  return new Promise(async (resolve, reject) => {
    cloudinary.uploader.upload(image, {}, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const upload = async (files) => {
  return new Promise(async (resolve, reject) => {
    try {
      let _promises = [];
      let __promises = [];

      for (const file of files) {
        _promises.push(uploadOne(file.path));
      }
      const result = await Promise.all(_promises);
      for (const file of files) {
        __promises.push(unlinkAsync(file.path));
      }
      await Promise.all(__promises);

      resolve({ status: 200, data: result });
    } catch (error) {
      console.log(error);
      reject({ status: 500, data: error });
    }
  });
};
module.exports = { upload };
