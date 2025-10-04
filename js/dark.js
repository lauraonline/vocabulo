const dark = document.querySelector("#dark");

function aplicarTema() {
    const tema = localStorage.getItem("tema");
    if (tema === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
}

dark.addEventListener("click", ()=>{
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("tema", "dark");
    } else {
        localStorage.setItem("tema", "light");
    }
})
document.querySelector("body").addEventListener("load", aplicarTema());
