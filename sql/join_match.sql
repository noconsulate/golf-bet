create or replace function join_match(
  match_id text, 
  player_id uuid,
  out score_id uuid,
  out players_joined_out int
)

language plpgsql
as $$
declare
match_rec record;
my_player_num int;
score_id_ret uuid;
scores_var uuid[];
participants_var uuid[];
user_balance int8;
begin
	-- get info from match
	select players, points, players_joined, scores, participants, balance
    from match
    where id = match_id
    into match_rec;
    
    -- get user balance
    select balance
    from users
    where id = player_id
    into user_balance;
    
    if user_balance < match_rec.balance then
    	raise exception 'insufficient user balance';
    end if;
    
    -- if there's room in the game, continue
    
    if match_rec.players_joined < match_rec.players then 	
    
    	-- check, new player is unique
    	if array[player_id] <@ match_rec.participants then
        	raise exception 'player already joined';
        end if;
        
        -- trasfer tokens
        update users
        set balance = balance - match_rec.points
        where id = player_id;
        
        update match
        set balance = balance + match_rec.points
        where id = match_id;
    
    	my_player_num = match_rec.players_joined + 1;
        players_joined_out = my_player_num;
        
        -- create new scores row
        insert into score(match_id, player_num, player_id)
        values(match_id, my_player_num, player_id)
        returning id into score_id_ret;
    
    	score_id = score_id_ret;
        
        update users
        set active_score = score_id_ret
        where id = player_id;
        
        update users
        set active_match = match_id
        where id = player_id;
        
        -- update players_joined in match 
        update match
        set players_joined = my_player_num
        where id = match_id;
        
        --update scores list in match
        scores_var = array_append(match_rec.scores, score_id_ret);
        update match
        set scores = scores_var
        where id = match_id;
        
        -- update participants list in match
        participants_var = array_append(match_rec.participants, player_id);
        update match
        set participants = participants_var
        where id = match_id;
		    
  	else
    	score_id = 0;
    end if;
    
end
$$
