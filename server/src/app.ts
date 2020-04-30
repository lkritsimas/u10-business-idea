import express from 'express';
import cors from 'cors';
import * as config from './config/app.json';

const app: express.Application = express();

// Cross-origin resource sharing
app.use(cors());

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello! This site will be a tinder app for developers. Stay tuned!');
});

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
