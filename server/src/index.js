import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from the server')
});

app.post('/make_winner/:matchId', (req, res) => {
  const matchId = req.params.matchId;
  return res.send('make winner resource ' + matchId)
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`)
});
