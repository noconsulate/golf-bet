-- ** need to check to see if anyone else has forfeit
-- ** needs a lot of work
CREATE OR REPLACE FUNCTION forfeit_match (score_id uuid, OUT success bool)
LANGUAGE plpgsql
AS $$
DECLARE
    user_id_ret uuid;
BEGIN
    SELECT
        player_id
    FROM
        score
    WHERE
        id = score_id INTO user_id_ret;
    UPDATE
        users
    SET
        active_match = NULL
    WHERE
        id = user_id_ret;
    UPDATE
        score
    SET
        forfeited = TRUE
    WHERE
        id = score_id;
    success = TRUE;
END;
$$
