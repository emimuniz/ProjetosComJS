
//Escondendo o Loading após 3seg
window.onload = function(){
 setTimeout(function(){
    fecha_banner()
 }, 3000);
};

function fecha_banner()
{
 var banner_obj = document.querySelector(".loading");
 
    banner_obj.style.display = "none";	
    carregar(); 

}

//mostrando o botão na tela
function carregar() {
  document.getElementById("btn").style.display="block";
};