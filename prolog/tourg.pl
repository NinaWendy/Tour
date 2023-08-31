%continent & season
africa(summer).
europe(autum).
asia(winter).
america(spring).

%number of people
singlenumber(spring).
doublenumber(autum).
manynumber(winter).
manynumber(summer).


% Low Budget
lowbudget(summer).
lowbudget(winter).


%High Budget
highbudget(autum).
highbudget(spring).

% relation


% Vacation type


summer(X) :- africa(X),manynumber(X),lowbudget(X).

winter(X):- asia(X),manynumber(X),lowbudget(X).

autum(X):- europe(X),doublenumber(X),highbudget(X).

spring(X):- america(X),singlenumber(X),highbudget(X).


class(X,Y):-(summer(X),Y=africa),!;
            (winter(X),Y=asia),!;
            (autum(X),Y=europe),!;
            (spring(X),Y=america),!;
            (Y='unknown').

best(X,Y):-  (africa(X),lowbudget(X),manynumber(X),Y='Kenya'),!;
                (europe(X),highbudget(X),doublenumber(X),Y='Paris'),!;
                (asia(X),lowbudget(X),manynumber(X),Y='Shanghai').

bestlow(X,Y):-  (america(X),highbudget(X),singlenumber(X),Y='Las Vegas').
