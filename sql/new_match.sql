CREATE OR REPLACE FUNCTION new_match (players integer, points integer, is_18_holes boolean, is_classic_scoring boolean, creator uuid, out match_id text, out score_id uuid)
-- returns integer
LANGUAGE plpgsql
AS $$
DECLARE
  match_id_ret text;
  score_id_ret uuid;
  points_to_transfer int8 = points;
  player_balance int8;
BEGIN
  -- check player has enough tokens
  SELECT
    balance
  FROM
    users
  WHERE
    id = creator INTO player_balance;
  IF player_balance < points_to_transfer THEN
    RAISE EXCEPTION 'not enough tokens';
  END IF;
  INSERT INTO MATCH (players, points, is_18_holes, is_classic_scoring, creator, players_joined)
    VALUES (players, points, is_18_holes, is_classic_scoring, creator, 1)
  RETURNING
    id INTO match_id_ret;
  match_id = match_id_ret;
  -- create score
  INSERT INTO score (match_id, player_num, player_id)
    VALUES (match_id, 1, creator)
  RETURNING
    id INTO score_id_ret;
  score_id = score_id_ret;
  UPDATE
    users
  SET
    active_score = score_id_ret
  WHERE
    id = creator;
  -- insert score row id into match
  UPDATE
    MATCH
  SET
    scores = ARRAY[score_id_ret]
  WHERE
    id = match_id_ret;
  -- activate match
  UPDATE
    users
  SET
    active_match = match_id_ret
  WHERE
    id = creator;
  -- transfer tokens
  UPDATE
    MATCH
  SET
    balance = balance + points_to_transfer
  WHERE
    id = match_id_ret;
  UPDATE
    users
  SET
    balance = balance - points_to_transfer
  WHERE
    id = creator;
  -- set status
  UPDATE
    MATCH
  SET
    status = 'waiting'
  WHERE
    id = match_id_ret;
  -- set to player 1
  UPDATE
    users
  SET
    player_num = 1
  WHERE
    id = creator;
END;
$$;

