

% Define location options and their attributes
location(beach,  low,  family,       2,  mexico).
location(beach,  low,  couple,       2,  thailand).
location(beach,  low,  friends,      4,  greece).
location(beach,  high, family,       4,  hawaii).
location(beach,  high, couple,       2,  maldives).
location(beach,  high, friends,      6,  bali).

location(mountain, low,  family,       3,  switzerland).
location(mountain, low,  couple,       2,  austria).
location(mountain, low,  friends,      5,  canada).
location(mountain, high, family,       5,  colorado).
location(mountain, high, couple,       2,  new_zealand).
location(mountain, high, friends,      8,  japan).

location(city,    low,  family,       4,  prague).
location(city,    low,  couple,       2,  budapest).
location(city,    low,  friends,      6,  barcelona).
location(city,    high, family,       5,  paris).
location(city,    high, couple,       2,  rome).
location(city,    high, friends,      8,  tokyo).

% Predicate to select a location based on criteria
select_location(Budget, VacationType, NumberOfPeople, Relation, Location) :-
    location(Type, Budget, VacationType, NumPeople, Location),
    NumPeople >= NumberOfPeople,
    suitable_relation(Type, Relation).

% Predicate to determine if the location is suitable for the given relation
suitable_relation(Type, family)    :- Type = beach ; Type = mountain ; Type = city.
suitable_relation(Type, couple)    :- Type = beach ; Type = mountain ; Type = city.
suitable_relation(Type, friends)   :- Type = beach ; Type = mountain ; Type = city.

% Sample query: select_location(low, couple, 2, friends, Location).
% This query will suggest a suitable location for a low budget, couple, 2 friends.
