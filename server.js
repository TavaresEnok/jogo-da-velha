const fs = require('fs');
const express = require('express');

const app = express();

app.get('/', function(req, res) {
  fs.readFile('index.html', 'utf-8', function(err, data) {
    var quadrado = `
        <a href="/">
            <div class="quadrado"></div>
        </a>`;
    for (i = 1; i <= 9; i++) {
        quadrado;
    }
    data = data.replace(/{{QUADRADO1}}/, quadrado);
    data = data.replace(/{{QUADRADO2}}/, quadrado);
    data = data.replace(/{{QUADRADO3}}/, quadrado);
    data = data.replace(/{{QUADRADO4}}/, quadrado);
    data = data.replace(/{{QUADRADO5}}/, quadrado);
    data = data.replace(/{{QUADRADO6}}/, quadrado);
    data = data.replace(/{{QUADRADO7}}/, quadrado);
    data = data.replace(/{{QUADRADO8}}/, quadrado);
    data = data.replace(/{{QUADRADO9}}/, quadrado);
    res.send(data);
  });
});

app.listen(3000);
