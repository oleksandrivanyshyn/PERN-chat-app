import { Request, Response } from 'express';
import { prisma } from '../db/prisma.js';
import { getReceiverSocketId, io } from '../socket/socket.js';
export const sendMessage = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    if (!message) {
      return res.status(400).json({ error: 'Message body is required' });
    }

    let conversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          { participants: { some: { id: senderId } } },
          { participants: { some: { id: receiverId } } },
        ],
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participants: {
            connect: [{ id: senderId }, { id: receiverId }],
          },
        },
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        senderId: senderId,
        conversationId: conversation.id,
      },
    });
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }
    return res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error in sendMessage controller:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMessages = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user.id;

    const conversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          { participants: { some: { id: senderId } } },
          { participants: { some: { id: userToChatId } } },
        ],
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
    if (conversation) {
      res.status(200).json(conversation.messages);
    }
    res.status(200).json([]);
  } catch (error) {
    console.error('Error in getMessages controller:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: req.user.id,
        },
      },
      select: {
        id: true,
        fullName: true,
        profilePic: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error in getUsersForSidebar controller:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
