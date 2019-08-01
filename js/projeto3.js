        var altura = 0
        var largura = 0
        
        function ajustaTamanho(){
            altura = window.innerHeight
            largura = window.innerWidth 

            var elemento = document.getElementsById('stage')
            elemento.canvas.width = altura + 'px'
            elemento.canvas.height = largura + 'px'

            console.log(altura, largura)
        }


        //esperando a pagina carregar
        window.onload = function(){

            //criando a parte visual 
            var stage = document.getElementById('stage');
            var context = stage.getContext("2d");
            document.addEventListener("keydown", keyPush)

            //Chamando a funcao a cada mudança
            setInterval(game, 80);


            const velocidade = 1;
            var score = 0
            var velocidadeX = velocidadeY = 0;
            var posicaoX = posicaoY = 10
            var tamanho = 20 
            var quantidade = 40
            var appleX = appleY = 15

            //Elementos no rastros da cobra
            var rastros = []
            cabeça = 5

            function game(){

                posicaoX += velocidadeX
                posicaoY += velocidadeY
                if(posicaoX < 0){
                    posicaoX = quantidade-1
                }
                if(posicaoX > quantidade - 1){
                    posicaoX = 0
                }

                if(posicaoY < 0){
                    posicaoY = quantidade - 1
                }

                if(posicaoY > quantidade -1){
                    posicaoY = 0;
                }


                // Estilo de preenchimento do cenario
                context.fillStyle = 'black'
                context.fillRect(0,0, stage.width, stage.height)

                //Estilo de preenchimento da maça
                context.fillStyle = 'red'
                context.fillRect(appleX*tamanho, appleY*tamanho, tamanho, tamanho)


                //Estilo de preenchimento da cobra
                context.fillStyle = 'gray'
                for (let i = 0; i < rastros.length; i++) {
                    context.fillRect(rastros[i].x*tamanho, rastros[i].y*tamanho, tamanho-1, tamanho-1)

                    //verificando se calda bate na cabeça
                    if(rastros[i].x == posicaoX && rastros[i].y == posicaoY){
                        velocidadeX = velocidadeY = 0
                        cabeça = 5
                    }
                }

                //movimento
                rastros.push({
                    x:posicaoX, y:posicaoY
                })
                while(rastros.length > cabeça){
                    rastros.shift()
                }

                //Posicionando em outro lugar a maça
                if(appleX == posicaoX && appleY == posicaoY){
                    score += 10
                    document.getElementById('score').innerHTML = score
                    cabeça++
                    appleX = Math.floor(Math.random()*quantidade)
                    appleY = Math.floor(Math.random()*quantidade)

                }

            }

            function keyPush(event){
                switch(event.keyCode){
                    case 37: // esquerda
                        velocidadeX = -velocidade
                        velocidadeY = 0
                        break;
                    case 38: // para cima
                        velocidadeX = 0
                        velocidadeY = -velocidade
                        break;
                    case 39: // direita
                        velocidadeX = velocidade
                        velocidadeY = 0
                        break;
                    case 40: // para baixo
                        velocidadeX = 0
                        velocidadeY = velocidade
                        break;
                    default:
                        break;
                }
            }

            var tempo = 100

            var cronometro = setInterval(function(){
                tempo -= 1
                if(tempo < 0){
                alert('Fim de Jogo!')
                window.location.href = 'terceiroProjeto.html'
            }
                document.getElementById('cronometro').innerHTML = tempo
        }, 1000)

        }
    