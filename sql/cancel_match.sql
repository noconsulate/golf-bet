CREATE OR REPLACE FUNCTION join_match (match_id text, player_id uuid, out score_id uuid, out players_joined_out int)
LANGUAGE plpgsql
AS $
$ DECLARE match_rec record;

my_player_num int;

score_id_ret uuid;

scores_var uuid[];

participants_var uuid[];

user_balance int8;

BEGIN
    -- get info from match
    SELECT
        players,
        points,
        players_joined,
        scores,
        participants,
        balance,
        status
    FROM
        MATCH
    WHERE
        id = match_id INTO match_rec;

-- match has cancelled
IF match_rec.status = 'cancelled' THEN
    score_id = '00000000-0000-0000-0000-000000000000';

players_joined_out = 8;

ELSE
    -- get user balance
    SELECT
        balance
    FROM
        users
    WHERE
        id = player_id INTO user_balance;

IF user_balance < match_rec.balance THEN
    RAISE EXCEPTION 'insufficient user balance';

END IF;

-- if there's room in the game, continue
IF match_rec.players_joined < match_rec.players THEN
    -- check, new player is unique
    IF ARRAY[player_id] < @ match_rec.participants THEN
        RAISE EXCEPTION 'player already joined';

END IF;

-- trasfer tokens
UPDATE
    users
SET
    balance = balance - match_rec.points
WHERE
    id = player_id;

UPDATE
    MATCH
SET
    balance = balance + match_rec.points
WHERE
    id = match_id;

my_player_num = match_rec.players_joined + 1;

players_joined_out = my_player_num;

-- create new scores row
INSERT INTO score (match_id, player_num, player_id)
    VALUES (match_id, my_player_num, player_id)
RETURNING
    id INTO score_id_ret;

score_id = score_id_ret;

UPDATE
    users
SET
    active_score = score_id_ret
WHERE
    id = player_id;

UPDATE
    users
SET
    active_match = match_id
WHERE
    id = player_id;

-- update players_joined in match
UPDATE
    MATCH
SET
    players_joined = my_player_num
WHERE
    id = match_id;

--update scores list in match
scores_var = array_append(match_rec.scores, score_id_ret);

UPDATE
    MATCH
SET
    scores = scores_var
WHERE
    id = match_id;

-- update participants list in match
participants_var = array_append(match_rec.participants, player_id);

UPDATE
    MATCH
SET
    participants = participants_var
WHERE
    id = match_id;

ELSE
    score_id = '00000000-0000-0000-0000-000000000000';

players_joined_out = 9;

END IF;

END IF;

END $ $
