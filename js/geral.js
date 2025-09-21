const chave = "linha";
const teste = document.querySelector(".teste");
const adivinhar = document.querySelector(".adivinhar");

for (let i = 0; i < 5; i++) {
    let seletor = ".letra" + (i+1) + ":not(disabled)";
    document.querySelector(seletor).value = null;
}

adivinhar.addEventListener("click", function() {
    const palpite = [];
    for (let i = 0; i < 5; i++) {
        let seletor = ".letra" + (i+1) + ":not(disabled)";
        palpite[i] = document.querySelector(seletor).value;
    }
    palpiteString = palpite.join("");
    if (palpiteString == chave) {
        for (let i = 0; i < 5; i++) {
            let seletor = ".letra" + (i+1) + ":not(disabled)";
            document.querySelector(seletor).classList.add("letra_verde");
            document.querySelector(seletor).setAttribute("disabled", "true");
        }
        alert("Parabéns, você adivinhou a palavra!");
    } else {

    }
});
