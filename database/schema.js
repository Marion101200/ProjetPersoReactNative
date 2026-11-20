
import { getDb } from './connexion';
import { initProduits } from './produits';
import { initFavoris } from './favoris';
import { initPanier } from './panier';

let initialisationPromise = null;

export const initDb = () => {

    // Si la base est déjà en cours d'initialisation,
    // on attend la même initialisation.
    if (initialisationPromise) {
        return initialisationPromise;
    }

    initialisationPromise = (async () => {
        const db = await getDb();

        await db.execAsync(`
            PRAGMA journal_mode = WAL;

            CREATE TABLE IF NOT EXISTS utilisateurs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nom TEXT NOT NULL,
                prenom TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                telephone TEXT,
                mdp TEXT NOT NULL,
                newsletter INTEGER NOT NULL DEFAULT 0,
                cgu INTEGER NOT NULL DEFAULT 0,
                cree_le TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await initProduits();
        await initFavoris();
        await initPanier();

    })().catch((erreur) => {

        // Autoriser une nouvelle tentative si l'initialisation échoue.
        initialisationPromise = null;

        throw erreur;
    });

    return initialisationPromise;
};
