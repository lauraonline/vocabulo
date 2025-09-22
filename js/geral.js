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
    const palpite = [];
    for (let i = 0; i < 5; i++) { // recolher todas as letras e preencher o vetor palpite
        let seletorLetraAtual = ".letra" + (i+1) + ":not(:disabled, .letra_verde, .letra_amarela, .letra_cinza)";
        palpite[i] = document.querySelector(seletorLetraAtual).value;
    }
    palpiteString = palpite.join("");
    // TODO: verificar se o palpite feito pelo usuário está vazio ou não tem 5 letras
    // TODO: organizar o eventlistener pra chamar funções que chamam funções etc
    if (palpiteString == chave) {
        for (let i = 0; i < 5; i++) { // procedimento de vitória
            let seletorLetraAtual = ".letra" + (i+1) + ":not(:disabled)";
            document.querySelector(seletorLetraAtual).classList.add("letra_verde");
            document.querySelector(seletorLetraAtual).setAttribute("disabled", "true");
        }
        alert("Parabéns, você adivinhou a palavra!");
        document.querySelector(".adivinhar").style.display = "none";
    } else {
        for (let i = 0; i < 5; i++) { // colorir cada letra adequadamente
            let seletorLetraAtual = ".letra" + (i+1) + ":not(:disabled)";
            if (chave.includes(palpite[i])) {
                if (palpite[i] == chave[i]) { // letra atual = verde
                    document.querySelector(seletorLetraAtual).classList.add("letra_verde");
                    document.querySelector(seletorLetraAtual).setAttribute("disabled", "true")
                } else { // letra atual = amarela
                    document.querySelector(seletorLetraAtual).classList.add("letra_amarela");
                    document.querySelector(seletorLetraAtual).setAttribute("disabled", "true")
                }
            } else { // letra atual = cinza
                document.querySelector(seletorLetraAtual).classList.add("letra_cinza");
                document.querySelector(seletorLetraAtual).setAttribute("disabled", "true")
            }
        }
        for (let i = 0; i < 5; i++) { // fazer com que a próxima linha esteja editável
            let seletorProxLetra = ".letra" + (i+1) + ":not(.letra_verde, .letra_amarela, .letra_cinza)";
            document.querySelector(seletorProxLetra).removeAttribute("disabled");
        }
        document.querySelector(".letra1:not(:disabled)").focus(); // automaticamente posiciona o cursor na próxima linha
    }
});
