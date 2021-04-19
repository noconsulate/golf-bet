create or replace procedure transfer_match(user_id uuid, match_id text, amount int) 
language plpgsql
as $$
begin

	update users
    set balance = balance - amount
    where id = user_id;

	update match
    set balance = balance + amount
    where id = match_id;
    
 	commit;
end; $$
