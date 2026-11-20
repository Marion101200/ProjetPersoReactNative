
import { getDb } from './connexion';

const PRODUITS_DE_DEPART = [
    // Décoration
    ['Vase en céramique', 'Maison du Monde', 'Décoration', 'Vase élégant en céramique pour apporter une touche naturelle à votre intérieur.', 29.9, 15, 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500'],
    ['Miroir mural', 'Atmosphera', 'Décoration', 'Miroir mural décoratif pour agrandir et illuminer votre pièce.', 79.9, 6, 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500'],
    ['Horloge murale', 'Karlsson', 'Décoration', 'Horloge moderne pour habiller élégamment vos murs.', 39.9, 10, 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500'],
    ['Cadre photo', 'Maisons du Monde', 'Décoration', 'Cadre photo pour mettre en valeur vos plus beaux souvenirs.', 16.9, 22, 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500'],
    ['Statue décorative', 'Amadeus', 'Décoration', 'Objet décoratif pour ajouter une touche artistique à votre décoration.', 34.9, 8, 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500'],
    ['Plateau décoratif', 'H&M Home', 'Décoration', 'Plateau décoratif pratique pour organiser et décorer votre intérieur.', 24.9, 14, 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500'],

    // Éclairage
    ['Lampe de chevet', 'IKEA', 'Éclairage', 'Lampe de chevet idéale pour créer une ambiance douce dans votre chambre.', 49.9, 8, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500'],
    ['Suspension moderne', 'Lucide', 'Éclairage', 'Suspension moderne pour apporter un éclairage élégant à votre pièce.', 89.9, 5, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500'],
    ['Lampe de bureau', 'Philips', 'Éclairage', 'Lampe de bureau pratique pour éclairer votre espace de travail.', 39.9, 12, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500'],
    ['Guirlande lumineuse', 'Atmosphera', 'Éclairage', 'Guirlande lumineuse pour créer une atmosphère chaleureuse.', 19.9, 30, 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500'],
    ['Lampe sur pied', 'Maisons du Monde', 'Éclairage', 'Lampadaire élégant pour illuminer et décorer votre salon.', 119.9, 4, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500'],

    // Textile
    ['Coussin beige', 'H&M Home', 'Textile', 'Coussin doux et confortable pour habiller votre canapé ou votre lit.', 19.9, 25, 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500'],
    ['Plaid doux', 'IKEA', 'Textile', 'Plaid confortable pour profiter de moments de détente.', 44.9, 20, 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500'],
    ['Tapis berbère', 'Benuta', 'Textile', 'Tapis au style berbère pour apporter du caractère à votre intérieur.', 89.9, 7, 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=500'],
    ['Rideaux en lin', 'La Redoute Intérieurs', 'Textile', 'Rideaux en lin pour habiller vos fenêtres avec élégance.', 54.9, 9, 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500'],
    ['Housse de coussin', 'Atmosphera', 'Textile', 'Housse de coussin décorative pour renouveler facilement votre décoration.', 12.9, 35, 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500'],

    // Plantes
    ['Plante artificielle', 'IKEA', 'Plantes', 'Plante artificielle décorative sans entretien pour votre intérieur.', 24.9, 12, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500'],
    ['Pot de fleurs', 'Elho', 'Plantes', 'Pot de fleurs moderne pour accueillir vos plantes préférées.', 18.9, 20, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500'],
    ['Ficus décoratif', 'Verde', 'Plantes', 'Ficus décoratif pour apporter une touche végétale à votre maison.', 59.9, 5, 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500'],
    ['Cache-pot en terre cuite', 'Terre d\'Argile', 'Plantes', 'Cache-pot en terre cuite pour mettre en valeur vos plantes.', 22.9, 16, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500'],

    // Mobilier
    ['Table basse en bois', 'Tikamoon', 'Mobilier', 'Table basse en bois pour apporter une ambiance naturelle à votre salon.', 129.9, 4, 'https://images.unsplash.com/photo-1499933374294-4584851497cc?w=500'],
    ['Étagère murale', 'IKEA', 'Mobilier', 'Étagère murale pratique pour exposer vos objets décoratifs.', 69.9, 8, 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500'],
    ['Table de chevet', 'La Redoute Intérieurs', 'Mobilier', 'Table de chevet fonctionnelle pour aménager votre chambre.', 89.9, 6, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500'],
    ['Fauteuil scandinave', 'Sweeek', 'Mobilier', 'Fauteuil au design scandinave pour créer un coin détente.', 249.9, 3, 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500'],

    // Ambiance
    ['Bougie parfumée', 'Durance', 'Ambiance', 'Bougie parfumée pour diffuser une ambiance agréable dans votre maison.', 14.9, 30, 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500'],
    ['Diffuseur de parfum', 'Rituals', 'Ambiance', 'Diffuseur de parfum pour parfumer délicatement votre intérieur.', 27.9, 15, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500'],
    ['Encensoir décoratif', 'Amadeus', 'Ambiance', 'Encensoir décoratif pour accompagner vos moments de relaxation.', 17.9, 18, 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=500'],

    // Rangement
    ['Panier en osier', 'Atmosphera', 'Rangement', 'Panier en osier pour ranger vos affaires tout en décorant votre intérieur.', 34.9, 18, 'https://images.unsplash.com/photo-1593085260707-5377ba37f868?w=500'],
    ['Boîte de rangement', 'IKEA', 'Rangement', 'Boîte de rangement pratique pour organiser votre maison.', 21.9, 25, 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500'],
    ['Porte-bijoux', 'Umbra', 'Rangement', 'Porte-bijoux décoratif pour organiser vos accessoires.', 19.9, 11, 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500'],
];

// Initialiser la table et mettre à jour les produits
export const initProduits = async () => {
    const db = await getDb();

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS produits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            marque TEXT,
            categorie TEXT NOT NULL,
            mini_description TEXT,
            prix REAL NOT NULL,
            stock INTEGER NOT NULL DEFAULT 0,
            image TEXT
        );
    `);

    // Vérifier les colonnes existantes
    const colonnes = await db.getAllAsync(
        'PRAGMA table_info(produits)'
    );

    const nomsColonnes = colonnes.map((colonne) => colonne.name);

    if (!nomsColonnes.includes('marque')) {
        await db.execAsync(
            'ALTER TABLE produits ADD COLUMN marque TEXT'
        );
    }

    if (!nomsColonnes.includes('mini_description')) {
        await db.execAsync(
            'ALTER TABLE produits ADD COLUMN mini_description TEXT'
        );
    }

    if (!nomsColonnes.includes('image')) {
        await db.execAsync(
            'ALTER TABLE produits ADD COLUMN image TEXT'
        );
    }

    // Vérifier si la table contient déjà des produits
    const { n } = await db.getFirstAsync(
        'SELECT COUNT(*) AS n FROM produits'
    );

    // Si la table est vide, insérer les produits de départ
    if (n === 0) {
        await db.withTransactionAsync(async () => {
            for (const [
                nom,
                marque,
                categorie,
                miniDescription,
                prix,
                stock,
                image
            ] of PRODUITS_DE_DEPART) {
                await db.runAsync(
                    `INSERT INTO produits
                    (nom, marque, categorie, mini_description, prix, stock, image)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    nom,
                    marque,
                    categorie,
                    miniDescription,
                    prix,
                    stock,
                    image
                );
            }
        });

        return;
    }

    // Mettre à jour les produits déjà présents
    await db.withTransactionAsync(async () => {
        for (const [
            nom,
            marque,
            categorie,
            miniDescription,
            prix,
            stock,
            image
        ] of PRODUITS_DE_DEPART) {
            await db.runAsync(
                `UPDATE produits
                SET marque = ?,
                    mini_description = ?
                WHERE nom = ? AND categorie = ?`,
                marque,
                miniDescription,
                nom,
                categorie
            );
        }
    });
};

// Récupérer les produits avec recherche, catégorie et pagination
export const listerProduits = async ({
    recherche = '',
    categorie = null,
    limite = 10,
    decalage = 0
} = {}) => {
    const db = await getDb();

    let sql = 'SELECT * FROM produits WHERE 1=1';
    const parametres = [];

    if (recherche.trim() !== '') {
        sql += ` AND (
            nom LIKE ?
            OR marque LIKE ?
            OR mini_description LIKE ?
        )`;

        parametres.push(
            `%${recherche}%`,
            `%${recherche}%`,
            `%${recherche}%`
        );
    }

    if (categorie !== null) {
        sql += ' AND categorie = ?';
        parametres.push(categorie);
    }

    sql += ' ORDER BY id LIMIT ? OFFSET ?';
    parametres.push(limite, decalage);

    return await db.getAllAsync(sql, ...parametres);
};

// Récupérer les catégories
export const listerCategories = async () => {
    const db = await getDb();

    const lignes = await db.getAllAsync(
        'SELECT DISTINCT categorie FROM produits ORDER BY categorie'
    );

    return lignes.map((ligne) => ligne.categorie);
};

// Compter les produits selon les filtres
export const compterProduits = async ({
    recherche = '',
    categorie = null
} = {}) => {
    const db = await getDb();

    let sql = 'SELECT COUNT(*) AS total FROM produits WHERE 1=1';
    const parametres = [];

    if (recherche.trim() !== '') {
        sql += ` AND (
            nom LIKE ?
            OR marque LIKE ?
            OR mini_description LIKE ?
        )`;

        parametres.push(
            `%${recherche}%`,
            `%${recherche}%`,
            `%${recherche}%`
        );
    }

    if (categorie !== null) {
        sql += ' AND categorie = ?';
        parametres.push(categorie);
    }

    const resultat = await db.getFirstAsync(sql, ...parametres);

    return resultat.total;
};

// Ajouter un produit
export const insererProduit = async (
    nom,
    categorie,
    prix,
    stock,
    image = null,
    marque = null,
    miniDescription = null
) => {
    const db = await getDb();

    await db.runAsync(
        `INSERT INTO produits
        (nom, categorie, prix, stock, image, marque, mini_description)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        nom,
        categorie,
        prix,
        stock,
        image,
        marque,
        miniDescription
    );
};
