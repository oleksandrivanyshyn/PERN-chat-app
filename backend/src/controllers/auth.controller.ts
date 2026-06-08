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
      res.status(200).json({
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    }
    return res.status(400).json({ error: 'Invalid user data' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: 'Username and password are required' });
    }
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    generateToken(user.id, res);
    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const logout = (req: Request, res: Response) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
