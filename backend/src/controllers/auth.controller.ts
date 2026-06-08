import { Request, Response } from 'express';
import { prisma } from '../db/prisma.js';
import bcryptjs from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords don`t match' });
    }
    const user = await prisma.user.findUnique({ where: { username } });
    if (user) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const boyProfilePic = `https://avatarapi.runflare.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatarapi.runflare.run/public/girl?username=${username}`;
    const newUser = await prisma.user.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
        gender: gender.toUpperCase(),
        profilePic:
          gender.toUpperCase() === 'MALE' ? boyProfilePic : girlProfilePic,
      },
    });
    if (newUser) {
      generateToken(newUser.id, res);
      return res
        .status(201)
        .json({ message: 'User created successfully', user: newUser });
    }
    return res.status(400).json({ error: 'Invalid user data' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const login = (req: Request, res: Response) => {};
export const logout = (req: Request, res: Response) => {};
