var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var forwarded = require('forwarded-for');
var path = require('path');
const swipl = require('swipl');



var port = process.env.PORT || 8098;

var learningValues = {}

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set the home page route
app.get('/', function(req, res) {
    var adress = forwarded(req,req.headers);
    console.log(adress);
    res.sendFile(path.join(__dirname +'/public/main.html'));
});

app.post('/',function(req,res){
    var name = req.body.name;
    var numberofPeople = req.body.numberofPeople;
    var vacationType = req.body.vacationType;
    var budget = req.body.budget;
    var relation = req.body.relation;
    console.log("the name is",relation);
    budget = budget.toLowerCase();
    relation = relation.toLowerCase();
    vacationType = vacationType.toLowerCase();
    name = name.toLowerCase();
    
   
     var result = null;
    if(budget !==null && relation !==null && vacationType !== null && name !== null && numberofPeople !== null){
       result = pl(name,numberofPeople);
    }
    
    else{
        console.log("wrong data")
    }
    console.log("results",result);
     res.send(result);

    });

app.listen(port, function() {
    console.log('App runing on http://localhost:' + port);
});


function pl(word,number){
    var parameter = "best("+word+",X).";
    var ret = swipl.call('[prolog/tourg].');
    var classCall = swipl.call('class('+word+',X)');
    if(ret){
        
        if(classCall.X != 'unknown'){
            
            var country;
        
            if (number == 1) {
                country = swipl.call('bestlow(' + word + ',X)').X;
               
            } else {
                country = swipl.call('best(' + word + ',X)').X;
               
            }
            
            return { message: country };
            // var reproduction = swipl.call('reproduction('+word+',X)').X;
            // var breathing = swipl.call('breathingOrgan('+word+',X)').X;

            // word = word.split('_').join(' ');
            // var description = aan+word +" is found in the class "+classCall.X+". "+word+" lives in "+habitat+
            // " habitat. It reproduces by "+reproduction+". And uses "+breathing+" to breath in it's environment."
            // word = word.split(' ').join('_');

            
        }
        else{
            console.log("yollow need to learn",number);

            // learningValues.animalName = word;
            // return {message:"I dont Know what "+aan+word.split('_').join(' ')+" is. Will you help me learn about it?",conID:"learn0"}
        }

    }
    else{
        return {message:"Oops an error Occured!!",conID:"None"}
    }
}

function learn(message,conID){
    var affimitives = ["ok","yes","sure","of_course","y"];
    var cancels = ['pass','cancel','no']
    if(conID==="learn0"){
        if(affimitives.includes(message)){
            return{message:"Great Lets begin!! So Where does this animal live? In a water,land or both",conID:"learn1"}
        }
        else{
            return{message:"May be you will teach me another time.",conID:"None"}
        }
    }

    else if(conID==="learn1"){
        var possibilities = ['water','land','both'];

        if(possibilities.includes(message)){
            learningValues.habitat = message;
            console.log(JSON.stringify(learningValues));
            return{message:"Good. Does "+learningValues.animalName.split('_').join(' ')+" lay eggs or gives birth? Answer:(egg or birth).",conID:"learn2"};
        }
        else if(cancels.includes(message)){
            return{message:"Learning operation canceled",conID:"None"};
        }
        else{
            return{message:"Just choose from the three options (land,water or both). Or send cancel to exit.",conID:"learn1"};
        }

    }
    else if(conID==="learn2"){
        var possibilities = ['eggs','egg','birth'];

        if(possibilities.includes(message)){
            learningValues.reproduction = message;
            console.log(JSON.stringify(learningValues));
            var toSend = null;
            var toCon = null;

            if(learningValues.habitat === "both"){
                toSend = "And finally Is this animal born inside water or on land? answer(water or land)."
                toCon = "learn3"
            }
            else{
                learningValues.bornAt = learningValues.habitat;
                toSend = "We are done!!"
                toCon = "None";
                console.log(JSON.stringify(learningValues));
                learnFromData();
            }
            return{message:toSend,conID:toCon};
        }
        else if(cancels.includes(message)){
            return{message:"Learning operation canceled",conID:"None"};
        }
        else{
            return{message:"Just choose from the two options (egg or birth). Or send cancel to exit.",conID:"learn2"};
        }

    }
    else if(conID==="learn3"){
        var possibilities = ['water','land'];

        if(possibilities.includes(message)){
            learningValues.bornAt = message;
            console.log(JSON.stringify(learningValues));
            learnFromData();
            return{message:"Good Job!! We are done.",conID:"None"};
        }
        else if(cancels.includes(message)){
            return{message:"Learning operation canceled",conID:"None"};
        }
        else{
            return{message:"Just choose from the two options (land or water). Or send cancel to exit.",conID:"learn3"};
        }

    }
    
}

function learnFromData(){
    var animalName = learningValues.animalName;
    animalName = animalName.split(' ').join('_');
    var habitat = learningValues.habitat;
    var reproduction = learningValues.reproduction;
    var bornAt = learningValues.bornAt;

    var prlHabitat = null;
    var prlHabitatAdd = null;
    if(habitat==='land'){
        prlHabitat = "livesLand("+animalName+").";
    }
    else if(habitat==='water'){
        prlHabitat = "livesWater("+animalName+").";
    }
    else{
        prlHabitat = "livesLand("+animalName+").";
        prlHabitatAdd = "livesWater("+animalName+").";
    }

    var blood = null;
    if(habitat==='water' || habitat==='both' && reproduction != "birth"){
        blood = "coldBlooded("+animalName+").";
    }
    else{
        blood = "warmBlooded("+animalName+").";
    }

    var prlReproduction = null;
    if(reproduction==='eggs'|| reproduction==='egg'){
        prlReproduction = "layEggs("+animalName+").";
    }
    else{
        prlReproduction = "givesBirth("+animalName+").";
    }

    var prlBreath = null;
    if(habitat==='water'){
        prlBreath = "gills("+animalName+")."; 
    }
    else{
        prlBreath = "lungs("+animalName+")."; 

    }

    var prlBornAt = null;
    if(bornAt==='water'){
        prlBornAt = "bornInWater("+animalName+").";
    }
    else{
        prlBornAt = "bornInLand("+animalName+").";
    }

    var allValues = [prlHabitat,prlBornAt,prlBreath,prlReproduction,blood];

    if(prlHabitatAdd != null){
        allValues.unshift(prlHabitatAdd);
    }

    console.log(allValues);
    addtoKnowledgeBase(allValues);
}

function addtoKnowledgeBase(data_set){
    const fs = require('fs');
    var file_path = 'prolog/animals.pl';

    fs.readFile(file_path,'utf8',function(err,data){
        if(err){
            console.log(err);
        }
        else{
            var items = data.split('\n');

            for(var j=0;j<data_set.length;j++){
                for(var i=0;i<items.length;i++){
                var currentPredicate = data_set[j].replace(/ *\([^)]*\) */g,"").replace('.','');
                    if(items[i].indexOf(currentPredicate)>-1){
                        items.splice(i,0,data_set[j]);
                        break;
                    }
                }
            }

        
            var output = items.join('\n');
            fs.writeFileSync(file_path,output);
            console.log('New animal added to knowledge base');
        }
    });

}