const fs = require('fs');
const express = require('express');

const app = express();

var elemento = [
    ['','',''],
    ['','',''],
    ['','','']
]

app.get('/', function(req, res) {
  fs.readFile('index.html', 'utf-8', function(err, data) {
    var quadrado = `
        <a href="/">
            <div class="quadrado"></div>
        </a>`;

    var geral = [   quadrado, quadrado, quadrado,
                    quadrado, quadrado, quadrado,   
                    quadrado, quadrado, quadrado ];

    for(i=1; i<=9; i++){
        elementos = '';
        // for(j=1; j<=elemento[i].length; j++){
        //     elementos
        // }
        data = data.replace(`{{QUADRADO${i}}}`, geral[i-1]);
    }
    res.send(data);
  });
});

app.listen(3000);
