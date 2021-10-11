// {chave: valor, ...}
var jogador1 = {
  foto:
    "https://i.pinimg.com/564x/2a/da/4f/2ada4f93f28b708b4c58fc22cfc87e28.jpg",
  nome: "Becky",
  vitorias: 0,
  empates: 0,
  derrotas: 0,
  pontos: 0
};
// console.log(jogador1.vitorias)

var jogadores = [jogador1];
//console.log(jogadores.length);
naTelinha(jogadores);

jogador1.pontos = calculaPontos(jogador1);
// console.log(jogador1);

// Adiciona os novos jogadores no jogo
function mais1() {
  var novoNome = document.getElementById("nomeMais1").value;
  var novaImg = document.getElementById("imgMais1").value;
  if (
    novaImg.endsWith(".jpg") ||
    novaImg.endsWith(".png") ||
    novaImg.endsWith(".jpeg")
  ) {
    if (novoNome != "") {
      var novoJogador = {
        foto: novaImg,
        nome: novoNome,
        vitorias: 0,
        empates: 0,
        derrotas: 0,
        pontos: 0
      };

      jogadores.push(novoJogador);
      naTelinha(jogadores);
      document.getElementById("nomeMais1").value = "";
      document.getElementById("imgMais1").value = "";
    } else {
      alert("O jogador deve ter um nome!");
    }
  } else {
    alert("Endereço de imagem inválido!");
  }
}

// Tira um jogador do jogo
function menos1() {
  var quemSaiu = document.getElementById("nomeMenos1").value;
  var j = jogadores.findIndex((i) => i.nome === quemSaiu);
  console.log(j);
  if (j < 0) {
    alert("Esse jogador não está presente!");
  } else {
    jogadores.splice(j, 1);
    naTelinha();
    document.getElementById("nomeMenos1").value = "";
  }
}

// calcula e atualiza os pontos de cada jogador
function calculaPontos(jogador) {
  var pontosJ = jogador.vitorias * 3 + jogador.empates;
  // console.log(jogador.nome + " acumulou " + pontos + " pontos");
  validacao();
  return pontosJ;
}

// mostra os dados dos jogadores na tela
function naTelinha() {
  var elemento = "";
  for (var i = 0; i < jogadores.length; i++) {
    elemento += `<tr>
    <td><img src="${jogadores[i].foto}" ></td>
    <td>${jogadores[i].nome}</td>
    <td>${jogadores[i].vitorias}</td>
    <td>${jogadores[i].empates}</td>
    <td>${jogadores[i].derrotas}</td>
    <td>${jogadores[i].pontos}</td>
      <td><button onClick="adicionarVitoria(${i})">Vitória</button></td>
      <td><button onClick="adicionarEmpate(${i})">Empate</button></td>
      <td><button onClick="adicionarDerrota(${i})">Derrota</button></td>
    </tr>`;
  }
  document.getElementById("tabelaJogadores").innerHTML = elemento;
}

// limpar os dados e pontos de todo mundo, pra jogar do zero
function resetar() {
  for (var i = 0; i < jogadores.length; i++) {
    jogadores[i].vitorias = 0;
    jogadores[i].empates = 0;
    jogadores[i].derrotas = 0;
    jogadores[i].pontos = 0;
    jogadores[i].ranking = "";
    console.log(jogadores[i]);
  }
  naTelinha();
}

function adicionarVitoria(i) {
  var jogador = jogadores[i];
  jogador.vitorias++;
  jogador.pontos = calculaPontos(jogador);
  naTelinha(jogadores);
}

function adicionarEmpate(i) {
  var jogador = jogadores[i];
  jogador.empates++;
  jogador.pontos = calculaPontos(jogador);
  naTelinha(jogadores);
}

function adicionarDerrota(i) {
  var jogador = jogadores[i];
  jogador.derrotas++;
  validacao();
  naTelinha(jogadores);
}

function validacao() {
  var somaV = 0;
  var somaD = 0;
  var somaE = 0;
  for (var k = 0; k < jogadores.length; k++) {
    somaV += jogadores[k].vitorias;
    somaD += jogadores[k].derrotas;
    somaE += jogadores[k].empates;
  }

  if (somaD !== somaV) {
    if (somaE % 2 !== 0) {
      document.getElementById("msg").innerHTML =
        "Cuidado!! Os números não estão consistentes!";
    } else {
      document.getElementById("msg").innerHTML =
        "Cuidado!! O número de vitórias e derrotas não estão consistentes!";
    }
  } else {
    if (somaE % 2 !== 0) {
      document.getElementById("msg").innerHTML =
        "Cuidado!! O número de empates não está consistente!";
    } else {
      document.getElementById("msg").innerHTML = "";
    }
  }
}