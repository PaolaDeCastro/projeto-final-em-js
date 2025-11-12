const canvas = document.getElementById("tela"); //capturando os id's do HTML
const contexto = canvas.getContext("2d"); // dando o contexto de desenho
const seletorCor = document.getElementById("cor"); // para mudar a cor do pincel
const seletorTamanho = document.getElementById("tamanho"); // seleciona a espessura do pincel
const botaoBorracha = document.getElementById("borracha"); // seleciona a borracha
const botaoLimpar = document.getElementById("limpar"); // botão que limpa a tela
const botaoSalvar = document.getElementById("salvar"); // botão que salva o desenho

// variaveis de controle

let desenhando = false;
let x = 0;
let y = 0;
let corAtual = seletorCor.value;


//configurando o pincel

contexto.strokeStyle = seletorCor.value; // cor inicial
contexto.lineWidth = 3; // espessura da linha
contexto.lineCap = "square"; // pra dar uma diferenciada, quis deixar a ponta quadrada.


// atualiza a cor quando o usuário trocar

seletorCor.addEventListener("input", function(){
    corAtual = this.value;
    contexto.strokeStyle = this.value;
});

// mudando o tamanho do pincel

seletorTamanho.addEventListener("input", function(){
    contexto.lineWidth = this.value;
});

// evento da borracha

botaoBorracha.addEventListener("click", function(){
    contexto.strokeStyle = "white";    

});

// evento limpaR A TELA

botaoLimpar.addEventListener("click", function(){
    contexto.clearRect(0, 0, canvas.width, canvas.height); // limpa tudo
    contexto.strokeStyle = corAtual; // volta pra cor atuak

});

// PLUS: salvar o desenho

botaoSalvar.addEventListener("click", function(){
    const imagem = canvas.toDataURL("image/png"); // transforma em img
    const link = document.createElement("a");
    link.href = imagem;
    link.download = "meu_desenho.png";
    link.click(); // faz o donwload auto.
});

// adicionando evento ao mouse quando pressionado

canvas.addEventListener("mousedown", function(evento){ 
    desenhando = true;
    x = evento.offsetX; 
    y = evento.offsetY;
});

// Quando o moude se move

canvas.addEventListener("mousemove", function(evento){
    if(desenhando){
        desenharLinha(x, y, evento.offsetX, evento.offsetY);
        x = evento.offsetX;
        y = evento.offsetY;
    }
});

// Quando o mouse é solto

canvas.addEventListener("mouseup", function(){
    desenhando = false;
});

// Quando o mouse sai da area do canvas

canvas.addEventListener("mouseout", function(){
    desenhando = false;
});


// Desenhando uma linha entre dois pontos

function desenharLinha(x1, y1, x2, y2){
    contexto.beginPath();
    contexto.moveTo(x1, y1);
    contexto.lineTo(x2, y2);
    contexto.stroke();
    contexto.closePath();
}