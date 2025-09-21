const chave = "linha";
const teste = document.querySelector(".teste");
const adivinhar = document.querySelector(".adivinhar");

adivinhar.addEventListener("click", function() {
    let letra1 = document.querySelector(".letra1:not(disabled)");
    let letra2 = document.querySelector(".letra2:not(disabled)");
    let letra3 = document.querySelector(".letra3:not(disabled)");
    let letra4 = document.querySelector(".letra4:not(disabled)");
    let letra5 = document.querySelector(".letra5:not(disabled)");
    let palavra = letra1.value + letra2.value + letra3.value + letra4.value + letra5.value;
    alert(palavra);
});
