import { getDb } from './connexion';

// Créer la table des favoris
export const initFavoris = async () => {
    const db = await getDb();

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS favoris (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            utilisateur_id INTEGER NOT NULL,
            produit_id INTEGER NOT NULL,
            UNIQUE(utilisateur_id, produit_id)
        );
    `);
};

// Récupérer les identifiants des favoris d'un utilisateur
export const listerIdsFavoris = async (utilisateurId) => {
    const db = await getDb();

    const favoris = await db.getAllAsync(
        `SELECT produit_id FROM favoris
         WHERE utilisateur_id = ?`,
        utilisateurId
    );

    return favoris.map((favori) => favori.produit_id);
};

// Ajouter ou retirer un favori
export const basculerFavori = async (utilisateurId, produitId) => {
    const db = await getDb();

    const favori = await db.getFirstAsync(
        `SELECT id FROM favoris
         WHERE utilisateur_id = ? AND produit_id = ?`,
        utilisateurId,
        produitId
    );

    if (favori) {
        await db.runAsync(
            `DELETE FROM favoris
             WHERE utilisateur_id = ? AND produit_id = ?`,
            utilisateurId,
            produitId
        );

        return false;
    }

    await db.runAsync(
        `INSERT INTO favoris (utilisateur_id, produit_id)
         VALUES (?, ?)`,
        utilisateurId,
        produitId
    );

    return true;
};

// Récupérer les produits favoris d'un utilisateur
export const listerFavoris = async (utilisateurId) => {
    const db = await getDb();

    return db.getAllAsync(
        `SELECT produits.*
         FROM produits
         INNER JOIN favoris
         ON produits.id = favoris.produit_id
         WHERE favoris.utilisateur_id = ?
         ORDER BY favoris.id DESC`,
        utilisateurId
    );
};

// Supprimer un favori
export const supprimerFavori = async (utilisateurId, produitId) => {
    const db = await getDb();

    await db.runAsync(
        `DELETE FROM favoris
         WHERE utilisateur_id = ? AND produit_id = ?`,
        utilisateurId,
        produitId
    );
};
