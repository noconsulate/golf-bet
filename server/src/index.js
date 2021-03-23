import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import routes from './routes'

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes

app.use('/games', routes.game)

app.listen(process.env.PORT, () => {
  console.log('Listening on ' + process.env.PORT)
})