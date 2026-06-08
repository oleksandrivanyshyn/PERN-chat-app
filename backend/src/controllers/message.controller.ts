import { Request, Response } from 'express';
import { prisma } from '../db/prisma.js';
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

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error in sendMessage controller:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
