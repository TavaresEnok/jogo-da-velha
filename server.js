const fs = require('fs');
const express = require('express');

const app = express();

var arrayElementos = ['','','','','','','','',''];

cont = 1;

app.get('/', function(req, res) {
    var divClicada = req.query['div'];
  fs.readFile('index.html', 'utf-8', function(err, data) {
    var quadrado = `
        <a href="/?div={{INDICE}}">
            <div class="quadrado">{{ELEMENTO}}</div>
        </a>`;

    var geral = [   quadrado, quadrado, quadrado,
                    quadrado, quadrado, quadrado,   
                    quadrado, quadrado, quadrado ];
    
    for(i=0; i<9; i++){
        if(i == divClicada){
            if(cont%2!=0){
                arrayElementos[i] = 'x';
                cont++;
            }else{
                arrayElementos[i] = 'o';
                cont++;
            }
        }
        geral[i] = geral[i].replace('{{INDICE}}', i);
        geral[i] = geral[i].replace('{{ELEMENTO}}', arrayElementos[i]);
        console.log(i == divClicada);
        data = data.replace(`{{QUADRADO${i}}}`, geral[i]);
    }
    res.send(data);
  });
});

app.listen(3000);
