var express = require('express');
const fs=require('fs')
var app= express();

var routes =['/movies','/sports','/politics','/date']

var getDate = function (req, res, next) {
    req.timestamp = Date();
    next();
  }

app.use(getDate);


app.get('/', function(req, res) {
    res.writeHead(200,{'Content-type':'text/html'})
    fs.readFile('home.html',function(error,data){
        if(error){
            res.writeHead(404)
            res.write('file not found')
        }
        else{
            res.write(data)
        }
        res.end();
    })
} )


app.get('/:topic', function(req, res) {
    console.log(req.params.topic)
    if (routes.indexOf(req.url) !== -1){

        if (req.params.topic==='date'){
            var responseText = '<h4>The timestamp stored by the Middleware function (getDate) in the request</h4>'
            responseText += req.timestamp 
            res.send(responseText)  
        }
        else{
            res.writeHead(200,{'Content-type':'text/html'})
            file=req.params.topic+'.html'
            fs.readFile(file,function(error,data){
                if(error){
                    res.writeHead(404)
                    res.write('file not found')
                }
                else{
                    res.write(data)
                }
                res.end();
            })
        }

    }
    else{
        res.send("Page not found, check the URL");
    }
} )


var server= app.listen(3000,function(){
    console.log('serving port',server.address().port);

})