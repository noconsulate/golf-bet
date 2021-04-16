import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
const supabase = createClient(process.env.SUPABASE_URI, process.env.SUPABASE_KEY);

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from the server')
});

app.post('/make_winner/:matchId', async (req, res) => {
  const matchId = req.params.matchId;
  
 let result  = await supabase
    .from('match')
    .select('scores')
    .match({id: matchId})

  console.log (result);

  const scores = result.data[0].scores
  console.log(scores)
  let participants = [];

  return res.send('make winner resource ' + matchId)
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`)
});
