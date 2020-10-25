const fs = require('fs');
const express = require('express');

const app = express();

arrayElementos = ['0','1','2','3','4','5','6','7','8'];

finish = false;

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
            if(arrayElementos[i] == 'x' || arrayElementos[i] == 'o'){
                geral[i] = geral[i].replace('{{ELEMENTO}}', arrayElementos[i]);
            }else{
                geral[i] = geral[i].replace('{{ELEMENTO}}', '');
            }
            data = data.replace(`{{QUADRADO${i}}}`, geral[i]);
        }
        
        //Condições de vitória
        if(arrayElementos[1] != '' && arrayElementos[0] == arrayElementos[1] && arrayElementos[1] == arrayElementos[2]){
            finish = true;
        }else if(arrayElementos[4] != '' && arrayElementos[3] == arrayElementos[4] && arrayElementos[4] == arrayElementos[5]){
            finish = true;
        }else if(arrayElementos[7] != '' && arrayElementos[6] == arrayElementos[7] && arrayElementos[7] == arrayElementos[8]){
            finish = true;
        }else if(arrayElementos[3] != '' && arrayElementos[0] == arrayElementos[3] && arrayElementos[3] == arrayElementos[6]){
            finish = true;
        }else if(arrayElementos[4] != '' && arrayElementos[1] == arrayElementos[4] && arrayElementos[4] == arrayElementos[7]){
            finish = true;
        }else if(arrayElementos[5] != '' && arrayElementos[2] == arrayElementos[5] && arrayElementos[5] == arrayElementos[8]){
            finish = true;
        }else if(arrayElementos[4] != '' && arrayElementos[2] == arrayElementos[4] && arrayElementos[4] == arrayElementos[6]){
            finish = true;
        }else if(arrayElementos[4] != '' && arrayElementos[0] == arrayElementos[4] && arrayElementos[4] == arrayElementos[8]){
            finish = true;
        }

        if(finish == true){
            arrayElementos = ['0','1','2','3','4','5','6','7','8'];
            data = data.replace(`{{RESULTADO}}`, `<a href="/">Reiniciar jogo</a>`);
            finish = false;
        }else{
            data = data.replace(`{{RESULTADO}}`, '');
        }
        res.send(data);
    });
});

app.listen(3000);
