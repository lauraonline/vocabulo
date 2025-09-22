const chave = "linha";
const teste = document.querySelector(".teste");
const adivinhar = document.querySelector(".adivinhar");
const quantidadeDeLetrasEm1Palavra = 5;

const todasLetras = document.querySelectorAll(".letra");
for (let i = 0; i < todasLetras.length; i++) {
    todasLetras[i].value = null;
    if (i > quantidadeDeLetrasEm1Palavra - 1) {
        todasLetras[i].setAttribute("disabled", "true");
    }
}

adivinhar.addEventListener("click", function() {
    const palavra = document.querySelectorAll(".letra:not(:disabled)");
    const palavraArray = [];
    for (let i = 0; i < palavra.length; i++) {
        palavraArray[i] = palavra[i].value;
    }
    palavraString = palavraArray.join("");
    alert(palavraString);
    // TODO: verificar se o palpite feito pelo usuário está vazio ou não tem 5 letras
    // TODO: organizar o eventlistener pra chamar funções que chamam funções etc
    if (palavraString == chave) {
        for (let i = 0; i < 5; i++) { // procedimento de vitória
            palavra[i].classList.add("letra_verde");
            palavra[i].setAttribute("disabled", "true");
        }
        alert("Parabéns, você adivinhou a palavra!");
        document.querySelector(".adivinhar").style.display = "none";
    } else {
        for (let i = 0; i < 5; i++) { // colorir cada letra adequadamente
            if (chave.includes(palavraString[i])) {
                if (palavraString[i] == chave[i]) { // letra atual = verde
                    palavra[i].classList.add("letra_verde");
                    palavra[i].setAttribute("disabled", "true")
                } else { // letra atual = amarela
                    palavra[i].classList.add("letra_amarela");
                    palavra[i].setAttribute("disabled", "true")
                }
            } else { // letra atual = cinza
                palavra[i].classList.add("letra_cinza");
                palavra[i].setAttribute("disabled", "true")
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
