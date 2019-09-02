//funcao seleciona os elementos
const selecionaElement = (s) => document.querySelectorAll(s);

//abrir o menu atraves do click
selecionaElement('.open').addEventListener('click', function() {
    selecionaElement('.nav-list').classList.add('active');
});

//Fecha o menu atraves do click
selecionaElement('.close').addEventListener('click', function() {
    selecionaElement('.nav-list').classList.remove('active');
});