import { getDb } from './connexion';

// Initialiser la table du panier
export const initPanier = async () => {
    const db = await getDb();

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS panier (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            utilisateur_id INTEGER NOT NULL,
            produit_id INTEGER NOT NULL,
            quantite INTEGER NOT NULL DEFAULT 1,

            FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id),
            FOREIGN KEY (produit_id) REFERENCES produits(id),

            UNIQUE (utilisateur_id, produit_id)
        );
    `);
};

// Ajouter un produit au panier
export const ajouterAuPanier = async (utilisateurId, produitId) => {
    const db = await getDb();

    return await db.withTransactionAsync(async () => {
        // Vérifier le stock du produit
        const produit = await db.getFirstAsync(
            'SELECT stock FROM produits WHERE id = ?',
            produitId
        );

        if (!produit) {
            throw new Error('Produit introuvable');
        }

        if (produit.stock <= 0) {
            throw new Error('Ce produit est en rupture de stock');
        }

        // Vérifier si le produit est déjà dans le panier
        const ligne = await db.getFirstAsync(
            `SELECT quantite FROM panier
             WHERE utilisateur_id = ? AND produit_id = ?`,
            utilisateurId,
            produitId
        );

        if (ligne) {
            if (ligne.quantite >= produit.stock) {
                throw new Error('Stock maximum atteint');
            }

            await db.runAsync(
                `UPDATE panier
                 SET quantite = quantite + 1
                 WHERE utilisateur_id = ? AND produit_id = ?`,
                utilisateurId,
                produitId
            );
        } else {
            await db.runAsync(
                `INSERT INTO panier (utilisateur_id, produit_id, quantite)
                 VALUES (?, ?, 1)`,
                utilisateurId,
                produitId
            );
        }
    });
};

// Récupérer les produits du panier d'un utilisateur
export const listerPanier = async (utilisateurId) => {
    const db = await getDb();

    return await db.getAllAsync(
        `SELECT
            produits.id AS produit_id,
            produits.nom,
            produits.categorie,
            produits.prix,
            produits.stock,
            produits.image,
            panier.quantite
         FROM panier
         INNER JOIN produits ON panier.produit_id = produits.id
         WHERE panier.utilisateur_id = ?
         ORDER BY panier.id DESC`,
        utilisateurId
    );
};

// Modifier la quantité d'un produit
export const modifierQuantitePanier = async (
    utilisateurId,
    produitId,
    quantite
) => {
    const db = await getDb();

    if (!Number.isInteger(quantite) || quantite < 1) {
        throw new Error('Quantité invalide');
    }

    const produit = await db.getFirstAsync(
        'SELECT stock FROM produits WHERE id = ?',
        produitId
    );

    if (!produit) {
        throw new Error('Produit introuvable');
    }

    if (quantite > produit.stock) {
        throw new Error('Stock maximum atteint');
    }

    await db.runAsync(
        `UPDATE panier
         SET quantite = ?
         WHERE utilisateur_id = ? AND produit_id = ?`,
        quantite,
        utilisateurId,
        produitId
    );
};

// Supprimer un produit du panier
export const supprimerDuPanier = async (utilisateurId, produitId) => {
    const db = await getDb();
    console.log('withTransactionAsync :', typeof db.withTransactionAsync);
    console.log('getFirstAsync :', typeof db.getFirstAsync);
    console.log('runAsync :', typeof db.runAsync);

    await db.runAsync(
        `DELETE FROM panier
         WHERE utilisateur_id = ? AND produit_id = ?`,
        utilisateurId,
        produitId
    );
};

// Vider le panier d'un utilisateur
export const viderPanier = async (utilisateurId) => {
    const db = await getDb();

    await db.runAsync(
        'DELETE FROM panier WHERE utilisateur_id = ?',
        utilisateurId
    );
};
