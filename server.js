const fs = require('fs');
const express = require('express');

const app = express();

//array que guarda os elementos(X ou O) que serão mostrados em tela, caso não sejam X ou O mostra o campo vazio
arrayElementos = ['0','1','2','3','4','5','6','7','8'];

//Variável que define se o jogo foi finalizado ou não
finish = false;

//Contador definindo de quem é a vez de jogar(Número ímpar = X | Número par = O)
cont = 1;

//Contador que vai ser utilizado para verificar quantos elementos em arrayElementos estão definidos como X ou O
contadorVelha = 0;

app.get('/', function(req, res) {
    //verificando em qual dos campos o usuário clicou
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
                //Guarda no arrayElementos a marcação do jogador caso ninguém tenha marcado aquele campo ainda
                if(arrayElementos[i] != 'x' && arrayElementos[i] != 'o'){
                    if(cont%2!=0){
                        arrayElementos[i] = 'x';
                        jogador = "X";
                        cont++;
                    }else{
                        arrayElementos[i] = 'o';
                        jogador = "O";
                        cont++;
                    }
                }else{
                    data = data.replace(`{{MENSAGEM}}`, `<p class="mensagens">Espaço marcado, escolha outro</p>`);
                }
                
            }
            geral[i] = geral[i].replace('{{INDICE}}', i);

            //Verifica índice do array para mostrar em tela o que foi marcado
            if(arrayElementos[i] == 'x' || arrayElementos[i] == 'o'){
                geral[i] = geral[i].replace('{{ELEMENTO}}', arrayElementos[i]);
            }else{
                geral[i] = geral[i].replace('{{ELEMENTO}}', '');
            }

            //Verificando se deu velha, caso contadorVelha fique com valor 9 deu velha.
            if(arrayElementos[i] == 'x' || arrayElementos[i] == 'o' ){
                contadorVelha++;
            }

            data = data.replace(`{{QUADRADO${i}}}`, geral[i]);
        }
        
        //Condições de vitória
        if(arrayElementos[0] == arrayElementos[1] && arrayElementos[1] == arrayElementos[2]){
            finish = true;
        }else if(arrayElementos[3] == arrayElementos[4] && arrayElementos[4] == arrayElementos[5]){
            finish = true;
        }else if(arrayElementos[6] == arrayElementos[7] && arrayElementos[7] == arrayElementos[8]){
            finish = true;
        }else if(arrayElementos[0] == arrayElementos[3] && arrayElementos[3] == arrayElementos[6]){
            finish = true;
        }else if(arrayElementos[1] == arrayElementos[4] && arrayElementos[4] == arrayElementos[7]){
            finish = true;
        }else if(arrayElementos[2] == arrayElementos[5] && arrayElementos[5] == arrayElementos[8]){
            finish = true;
        }else if(arrayElementos[2] == arrayElementos[4] && arrayElementos[4] == arrayElementos[6]){
            finish = true;
        }else if(arrayElementos[0] == arrayElementos[4] && arrayElementos[4] == arrayElementos[8]){
            finish = true;
        }else{
            finish = false;
        }

        //Caso alguma das condições acima tiver sido confirmada mostrará quem venceu e resetará as variáveis
        if(finish == true){
            arrayElementos = ['0','1','2','3','4','5','6','7','8'];
            cont = 1;
            data = data.replace(`{{MENSAGEM}}`, `<div class="mensagens"><p>Jogador ${jogador} venceu!</p><a href="/" class="btn-reiniciar">Reiniciar jogo</a><div>`);
            finish = false;
        //Se no array existirem apenas 'x' e 'o' entenderemos que deu velha então reseta as variáveis e mostra a mensagem
        }else if(contadorVelha == 9){
            contadorVelha = 0;
            arrayElementos = ['0','1','2','3','4','5','6','7','8'];
            cont = 1;
            data = data.replace(`{{MENSAGEM}}`, `<div class="mensagens"><p>Deu velha :(</p><a href="/" class="btn-reiniciar">Reiniciar jogo</a><div>`);
            finish = false;
        //Caso chegue nesse else o jogo ainda não foi finalizado, então mostra de quem é a vez de jogar.
        }else{
            if(cont%2==1){
                jogador = 'X';
            }else{
                jogador = 'O';
            }
            data = data.replace(`{{MENSAGEM}}`, `<div class="mensagens"><p>Vez do jogador ${jogador} <div>`);
        }
        contadorVelha = 0;
        res.send(data);
    });
});

app.listen(3000);
