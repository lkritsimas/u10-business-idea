import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import socketIo from 'socket.io';
import http from 'http';
import { emit } from 'cluster';
import * as config from '../config/app.json';
import routes from './routes';
import { Messages } from './types/messages';
import models from './db/models';

dotenv.config();
const app: express.Application = express();

/* Config */
app.set('port', process.env.PORT || config.port);
app.use(cors()); // Cross-origin resource sharing
app.use(express.json()); // Parse incoming JSON

/* API */
app.use('/api/v1', routes);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello! This site will be a tinder app for developers. Stay tuned!');
});


/* SocketIO */
const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', (socket: any) => {
  console.log('New client connected');

  socket.on('matches', async (userId: string) => {
    console.log('Viewed matches');
    // await socket.join(userId);

    // const matches = await models.profiles.findOne({
    //   where: { userId },
    //   include: [
    //     { model: models.users },
    //   ],
    // });

    const matches = await models.profiles.findAll({
      where: { userId },
      include: [
        { model: models.users },
        { model: models.messages },
      ],
    });

    // socket.in(userId).emit('matches', matches);
    socket.emit('matches', matches);
  });

  socket.on('subscribe', async (matchId: string) => {
    console.log('Joining ', matchId);
    socket.join(matchId);

    const messages = await models.messages.findAll({
      where: { matchId },
      order: [['createdAt', 'DESC']],
      limit: 10,
    });

    io.in(matchId).emit('messageHistory', messages);
  });

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

    const newMessage = await models.messages.create({
      matchId,
      fromUserId,
      toUserId,
      message,
      // readAt,
    });


    io.in(matchId).emit('message', newMessage);
    // io.emit('message', data.message);
  });


  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

models.sequelize.sync({}).then(() => {
  server.listen(config.port, () => console.log(`Listening on port ${config.port}`));
});
