const fs = require('fs');
const express = require('express');

const app = express();

var elemento = ['x','o','o','o','o','x','x','x','o',];

app.get('/', function(req, res) {
  fs.readFile('index.html', 'utf-8', function(err, data) {
    var quadrado = `
        <a href="/">
            <div class="quadrado">{{ELEMENTO}}</div>
        </a>`;

    var geral = [   quadrado, quadrado, quadrado,
                    quadrado, quadrado, quadrado,   
                    quadrado, quadrado, quadrado ];

    for(i=0; i<9; i++){
        console.log(geral[i]);
        geral[i] = geral[i].replace('{{ELEMENTO}}', elemento[i]);
        data = data.replace(`{{QUADRADO${i}}}`, geral[i]);
    }
    res.send(data);
  });
});

app.listen(3000);
