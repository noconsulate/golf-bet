create or replace function cancel_match(player_id uuid, OUT success bool)
language plpgsql as $$
declare
	match_id text;
    score_id uuid;
	match_rec record;
--     participants uuid[];
    target uuid;
begin
	select active_match, active_score
    from users
    into match_id, score_id
    where id = player_id;
    
--     select active_score
--     from users
--     into score_id
--     where id = player_id;

	select players, players_joined, creator, participants, scores, points
    from match
    where id = match_id
    into match_rec;
    
    if match_rec.players_joined < match_rec.players then
    	-- if player_id is creator, remove entire match
        if match_rec.creator = player_id then
        	update users
            set balance = balance + match_rec.points
            where id = player_id;
            
            update match
            set balance = balance - match_rec.points
            where id = match_id;
            
            update users
            set active_match = null
            where id = player_id;
            
            update users
            set active_score = null
            where id = player_id;
            
            update score
            set status = 'cancel'
            where id = score_id;
            
            if match_rec.players_joined > 1 then
                      
            foreach target in array match_rec.participants
            loop
            	update users
                set balance = balance + match_rec.points
                where id = target;
                
                update match
                set balance = balance - match_rec.points
                where id = match_id;
                
                update users
                set active_match = null
                where id = target;
                
                update users
                set active_score = null
                where id = target;
            end loop;
            
            foreach target in array match_rec.scores
            loop
            	update score
                set status = 'cancel'
                where id = target;
            end loop;
            
            update match
            set status = 'cancelled'
            where id = match_id;
            
            end if;
            
          
         
         -- player is not creator
         else
         	update users
            set balance = balance + match_rec.points
            where id = player_id;
            
            update match
            set balance = balance - match_rec.points
            where id = match_id;
            
            update users
            set active_match = null
            where id = player_id;
            
            update users
            set active_score = null
            where id = player_id;
            
            update match
            set participants = array_remove(match_rec.participants, player_id)
            where id = match_id;
            
            update match
            set scores = array_remove(match_rec.scores, score_id)
            where id = match_id;
            
            delete from score
            where id = score_id;
            
            update match set players_joined = players_joined - 1
            where id = match_id;
            
        end if;
    
    	success = true;
    
    else
    	success = false;
    end if;
    	
    
end;
$$
