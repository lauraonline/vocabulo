const API_URL = 'http://localhost:3000';

// botões
const form = document.getElementById('form-palavra');
const formTitulo = document.getElementById('form-titulo');
const inputId = document.getElementById('input-id');
const inputPalavra = document.getElementById('input-palavra');
const inputAutor = document.getElementById('input-autor');
const btnCancelar = document.getElementById('btn-cancelar');
const tbody = document.getElementById('tbody-palavras');
const contador = document.getElementById('contador');
const msgVazio = document.getElementById('msg-vazio');

// estado
let editando = false;

// carregar palavras no início da página
document.addEventListener('DOMContentLoaded', carregarPalavras);

// event listeners
form.addEventListener('submit', salvarPalavra);
btnCancelar.addEventListener('click', cancelarEdicao);

//funções
async function carregarPalavras() {
    try {
        const response = await fetch(`${API_URL}/palavra`);
        const palavras = await response.json();
        
        renderizarTabela(palavras);
        contador.textContent = palavras.length;
        
        if (palavras.length === 0) { // vazio
            msgVazio.style.display = 'block';
            document.getElementById('tabela-palavras').style.display = 'none';
        } else { // não vazio
            msgVazio.style.display = 'none';
            document.getElementById('tabela-palavras').style.display = 'table';
        }
    } catch (error) {
        console.error('erro ao carregar palavras:', error);
        alert('erro ao conectar com a API. verifique se o servidor está rodando.');
    }
}

function renderizarTabela(palavras) {
    tbody.innerHTML = '';
    
    palavras.forEach(palavra => { // para cada palavra
        const tr = document.createElement('tr'); // row
        tr.innerHTML = `
            <td>${palavra.id}</td>
            <td><strong>${palavra.palavra.toUpperCase()}</strong></td>
            <td>${palavra.autor || '-'}</td>
            <td>${formatarData(palavra.created_at)}</td>
            <td>
                <button class="btn-acao btn-editar" onclick="editarPalavra(${palavra.id}, '${palavra.palavra}', '${palavra.autor || ''}')">editar</button>
                <button class="btn-acao btn-deletar" onclick="deletarPalavra(${palavra.id}, '${palavra.palavra}')">deletar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// formatar data como "há X tempo"
function formatarData(dataISO) {
    if (!dataISO) return '-';
    
    const data = new Date(dataISO);
    const agora = new Date();
    const diffMs = agora - data;
    const diffSeg = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSeg / 60);
    const diffHoras = Math.floor(diffMin / 60);
    const diffDias = Math.floor(diffHoras / 24);
    const diffSemanas = Math.floor(diffDias / 7);
    const diffMeses = Math.floor(diffDias / 30);
    const diffAnos = Math.floor(diffDias / 365);
    
    if (diffSeg < 60) {
        return 'há poucos segundos';
    } else if (diffMin < 60) {
        return diffMin === 1 ? 'há 1 minuto' : `há ${diffMin} minutos`;
    } else if (diffHoras < 24) {
        return diffHoras === 1 ? 'há 1 hora' : `há ${diffHoras} horas`;
    } else if (diffDias < 7) {
        return diffDias === 1 ? 'há 1 dia' : `há ${diffDias} dias`;
    } else if (diffSemanas < 4) {
        return diffSemanas === 1 ? 'há 1 semana' : `há ${diffSemanas} semanas`;
    } else if (diffMeses < 12) {
        return diffMeses === 1 ? 'há 1 mês' : `há ${diffMeses} meses`;
    } else {
        return diffAnos === 1 ? 'há 1 ano' : `há ${diffAnos} anos`;
    }
}

async function salvarPalavra(event) {
    event.preventDefault(); // NÃO SUBMITAR
    
    const palavra = inputPalavra.value.toLowerCase().trim();
    const autor = inputAutor.value.trim();
    
    if (palavra.length !== 5) {
        alert('A palavra deve ter exatamente 5 letras!');
        return;
    }

    const validacaoRegex = /^[a-z]+$/;
    if (validacaoRegex.test(palavra) === false) {
        alert('A palavra deve conter apenas letras (sem acentos ou números)!');
        return;
    }    
    try {
        if (editando) {
            // editar
            await fetch(`${API_URL}/palavra`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: parseInt(inputId.value),
                    palavra: palavra,
                    autor: autor
                })
            });
        } else {
            // criar
            await fetch(`${API_URL}/palavra`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    palavra: palavra,
                    autor: autor
                })
            });
        }
        
        // limpar formulário e recarregar lista
        cancelarEdicao();
        carregarPalavras();
        
    } catch (error) {
        console.error('Erro ao salvar:', error);
        alert('Erro ao salvar palavra. Tente novamente.');
    }
}

function editarPalavra(id, palavra, autor) {
    editando = true;
    inputId.value = id;
    inputPalavra.value = palavra;
    inputAutor.value = autor;
    
    formTitulo.textContent = 'editar';
    btnCancelar.style.display = 'inline-block';
    
    // scroll para o formulário
    document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    inputPalavra.focus();
}

// cancelar edição
function cancelarEdicao() {
    editando = false;
    inputId.value = '';
    inputPalavra.value = '';
    inputAutor.value = '';
    
    formTitulo.textContent = 'adicionar';
    btnCancelar.style.display = 'none';
}

// deletar palavra
async function deletarPalavra(id, palavra) {
    const confirmar = confirm(`Tem certeza que deseja deletar a palavra "${palavra.toUpperCase()}"?`);
    
    if (!confirmar) return;
    
    try {
        await fetch(`${API_URL}/palavra/${id}`, {
            method: 'DELETE'
        });
        
        carregarPalavras();
        
    } catch (error) {
        console.error('Erro ao deletar:', error);
        alert('Erro ao deletar palavra. Tente novamente.');
    }
}

