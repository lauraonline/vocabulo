const chave = "linha";
const teste = document.querySelector(".teste");
const adivinhar = document.querySelector(".adivinhar");

for (let i = 0; i < 5; i++) {
    let seletorLetraAtual = ".letra" + (i+1) + ":not(disabled)";
    document.querySelector(seletorLetraAtual).value = null;
}

adivinhar.addEventListener("click", function() {
    const palpite = [];
    for (let i = 0; i < 5; i++) { // recolher todas as letras e preencher o vetor palpite
        let seletorLetraAtual = ".letra" + (i+1) + ":not(disabled)";
        palpite[i] = document.querySelector(seletorLetraAtual).value;
    }
    palpiteString = palpite.join("");
    // TODO: verificar se o palpite feito pelo usuário está vazio ou não tem 5 letras
    if (palpiteString == chave) {
        for (let i = 0; i < 5; i++) {
            let seletorLetraAtual = ".letra" + (i+1) + ":not(disabled)";
            document.querySelector(seletorLetraAtual).classList.add("letra_verde");
            document.querySelector(seletorLetraAtual).setAttribute("disabled", "true");
        }
        alert("Parabéns, você adivinhou a palavra!");
    } else {
        for (let i = 0; i < 5; i++) { // colorir cada letra adequadamente
            let seletorLetraAtual = ".letra" + (i+1) + ":not(disabled)";
            if (chave.includes(palpite[i])) {
                if (palpite[i] == chave[i]) {
                    document.querySelector(seletorLetraAtual).classList.add("letra_verde");
                    document.querySelector(seletorLetraAtual).setAttribute("disabled", "true")
                } else {
                    document.querySelector(seletorLetraAtual).classList.add("letra_amarela");
                    document.querySelector(seletorLetraAtual).setAttribute("disabled", "true")
                }
            } else {
                document.querySelector(seletorLetraAtual).classList.add("letra_cinza");
                document.querySelector(seletorLetraAtual).setAttribute("disabled", "true")
            }
        }
        for (let i = 0; i < 5; i++) { // fazer com que a próxima linha esteja editável
            let seletorProxLetra = ".letra" + (i+1) + ":not(.letra_verde, .letra_amarela, .letra_cinza)";
            document.querySelector(seletorProxLetra).removeAttribute("disabled");
        }
    }
});
