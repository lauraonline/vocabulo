// constantes e botões
let chave = "";
const adivinhar = document.querySelector(".adivinhar");
const palpites = document.querySelector(".palpites");
const todasLetras = document.querySelectorAll(".letra");

// TODO: Fazer funcionalidade de derrota ao encher todas as linhas
// TODO: Implementar dicionario
// funções

// function tratamentoEntradaUsuario(event) {
//     
// }
function criarPopup(texto) {
    const popupExistente = document.querySelector(".popup");
    if (popupExistente != null) {
        popupExistente.remove();
    }

    const popup = document.createElement("div");
    popup.textContent = texto;
    popup.classList.add("popup");
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 3000);
}
function reiniciarJogo() {
    for (let i = 0; i < todasLetras.length; i++) {
        todasLetras[i].value = null;
        todasLetras[i].classList.remove("letra_verde", "letra_amarela", "letra_cinza");
        if (i < 5) {
            todasLetras[i].removeAttribute("disabled");
        } else {
            todasLetras[i].setAttribute("disabled", "true");
        }
    }
    adivinhar.style.display = "inline-block";
    document.querySelector(".reiniciar").remove();
    document.querySelector(".letra1:not(:disabled)").focus();
}
function fimDeJogo(isGanhou) {
    vitoria = "Parabéns, você acertou!"
    derrota = "Fim de jogo! A palavra era " + chave;
    const msg = isGanhou ? vitoria : derrota; 

    criarPopup(msg);
    adivinhar.style.display = "none";

    const reiniciar2 = document.createElement("button");
    reiniciar2.textContent = "jogar novamente ⏎";
    reiniciar2.classList.add("reiniciar");

    reiniciar2.addEventListener("click", reiniciarJogo);
    document.querySelector(".botaoPrincipal").appendChild(reiniciar2);
}
function proximoCampo (atual, proximo) { // essa função é chamada diretamente no html
    let seletorProxCampoEditavel = proximo + ":not(:disabled)"
    if (atual.value.length >= atual.maxLength) {
        document.querySelector(seletorProxCampoEditavel).focus();
    }
}
function palavraToString(palavra) {
    const palavraArray = [];
    for (let i = 0; i < palavra.length; i++) {
        palavraArray[i] = palavra[i].value;
    }
    return palavraArray.join("");
}
function selecaoeExclusaoValor (lista, valor) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] === valor) {
            lista[i] = null;
        }
    }
}

// lógica a ser executada no momento de carregamento da página
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { // ativar o botão "adivinhar" ou "reiniciar" com a tecla ENTER, pra melhor jogabilidade sem precisar usar o mouse
        const reiniciar = document.querySelector(".reiniciar");
        if (reiniciar) {
            reiniciar.click();
        } else {
            adivinhar.click();
        }
    } 
});
for (let i = 0; i < todasLetras.length; i++) {
    todasLetras[i].value = null; // nulificar todos os campos pra evitar que um jogo em progresso persista entre recarregamentos
    if (i > 4) {
        todasLetras[i].setAttribute("disabled", "true"); // desativar todos os campos após o quinto pra evitar que um jogo em progresso persista entre recarregamentos
    }
    todasLetras[i].addEventListener("keydown", function(event) {
        if ((event.key === "Backspace") &&
            (todasLetras[i] != document.querySelector(".letra:not(:disabled")) && // não aplicar este comportamento ao primeiro campo de uma linha, pelo risco de "focar" o último campo da linha anterior
            (todasLetras[i].value === "")) { // apagar a última letra inserida com a tecla BACKSPACE, pra melhor jogabilidade sem precisar usar o mouse
                todasLetras[i-1].focus();
                todasLetras[i-1].value = null;
        } 
    });
}
todasLetras[0].focus();

// lógica a ser atrelada ao botão "adivinhar"
adivinhar.addEventListener("click", function() {
    const palavra = document.querySelectorAll(".letra:not(:disabled)");
    const palavraString = palavraToString(palavra).toLowerCase();
    // TODO: organizar o eventlistener pra chamar funções que chamam funções etc
    if (palavraString.length != 5) {
        criarPopup("Preencha todos os campos!")
        return;
    }
    // TODO: ver se tem um jeito melhor de validar pra apenas letras
    const validacaoRegex = /^[a-z]+$/;
    if (validacaoRegex.test(palavraString) === false) {
        criarPopup("Todos os campos do seu palpite devem ser letras!");
        return;
    }
    if (palavraString === chave) {
        for (let i = 0; i < 5; i++) { // procedimento de vitória
            palavra[i].classList.add("letra_verde");
            palavra[i].setAttribute("disabled", "true");
        }
        fimDeJogo(true);
    } else { // procedimento de coloração das letras
        let chaveArray = chave.split('');
        let resultados = [];
        for (let i = 0; i < 5; i++) { // definir letras verdes
            if (palavraString[i] === chaveArray[i]) {
                resultados[i] = "verde";
                chaveArray[i] = null; // nulificar as letras VERDES em seus índices pra evitar "amarelação" inadequada de letras  que se repetem numa palavra
            }
        }
        for (let i = 0; i < 5; i++) { // definir amarelas e cinza
            if (resultados[i] === 'verde') {
                continue;
            }
            isLetraAmarela = chaveArray.indexOf(palavraString[i]); // ISSO NÃO É UMA BOOLEANA, mas na prática funciona como uma booleana. -1 = false, qualquer outro número = true, e ainda por cima retorna o índice caso seja true.
            if (isLetraAmarela != -1) { // basicamente um check booleano
                resultados[i] = "amarela";
                chaveArray[isLetraAmarela] = null; // novamente, nulifica as letras AMARELAS pelo mesmo motivo das verdes
            } else {
                resultados[i] = "cinza";
            }
        }
        for (let i = 0; i < 5; i++) { // APLICAR verdes, amarelas e cinzas
            let classString = "letra_" + resultados[i];
            palavra[i].classList.add(classString);
            palavra[i].setAttribute("disabled", "true");
        }
        // TODO: Analisar se dá pra fazer as funções abaixo SEM usar as classes índice (.letra1, .letra2, etc), pra viabilizar a remoção das classes índice
        for (let i = 0; i < 5; i++) { // fazer com que a próxima linha esteja editável
            let seletorProxLetra = ".letra" + (i+1) + ":not(.letra_verde, .letra_amarela, .letra_cinza)";
            document.querySelector(seletorProxLetra).removeAttribute("disabled");
        }
        document.querySelector(".letra1:not(:disabled)").focus(); // automaticamente posiciona o cursor na próxima linha
    }
});
