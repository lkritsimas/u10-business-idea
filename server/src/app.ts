import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import socketIo from 'socket.io';
import http from 'http';
import * as config from '../config/app.json';
import routes from './routes';
import socketManager from './socketManager';

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

/* SocketIo */
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socketManager);


server.listen(config.port, () => console.log(`Listening on port ${config.port}`));

export default io;
