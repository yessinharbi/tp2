const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('./maBaseDeDonnees.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connecté à la base de données SQLite.');

        // Create the 'personnes' table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS personnes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            adresse TEXT
        )`, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                // Insert initial data
                const personnes = [
                    { nom: 'Bob', adresse: '123 Rue de Paris' },
                    { nom: 'Alice', adresse: '456 Avenue de Lyon' },
                    { nom: 'Charlie', adresse: '789 Boulevard de Marseille' }
                ];
                personnes.forEach((personne) => {
                    db.run(`INSERT INTO personnes (nom, adresse) VALUES (?, ?)`, [personne.nom, personne.adresse]);
                });
            }
        });
    }
});

module.exports = db;