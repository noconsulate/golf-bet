-- ** need to check to see if anyone else has forfeit

create or replace function forfeit_match(score_id uuid, OUT success bool)
language plpgsql
as $$
declare 
	user_id_ret uuid;
begin
	select player_id
    from score
    where id = score_id
    into user_id_ret;
    
	update users
    set active_match = null
    where id = user_id_ret;
    
    update score
    set forfeited = true
    where id = score_id;
    
    success = true;
end;
$$
    
