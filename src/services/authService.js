const db = require("../models");
const bcrypt = require("bcryptjs");
const userService = require("./userService");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const register = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = body;
      let existingUser = await db.User.findOne({ where: { email } });
      if (existingUser) {
        resolve({
          status: 500,
          data: { error, message: "this email is available" },
        });
      }

      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

      const createdUser = await db.User.create({
        ...body,
        password: hashedPassword,
      });

      existingUser = await userService.getById(createdUser.id);
      resolve({ status: 200, data: existingUser.data });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "register fail" },
      });
    }
  });
};

const login = async (body, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = body;
      let existingUser = await db.User.findOne({
        where: { email },
        include: [
          { model: db.Role, as: "role" },
          { model: db.Cart, as: "cart" },
        ],
      });
      if (!existingUser) {
        resolve({
          status: 500,
          data: { error, message: "this email is incorrect" },
        });
      }

      const comparedResult = bcrypt.compareSync(
        password,
        existingUser.password
      );

      if (!comparedResult) {
        resolve({
          status: 500,
          data: { error, message: "this password is incorrect" },
        });
      }
      const access_token = jwt.sign(
        { id: existingUser.id, role: existingUser.role.role },
        process.env.ACCESS_TOKEN,
        { expiresIn: 3 * 24 * 60 * 60 * 1000 }
      );
      const refresh_token = jwt.sign(
        { id: existingUser.id, role: existingUser.role.role },
        process.env.REFRESH_TOKEN,
        {
          expiresIn: 30 * 24 * 60 * 60 * 1000,
        }
      );
      // Set refresh token to cookie
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      existingUser.dataValues.access_token = access_token;
      delete existingUser.dataValues.password;
      console.log(existingUser);
      resolve({ status: 200, data: existingUser });
    } catch (error) {
      console.log(error);
      resolve({
        status: 500,
        data: { error, message: "login fail" },
      });
    }
  });
};
const refreshToken = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = req.cookies.refresh_token;
      // Check cookie
      if (!token) {
        return { status: 401, data: "Token is invalid" };
      }
      // Verify token
      const user = jwt.verify(token, process.env.REFRESH_TOKEN);
      if (!user) {
        return { status: 401, data: "Token is expired" };
      }
      // Create new access token
      const access_token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.ACCESS_TOKEN,
        { expiresIn: 3 * 24 * 60 * 60 * 1000 }
      );
      resolve({ status: 200, data: { access_token } });
    } catch (error) {
      console.log(error);
      resolve({
        status: 401,
        data: { error, message: "refresh token fail" },
      });
    }
  });
};

module.exports = { register, login, refreshToken };
