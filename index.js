let subtitulo = document.querySelector(".d1-1-1 span");
let cargo = document.querySelector(".d1-1-2 span");
let descricao = document.querySelector(".d1-1-4");
let aviso = document.querySelector(".d2");
let lateral = document.querySelector(".d1-right");
let numeros = document.querySelector(".d1-1-3");

let etapasAtual = 0;
let numero = "";
let votoBranco = false;

function comecarEtapa() {
    let etapa = etapas[etapasAtual]

    let numeroHTML = '';
    numero="";
    votoBranco = false;

    for(let i=0; i<etapa.numeros; i++){
        if(i==0){
            numeroHTML += '<div class="numero pisca"></div>'
        } else{
            numeroHTML += '<div class="numero"></div>'
        } 
    }   
    
    subtitulo.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;

}

function atualizainterface() {
   let etapa = etapas[etapasAtual];
   let candidato = etapa.candidato.filter((item)=>{
       if(item.numero === numero) {
           return true;
       }  else {
           return false;
       }
   });
   if(candidato.length > 0)
      candidato = candidato[0];
      subtitulo.style.display = "Block";
      aviso.style.display = 'block';
      descricao.innerHTML = `Nome: ${candidato.name}<br/> Partido: ${candidato.partido}`;

      let fotosHTML = '';
      for(let i in candidato.fotos){
          if(candidato.fotos[i].small){
            fotosHTML += `<div class="d1-right"><div class="right-presidente-small"><img src="${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}`    
          }else{
            fotosHTML += `<div class="d1-right"><div class="right-presidente"><img src="${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}`
          }
        }

      lateral.innerHTML = fotosHTML;
}

function clicou(n) {
    let Elnumero = document.querySelector('.numero.pisca')
    if(Elnumero !== null){
        Elnumero.innerHTML = n;
        numero = `${numero}${n}`

        Elnumero.classList.remove('pisca');
        if(Elnumero.nextElementSibling !== null) {
           Elnumero.nextElementSibling.classList.add('pisca');

        } else {
           atualizainterface();
        }
    }
}
function Branco() {
    numero='';
    votoBranco=true;
    subtitulo.style.display = "Block";
    aviso.style.display = 'block';
    numeros.innerHTML ='';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML='';
}
function Corrige() {
    comecarEtapa();
}
function Confirma() {
    let etapa = etapas[etapasAtual];

    let votoConfirmado = false;
    if(votoBranco===true){
        votoConfirmado = true;
        console.log("Confirmando como Branco")
    } else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        console.log("Confirmando como "+numero);
    }

    if(votoConfirmado){
        etapasAtual++;
        if(etapas[etapasAtual] !== undefined){
            comecarEtapa();
        }
        else{
        document.querySelector('.tela').innerHTML= '<div class="aviso--gigante pisca">FIM</div>';
        }
    }
}   
    


comecarEtapa();