//import alert from alert-node
//var popupS = require('popups');
var JSAlert = require("js-alert");
const express =require('express');
const app = express();
var url = require('url');
var bodyParser = require('body-parser');
const { parse } = require('querystring');

app.get('/', (req,res) => {
    res.header("Access-Control-Allow-Origin", '*'); 

res.send([

    {"name": "ganesh","passward":"admin"},
    {"name": "karthik","passward":"apple123"},
    {"name": "puneeth","passward":"puneeth"}
    
    ]);
});

app.get('/home', (req,res) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.setHeader('Content-Type', 'application/json');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query.quizName;
    console.log(query);
    switch(query)
    {

        case 'data/music.json':res.send( require('fs').readFileSync('music.json', 'utf8') );
        case 'data/sports.json': res.send( require('fs').readFileSync('sports.json', 'utf8') );
        case 'data/history.json': res.send(require('fs').readFileSync('history.json','utf8'));
        case 'data/science.json':res.send(require('fs').readFileSync('science.json','utf8'));
  
    }
    
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(bodyParser.json());
  app.post('/score', (req,res) => {
    console.log(req.body); 
    // var jsonRequest = req.body;
    // var jsonResponse = {};

    // jsonResponse.result = jsonRequest.quizQuestions + jsonRequest.timeOut +jsonRequest.answers;
    var quizQuestions = req.body[0]["quizQuestions"];
    var timeOut = req.body[0]["timeOut"];
    var answers = req.body[0]["answers"];
    console.log("Response",quizQuestions);
    console.log("***************************************")
    console.log("Response2",timeOut);
    console.log("***************************************")
    console.log("Response3",answers);


    let attempted = 0;
    let score = 0;
    var mode;
    let wrong = 0;
    var scoredOnce = false;


    // for (const key in quizQuestions) {
    //   if (quizQuestions.hasOwnProperty(key)) {
    //     const element = quizQuestions[key];
    //     for (const iterator of element.options) {
    //       if(iterator.selected){
    //         attempted++;
    //       }
    //     }
    //   }
    // }

    // console.log("Attempted",attempted);


    if(!timeOut){
      if (answers.length == attempted){
        mode = 'result';

        for (const key in quizQuestions) {
          if (quizQuestions.hasOwnProperty(key)) {
            const element = quizQuestions[key];
            for (const iterator of element.options) {
              if(iterator.selected && iterator.isAnswer){
                score++;
              }
            }
          }
        }
        wrong = answers.length-score;
        console.log('correct:', score, 'Incorrect:', wrong);
        scoredOnce=true;
      }
      else {
      console.log("Attempt all questions");
      // error: {
      //   alert("hgjkl");
      // }
        //alert("Attempt all questions");
         JSAlert.alert("This is an alert.");
         //res.send('<script>alert("Hello")</script>')
        // popupS.alert({
        //   content: 'error'
        // });

      }
    }


    else{
      if(!scoredOnce){
      for (const key in quizQuestions) {
        if (quizQuestions.hasOwnProperty(key)) {
          const element = quizQuestions[key];
          for (const iterator of element.options) {
            if(iterator.selected && iterator.isAnswer){
              score++;
            }
          }
        }
      }
      wrong = answers.length-score;
      scoredOnce=true;
    }
    mode = 'result';


    }
    jsonResult={"score":score,"wrong":wrong}
    console.log(jsonResult);

    res.send(jsonResult);
    
});

app.listen(3000);
console.log("listening on port 3000");