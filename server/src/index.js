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
  
  const { data, error } = await supabase
    .from('match')
    .select()
    .match({id: matchId})

  console.log (data, error);

  return res.send('make winner resource ' + matchId)
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`)
});
