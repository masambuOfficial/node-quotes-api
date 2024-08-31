const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv/config");

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const signUp = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword, email, role },
    });
    res
      .status(StatusCodes.OK)
      .json({ message: "User created successfully", newUser });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error occurred while creating user" });
  }
};

const loginUsers = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await prisma.user.findUnique({ where: { username } });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { id: user.id, role: user.role },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
  
        // Return both token and user data
        res.status(StatusCodes.OK).json({
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
          message: "Successful login",
        });
      } else {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ error: "Invalid username or password" });
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };
  

module.exports = { getUsers, signUp, loginUsers };
