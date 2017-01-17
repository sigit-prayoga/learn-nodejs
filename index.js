var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Hello there!');
});

app.listen(8787, function(err, success){
    if(!err){
        console.log('Listening to 8787...');
    };
});