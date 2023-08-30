% %weather
% summer(sunny).
 autum(australia).
% winter(cold).
spring(europe).
summer(africa).
winter(america).
all(asia).

% % number of people
% number(1).
% number(2).
% number(3).
singlenumber(africa).
singlenumber(america).
doublenumber(australia).
doublenumber(asia).
doublenumber(europe).

% % lowbudget
% lowbudget(1000).
% lowbudget(10000).
lowbudget(africa).
lowbudget(america).



% % highbudget

% highbudget(100000).
% highbudget(1000000).
highbudget(australia).
highbudget(asia).
highbudget(europe).
highbudget(america).

% relation


% Vacation type






africa(X) :- summer(X),singlenumber(X),lowbudget(X).

asia(X):- all(X),doublenumber(X),highbudget(X).

europe(X):- spring(X),doublenumber(X),highbudget(X).

america(X):- winter(X),singlenumber(X),highbudget(X).

australia(X):- autum(X),doublenumber(X),highbudget(X).

class(X,Y):-(africa(X),Y=africa),!;
            (asia(X),Y=asia),!;
            (europe(X),Y=europe),!;
            (america(X),Y=america),!;
            (australia(X),Y=australia),!;
            (Y='unknown').

best(X,Y):-  (autum(X),highbudget(X),doublenumber(X),Y='australia'),!;
                (summer(X),lowbudget(X),Y=kenya),!;
                (winter(X),Y=china).

bestlow(X,Y):-  (summer(X),lowbudget(X),singlenumber(X),Y='Tanzania'),!;
                (winter(X),highbudget(X),singlenumber(X),Y=usa),!;
                (winter(X),lowbudget(X),Y=china).


% reproduction(X,Y):- (layEggs(X),Y='laying eggs'),!;
%                     (givesBirth(X),Y='giving birth').

% breathingOrgan(X,Y):-   lungs(X),Y=lungs,!;
%                         gills(X),Y=gills.

% bodyHeat(X,Y):- warmBlooded(X),Y='warm blooded',!;
%                 coldBlooded(X),y='cold blooded'.

% birthPlace(X,Y):- bornInLand(X),Y='land',!;
%                   bornInWater(X),Y='water'.

