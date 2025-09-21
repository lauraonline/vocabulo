const chave = "linha";
const teste = document.querySelector(".teste");
const adivinhar = document.querySelector(".adivinhar");

adivinhar.addEventListener("click", function() {
    const palpite = [];
    for (let i = 0; i < 5; i++) {
        let seletor = ".letra" + (i+1) + ":not(disabled)";
        palpite[i] = document.querySelector(seletor).value;
    }
   alert(palpite.join(""));
});
