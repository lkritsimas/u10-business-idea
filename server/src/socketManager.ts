import { Messages } from './types/messages';
import models from './db/models';
import io from './app';

const socketManager = (socket: any) => {
  console.log('New client connected');

  socket.on('subscribe', async (matchId: string) => {
    console.log('Joining ', matchId);

    socket.join(matchId);

    const messages = await models.messages.findAll({
      where: { matchId },
      limit: 100,
      order: [['updatedAt', 'ASC']],

    });

    io.in(matchId).emit('messageHistory', messages);

    socket.on('message', async (data: Messages) => {
      const {
        matchId,
        fromUserId,
        toUserId,
        message,
      // readAt,
      } = data;

      // const match = await models.messages.findAll({
      //   where: { matchId },
      // });

      const chatMessage = await models.messages.create({
        matchId,
        fromUserId,
        toUserId,
        message,
      // readAt,
      });

      io.in(matchId).emit('newMessage', chatMessage);
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
};

export default socketManager;
