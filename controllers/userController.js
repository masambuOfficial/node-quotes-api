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
    // Check if username or email is already taken
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email }
        ]
      }
    });
    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username already taken' });
      } 
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already taken' });
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword, email, role },
    });
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    // console.error("Error creating user:", error);
    res.status(500).json({ message: "Error occurred while creating user", error: error.message });
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
