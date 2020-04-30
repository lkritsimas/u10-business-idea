import express from 'express';
import cors from 'cors';

const app: express.Application = express();

// Cross-origin resource sharing
app.use(cors());

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello! This site will be a tinder app for developers. Stay tuned!');
});

app.listen(5000, () => {
  console.log('Dev app listening on port 5000!');
});
