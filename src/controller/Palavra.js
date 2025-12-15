import { openDB } from "../configDB.js";

export async function createTablePalavra() {
    openDB().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Palavra (id INTEGER PRIMARY KEY, palavra TEXT, autor TEXT, created_at TEXT)');
    })
}

export async function insertPalavra(dados) {
    openDB().then(db=>{
        const timestamp = new Date().toISOString();
        db.run('INSERT INTO Palavra (palavra, autor, created_at) VALUES (?,?,?)', [dados.palavra, dados.autor, timestamp]);
    })
}

export async function selectPalavras() {
    return openDB().then(db=>{
        return db.all('SELECT * FROM Palavra');
    })
}

export async function selectPalavraById(id) {
    return openDB().then(db=>{
        return db.get('SELECT * FROM Palavra WHERE id=?', [id]);
    })
}

export async function updatePalavra(dados) {
    openDB().then(db=>{
        db.run('UPDATE Palavra SET palavra=?, autor=? WHERE id=?', [dados.palavra, dados.autor, dados.id]);
    })
}

export async function deletePalavra(id) {
    openDB().then(db=>{
        db.run('DELETE FROM Palavra WHERE id=?', [id]);
    })
}