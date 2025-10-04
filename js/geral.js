// constantes e botões
const chave = "linha";
const adivinhar = document.querySelector(".adivinhar");

// funções

// function tratamentoEntradaUsuario(event) {
//     
// }
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

// TODO: usar LocalStorage
// TODO: Usar criação dinâmica de elementos (createElement, appendChild, remove)
// lógica a ser executada no momento de carregamento da página
const todasLetras = document.querySelectorAll(".letra");
for (let i = 0; i < todasLetras.length; i++) {
    todasLetras[i].value = null; // nulificar todos os campos pra evitar que um jogo em progresso persista entre recarregamentos
    if (i > 4) {
        todasLetras[i].setAttribute("disabled", "true"); // desativar todos os campos após o quinto pra evitar que um jogo em progresso persista entre recarregamentos
    }
    todasLetras[i].addEventListener("keydown", function(event) {
        if (event.key === "Enter") { // ativar o botão "adivinhar" com a tecla ENTER, pra melhor jogabilidade sem precisar usar o mouse
            adivinhar.click();
        } else
        if ((event.key === "Backspace") &&
            (todasLetras[i] != document.querySelector(".letra:not(:disabled")) && // não aplicar este comportamento ao primeiro campo de uma linha, pelo risco de "focar" o último campo da linha anterior
            (todasLetras[i].value === "")) { // apagar a última letra inserida com a tecla BACKSPACE, pra melhor jogabilidade sem precisar usar o mouse
                todasLetras[i-1].focus();
                todasLetras[i-1].value = null;
        } 
    });
}

// lógica a ser atrelada ao botão "adivinhar"
adivinhar.addEventListener("click", function() {
    const palavra = document.querySelectorAll(".letra:not(:disabled)");
    const palavraString = palavraToString(palavra);
    // TODO: implementar lógica pra não marcar letras que já estão verdes e não tem mais na palavra como amarelas quando estão em outro campo da palavra
    // TODO: verificar se o palpite feito pelo usuário está vazio ou não tem 5 letras
    // TODO: organizar o eventlistener pra chamar funções que chamam funções etc
    if (palavraString === chave) {
        for (let i = 0; i < 5; i++) { // procedimento de vitória
            palavra[i].classList.add("letra_verde");
            palavra[i].setAttribute("disabled", "true");
        }
        alert("Parabéns, você adivinhou a palavra!");
        document.querySelector(".adivinhar").style.display = "none";
    } else {
        for (let i = 0; i < 5; i++) { // colorir cada letra adequadamente
            if (chave.includes(palavraString[i])) {
                if (palavraString[i] === chave[i]) { // letra atual = verde
                    palavra[i].classList.add("letra_verde");
                    palavra[i].setAttribute("disabled", "true");
                } else { // letra atual = amarela
                    palavra[i].classList.add("letra_amarela");
                    palavra[i].setAttribute("disabled", "true");
                }
            } else { // letra atual = cinza
                palavra[i].classList.add("letra_cinza");
                palavra[i].setAttribute("disabled", "true");
            }
        }
        // TODO: Analisar se dá pra fazer as funções abaixo SEM usar as classes índice (.letra1, .letra2, etc), pra viabilizar a remoção das classes índice
        for (let i = 0; i < 5; i++) { // fazer com que a próxima linha esteja editável
            let seletorProxLetra = ".letra" + (i+1) + ":not(.letra_verde, .letra_amarela, .letra_cinza)";
            document.querySelector(seletorProxLetra).removeAttribute("disabled");
        }
        document.querySelector(".letra1:not(:disabled)").focus(); // automaticamente posiciona o cursor na próxima linha
    }
});
