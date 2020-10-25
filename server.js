const fs = require('fs');
const express = require('express');

const app = express();

app.get('/', function(req, res) {
  fs.readFile('index.html', 'utf-8', function(err, data) {
    console.log('teste');
    res.send(data);
  });
});

app.listen(3000);
