DELETE FROM tennisschema.players;

INSERT INTO tennisschema.players (PlayerID, FirstName, LastName, Rankings, Points, Age, MatchID) VALUES (1000, 'Novak', 'Djokovic', 1, 230, 36, 12);
INSERT INTO tennisschema.players (PlayerID, FirstName, LastName, Rankings, Points, Age, MatchID) VALUES (1001, 'Carlos', 'Alcaraz', 2, 429, 20, 13);
INSERT INTO tennisschema.players (PlayerID, FirstName, LastName, Rankings, Points, Age, MatchID) VALUES (1002, 'Jannik', 'Sinner', 3, 123, 22, 14);
INSERT INTO tennisschema.players (PlayerID, FirstName, LastName, Rankings, Points, Age, MatchID) VALUES (1003, 'Holger', 'Rune', 4, 44, 20, 15);
INSERT INTO tennisschema.players (PlayerID, FirstName, LastName, Rankings, Points, Age, MatchID) VALUES (1004, 'Taylor', 'Fritz', 5, 127, 26, 16);
INSERT INTO tennisschema.players (PlayerID, FirstName, LastName, Rankings, Points, Age, MatchID) VALUES (1005, 'Roger', 'Federer', 6, 49, 42, 17);
INSERT INTO tennisschema.players (PlayerID, FirstName, LastName, Rankings, Points, Age, MatchID) VALUES (1006, 'Rafael', 'Nadal', 7, 0, 38, 18);
INSERT INTO tennisschema.players (PlayerID, FirstName, LastName, Rankings, Points, Age, MatchID) VALUES (1007, 'Ritik', 'Singh', 8, 45, 21, 19);
INSERT INTO tennisschema.players (PlayerID, FirstName, LastName, Rankings, Points, Age, MatchID) VALUES (1008, 'Daniil', 'Medvedev', 9, 0, 27, 19);
INSERT INTO tennisschema.players (PlayerID, FirstName, LastName, Rankings, Points, Age, MatchID) VALUES (1009, 'Karue', 'Sell', 10, 40, 34, 18);
INSERT INTO tennisschema.players (PlayerID, FirstName, LastName, Rankings, Points, Age, MatchID) VALUES (1010, 'Felix', 'Mischker', 11, 0, 20, 17);
INSERT INTO tennisschema.players (PlayerID, FirstName, LastName, Rankings, Points, Age, MatchID) VALUES (1011, 'Marcos', 'Giron', 12, 0, 29, 16);
INSERT INTO tennisschema.players (PlayerID, FirstName, LastName, Rankings, Points, Age, MatchID) VALUES (1012, 'Andrey', 'Rublev', 13, 0, 26, 15);
INSERT INTO tennisschema.players (PlayerID, FirstName, LastName, Rankings, Points, Age, MatchID) VALUES (1013, 'Hubert', 'Hurcackz', 14, 0, 26, 14);
INSERT INTO tennisschema.players (PlayerID, FirstName, LastName, Rankings, Points, Age, MatchID) VALUES (1014, 'Grigor', 'Dimitrov', 15, 0, 32, 13);
INSERT INTO tennisschema.players (PlayerID, FirstName, LastName, Rankings, Points, Age, MatchID) VALUES (1015, 'Gage', 'Brymer', 16, 0, 28, 12);


DELETE FROM tennisschema.tournaments;
INSERT INTO tennisschema.tournaments (tournamentID, duration, winner, location) VALUES (24, 14, '1005', 'Paris');
INSERT INTO tennisschema.tournaments (tournamentID, duration, winner, location) VALUES (30, 10, '1001', 'Indian Wells');

DELETE FROM tennisschema.matches;
INSERT INTO tennisschema.matches (MatchID, winner, loser, points, duration, location, postponed, withdrew, prizemoney, tournamentID) VALUES (12, 1000, 1015, 50, 104, 'Court 5', 0, 0, 2000, 24);
INSERT INTO tennisschema.matches (MatchID, winner, loser, points, duration, location, postponed, withdrew, prizemoney, tournamentID) VALUES (13, 1001, 1014, 45, 122, 'Court 7', 0, 0, 1500, 24);
INSERT INTO tennisschema.matches (MatchID, winner, loser, points, duration, location, postponed, withdrew, prizemoney, tournamentID) VALUES (14, 1002, 1013, 42, 110, 'Court 2', 0, 0, 1600, 24);
INSERT INTO tennisschema.matches (MatchID, winner, loser, points, duration, location, postponed, withdrew, prizemoney, tournamentID) VALUES (15, 1003, 1012, 44, 148, 'Court 0', 0, 0, 1550, 24);
INSERT INTO tennisschema.matches (MatchID, winner, loser, points, duration, location, postponed, withdrew, prizemoney, tournamentID) VALUES (16, 1004, 1011, 47, 130, 'Court 4', 0, 0, 1600, 24);
INSERT INTO tennisschema.matches (MatchID, winner, loser, points, duration, location, postponed, withdrew, prizemoney, tournamentID) VALUES (17, 1005, 1010, 49, 128, 'Court 3', 0, 0, 1530, 24);
INSERT INTO tennisschema.matches (MatchID, winner, loser, points, duration, location, postponed, withdrew, prizemoney, tournamentID) VALUES (18, 1009, 1006, 40, 135, 'Court 6', 0, 1, 1800, 24);
INSERT INTO tennisschema.matches (MatchID, winner, loser, points, duration, location, postponed, withdrew, prizemoney, tournamentID) VALUES (19, 1007, 1008, 45, 117, 'Court 1', 0, 1, 1700, 24);

INSERT INTO tennisschema.matches (MatchID, winner, loser, points, duration, location, postponed, withdrew, prizemoney, tournamentID) VALUES (20, 1000, 1007, 80, 131, 'Court 0', 0, 0, 3100, 24);
INSERT INTO tennisschema.matches (MatchID, winner, loser, points, duration, location, postponed, withdrew, prizemoney, tournamentID) VALUES (21, 1001, 1009, 82, 122, 'Court 1', 0, 0, 3000, 24);
INSERT INTO tennisschema.matches (MatchID, winner, loser, points, duration, location, postponed, withdrew, prizemoney, tournamentID) VALUES (22, 1002, 1005, 81, 144, 'Court 2', 0, 0, 3200, 24);
INSERT INTO tennisschema.matches (MatchID, winner, loser, points, duration, location, postponed, withdrew, prizemoney, tournamentID) VALUES (23, 1004, 1003, 80, 138, 'Court 3', 0, 0, 3100, 24);

INSERT INTO tennisschema.matches (MatchID, winner, loser, points, duration, location, postponed, withdrew, prizemoney, tournamentID) VALUES (24, 1000, 1004, 100, 100, 'Court 0', 0, 0, 5000, 24);
INSERT INTO tennisschema.matches (MatchID, winner, loser, points, duration, location, postponed, withdrew, prizemoney, tournamentID) VALUES (25, 1001, 1002, 102, 170, 'Court 0', 0, 0, 5100, 24);

INSERT INTO tennisschema.matches (MatchID, winner, loser, points, duration, location, postponed, withdrew, prizemoney, tournamentID) VALUES (26, 1001, 1000, 200, 163, 'Court 0', 0, 0, 10000, 24);

select SUM(points)
    from matches m
    where m.tournamentID = 24;
set @totalPoints = 0;
CALL points_awarded(24);
select @totalPoints;
CALL GetOrderCountByStatus('Shipped',@total);
SELECT @total;














