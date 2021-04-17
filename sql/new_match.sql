create or replace function new_match(
  players integer,
  points integer,
  is_18_holes boolean,
  is_classic_scoring boolean,
  creator uuid,
  
  out match_id text,
  out score_id uuid
)
-- returns integer
language plpgsql
as $$
declare
  match_id_ret text;
  score_id_ret uuid;
 
begin
  insert into match(players, points, is_18_holes, is_classic_scoring, creator, players_joined)
  values(players, points, is_18_holes, is_classic_scoring, creator, 1)
  returning id into match_id_ret;

  match_id = match_id_ret;
  
  -- create score
  
  insert into score(match_id, player_num, player_id)
  values(match_id, 1, creator)
  returning id into score_id_ret;
  
  score_id = score_id_ret;
  
  -- insert score row id into match
  
  insert into match(scores)
  values( array[score_id_ret]);

end; $$;
