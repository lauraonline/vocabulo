novaPalavra = input("Digite a nova palavra: ")
novaPalavra = novaPalavra.lower()
with open("./dicionario.js", "r") as dicio:
    linhas = dicio.readlines()
    palavraFormatada = f"    \"{novaPalavra}\",\n"
    linhas.insert(len(linhas) - 1, palavraFormatada)

with open("./dicionario.js", "w") as dicio:
    dicio.writelines(linhas)
print("sucesso")
