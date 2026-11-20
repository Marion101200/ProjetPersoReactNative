
import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    Pressable,
    ActivityIndicator,
    Image,
    Alert,
    ScrollView
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import styles from './ProduitsStyles';
import ModalPersonnalisee from '../screens/FicheProduitsScreen';
import { AuthContext } from '../context/AuthContext';

import {
    initDb,
    listerProduits,
    listerCategories,
    insererProduit,
    compterProduits,
    listerIdsFavoris,
    basculerFavori,
    ajouterAuPanier
} from '../database';

const TAILLE_PAGE = 10;

const formaterPrix = (prix) =>
    Number(prix).toFixed(2).replace('.', ',') + ' €';

// Carte d'un produit
const CarteProduit = ({
    produit,
    estFavori,
    onToggleFavori,
    onVoirDetails,
    onAjouterPanier
}) => (
    <View style={styles.carte}>
        <Pressable onPress={() => onVoirDetails(produit)}>
            <View style={styles.ligneProduit}>
                {produit.image ? (
                    <Image
                        source={{ uri: produit.image }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.image} />
                )}

                <View style={styles.carteGauche}>
                    <Text style={styles.nom}>
                        {produit.nom}
                    </Text>

                    <Text style={styles.categorie}>
                        {produit.categorie}
                    </Text>
                </View>

                <View style={styles.infosProduit}>
                    <Text style={styles.prix}>
                        {formaterPrix(produit.prix)}
                    </Text>

                    <Text style={[
                        styles.stock,
                        Number(produit.stock) === 0 && styles.rupture
                    ]}>
                        {Number(produit.stock) === 0
                            ? 'En rupture'
                            : `Stock : ${produit.stock}`}
                    </Text>
                </View>
            </View>
        </Pressable>

        <View style={styles.actionsProduit}>
            <Pressable
                onPress={() => onAjouterPanier(produit)}
                style={({ pressed }) => [
                    styles.boutonPanier,
                    styles.boutonPanierPetit,
                    pressed && styles.boutonPresse
                ]}
            >
                <Text style={styles.boutonTexte}>
                    Ajouter au panier
                </Text>
            </Pressable>

            <Pressable
                onPress={() => onToggleFavori(produit.id)}
                style={styles.boutonFavori}
            >
                <Ionicons
                    name={estFavori ? 'heart' : 'heart-outline'}
                    size={25}
                    color={estFavori ? '#D96C75' : '#9A8580'}
                />
            </Pressable>
        </View>
    </View>
);

const Separateur = () => <View style={styles.separateur} />;

export const ProduitsScreen = () => {

    const { utilisateur } = useContext(AuthContext);

    const [produits, setProduits] = useState([]);
    const [categories, setCategories] = useState([]);

    const [recherche, setRecherche] = useState('');
    const [rechercheFiltree, setRechercheFiltree] = useState('');

    const [categorie, setCategorie] = useState(null);
    const [version, setVersion] = useState(0);

    const [total, setTotal] = useState(0);
    const [chargement, setChargement] = useState(true);
    const [chargementPlus, setChargementPlus] = useState(false);
    const [rafraichissement, setRafraichissement] = useState(false);
    const [erreur, setErreur] = useState(null);

    const [favoris, setFavoris] = useState([]);

    const [produitSelectionne, setProduitSelectionne] = useState(null);
    const [modalAjoutVisible, setModalAjoutVisible] = useState(false);

    const [nomProduit, setNomProduit] = useState('');
    const [marqueProduit, setMarqueProduit] = useState('');
    const [categorieProduit, setCategorieProduit] = useState('');
    const [descriptionProduit, setDescriptionProduit] = useState('');
    const [prixProduit, setPrixProduit] = useState('');
    const [stockProduit, setStockProduit] = useState('');
    const [imageProduit, setImageProduit] = useState('');

    const generation = useRef(0);

    // Charger les favoris
    useEffect(() => {
        let actif = true;

        const chargerFavoris = async () => {
            try {
                if (!utilisateur?.id) {
                    setFavoris([]);
                    return;
                }

                await initDb();

                const ids = await listerIdsFavoris(utilisateur.id);

                if (actif) {
                    setFavoris(ids.map(Number));
                }

            } catch (e) {
                console.log('Erreur chargement favoris :', e);
            }
        };

        chargerFavoris();

        return () => {
            actif = false;
        };

    }, [utilisateur?.id]);

    // Ajouter au panier
    const gererAjoutPanier = useCallback(async (produit) => {
        if (!utilisateur?.id) return;

        try {
            await ajouterAuPanier(utilisateur.id, produit.id);

            Alert.alert(
                'Panier',
                `${produit.nom} a été ajouté au panier !`
            );

        } catch (e) {
            Alert.alert('Erreur', e.message);
        }

    }, [utilisateur?.id]);

    // Gérer les favoris
    const gererFavori = useCallback(async (produitId) => {
        if (!utilisateur?.id) return;

        try {
            const ajoute = await basculerFavori(
                utilisateur.id,
                produitId
            );

            if (ajoute) {
                setFavoris((anciens) => [
                    ...anciens,
                    Number(produitId)
                ]);

            } else {
                setFavoris((anciens) =>
                    anciens.filter((id) => id !== Number(produitId))
                );
            }

        } catch (e) {
            console.log('Erreur favori :', e);
        }

    }, [utilisateur?.id]);

    // Charger les catégories
    useEffect(() => {
        let actif = true;

        const chargerCategories = async () => {
            try {
                await initDb();

                const liste = await listerCategories();

                if (actif) {
                    setCategories([null, ...liste]);
                }

            } catch (e) {
                console.log('Erreur chargement catégories :', e);
            }
        };

        chargerCategories();

        return () => {
            actif = false;
        };

    }, [version, utilisateur?.id]);

    // Lancer la recherche manuellement
    const lancerRecherche = () => {
        setRechercheFiltree(recherche.trim());
    };

    // Effacer la recherche
    const effacerRecherche = () => {
        setRecherche('');
        setRechercheFiltree('');
    };

    // Charger les produits
    useEffect(() => {
        let actuel = true;

        generation.current += 1;

        const lire = async () => {
            try {
                setChargement(true);

                await initDb();

                const [lignes, nombre] = await Promise.all([
                    listerProduits({
                        recherche: rechercheFiltree,
                        categorie,
                        limite: TAILLE_PAGE,
                        decalage: 0,
                    }),

                    compterProduits({
                        recherche: rechercheFiltree,
                        categorie
                    }),
                ]);

                if (actuel) {
                    setProduits(lignes);
                    setTotal(nombre);
                    setErreur(null);
                }

            } catch (e) {
                console.log('Erreur chargement produits :', e);

                if (actuel) {
                    setErreur('Impossible de charger les produits');
                }

            } finally {
                if (actuel) {
                    setChargement(false);
                    setRafraichissement(false);
                }
            }
        };

        lire();

        return () => {
            actuel = false;
        };

    }, [rechercheFiltree, categorie, version, utilisateur?.id]);

    // Charger les pages suivantes
    const chargerPlus = async () => {
        if (chargementPlus || produits.length >= total) return;

        const lecture = generation.current;

        setChargementPlus(true);

        try {
            const suite = await listerProduits({
                recherche: rechercheFiltree,
                categorie,
                limite: TAILLE_PAGE,
                decalage: produits.length,
            });

            if (lecture !== generation.current) return;

            setProduits((actuels) => [...actuels, ...suite]);

        } catch (e) {
            console.log(e);

        } finally {
            setChargementPlus(false);
        }
    };

    // Recharger les produits
    const recharger = () => {
        setVersion((v) => v + 1);
    };

    // Réessayer après une erreur
    const reessayer = () => {
        setChargement(true);
        setErreur(null);
        recharger();
    };

    // Actualiser et réinitialiser la recherche
    const rafraichir = () => {
        setRecherche('');
        setRechercheFiltree('');
        setRafraichissement(true);
        recharger();
    };

    // Vider le formulaire
    const viderFormulaire = () => {
        setNomProduit('');
        setMarqueProduit('');
        setCategorieProduit('');
        setDescriptionProduit('');
        setPrixProduit('');
        setStockProduit('');
        setImageProduit('');
    };

    // Ajouter un produit
    const ajouter = async () => {

        if (
            nomProduit.trim() === '' ||
            categorieProduit.trim() === '' ||
            prixProduit.trim() === '' ||
            stockProduit.trim() === ''
        ) {
            Alert.alert(
                'Erreur',
                'Veuillez remplir les champs obligatoires.'
            );
            return;
        }

        const prix = Number(prixProduit.replace(',', '.'));
        const stock = Number(stockProduit);

        if (!Number.isFinite(prix) || prix < 0) {
            Alert.alert('Erreur', 'Veuillez saisir un prix valide.');
            return;
        }

        if (!Number.isInteger(stock) || stock < 0) {
            Alert.alert('Erreur', 'Veuillez saisir un stock valide.');
            return;
        }

        try {
            await insererProduit(
                nomProduit.trim(),
                categorieProduit.trim(),
                prix,
                stock,
                imageProduit.trim() === '' ? null : imageProduit.trim(),
                marqueProduit.trim() === '' ? null : marqueProduit.trim(),
                descriptionProduit.trim() === '' ? null : descriptionProduit.trim()
            );

            // Actualiser les catégories
            const nouvellesCategories = await listerCategories();

            setCategories([null, ...nouvellesCategories]);

            viderFormulaire();
            setModalAjoutVisible(false);
            recharger();

            Alert.alert('Succès', 'Le produit a bien été ajouté !');

        } catch (e) {
            console.log(e);
            Alert.alert('Erreur', "Impossible d'ajouter le produit.");
        }
    };

    if (chargement) {
        return (
            <SafeAreaView
                style={[styles.ecran, styles.centre]}
                edges={['left', 'right', 'bottom']}
            >
                <ActivityIndicator size="large" color="#D99591" />
            </SafeAreaView>
        );
    }

    if (erreur) {
        return (
            <SafeAreaView
                style={[styles.ecran, styles.centre]}
                edges={['left', 'right', 'bottom']}
            >
                <Text style={styles.messageErreur}>
                    {erreur}
                </Text>

                <Pressable
                    onPress={reessayer}
                    style={({ pressed }) => [
                        styles.bouton,
                        pressed && styles.boutonPresse
                    ]}
                >
                    <Text style={styles.boutonTexte}>
                        Réessayer
                    </Text>
                </Pressable>
            </SafeAreaView>
        );
    }

    const filtreActif =
        rechercheFiltree.trim() !== '' || categorie !== null;

    return (
        <SafeAreaView
            style={styles.ecran}
            edges={['left', 'right', 'bottom']}
        >
            <View style={styles.fixe}>

                {/* Titre */}
                <View style={styles.enteteTitre}>
                    <Text style={styles.titre}>
                        Produits
                    </Text>

                    <Text style={styles.sousTitre}>
                        {produits.length} / {total} produit(s)
                    </Text>
                </View>

                {/* Barre de recherche */}
                <View style={styles.ligneRecherche}>
                    <TextInput
                        style={[
                            styles.champRecherche,
                            styles.rechercheInput
                        ]}
                        placeholder="Rechercher un produit"
                        placeholderTextColor="#9CA3AF"
                        autoCorrect={false}
                        value={recherche}
                        onChangeText={setRecherche}
                        onSubmitEditing={lancerRecherche}
                        returnKeyType="search"
                    />

                    {recherche !== '' && (
                        <Pressable
                            onPress={effacerRecherche}
                            style={styles.boutonEffacerRecherche}
                        >
                            <Ionicons
                                name="close-circle"
                                size={24}
                                color="#9A8580"
                            />
                        </Pressable>
                    )}

                    <Pressable
                        onPress={lancerRecherche}
                        style={({ pressed }) => [
                            styles.bouton,
                            styles.boutonRecherche,
                            pressed && styles.boutonPresse
                        ]}
                    >
                        <Ionicons
                            name="search"
                            size={22}
                            color="#FFFFFF"
                        />
                    </Pressable>
                </View>
            </View>

            {/* Filtres par catégorie */}
            <FlatList
                horizontal
                data={categories}
                extraData={categorie}
                keyExtractor={(c, index) => c ?? `categorie-${index}`}
                style={styles.listePuces}
                contentContainerStyle={styles.puces}
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                removeClippedSubviews={false}
                renderItem={({ item: c }) => (
                    <Pressable
                        onPress={() => setCategorie(c)}
                        style={[
                            styles.puce,
                            categorie === c && styles.puceActive
                        ]}
                    >
                        <Text
                            style={[
                                styles.puceTexte,
                                categorie === c && styles.puceTexteActive
                            ]}
                        >
                            {c ?? 'Toutes'}
                        </Text>
                    </Pressable>
                )}
            />

            {/* Liste des produits */}
            <FlatList
                data={produits}
                keyExtractor={(item, index) => String(item.id ?? index)}
                extraData={favoris}
                renderItem={({ item }) => (
                    <CarteProduit
                        produit={item}
                        estFavori={favoris.includes(Number(item.id))}
                        onToggleFavori={gererFavori}
                        onVoirDetails={setProduitSelectionne}
                        onAjouterPanier={gererAjoutPanier}
                    />
                )}
                ItemSeparatorComponent={Separateur}
                onEndReached={chargerPlus}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    chargementPlus ? (
                        <ActivityIndicator
                            style={styles.pied}
                            color="#D99591"
                        />
                    ) : null
                }
                ListHeaderComponent={
                    <View style={styles.entete}>
                        <Pressable
                            onPress={() => setModalAjoutVisible(true)}
                            style={({ pressed }) => [
                                styles.bouton,
                                styles.boutonAjout,
                                pressed && styles.boutonPresse
                            ]}
                        >
                            <Text style={styles.boutonTexte}>
                                + Ajouter un produit
                            </Text>
                        </Pressable>
                    </View>
                }
                ListEmptyComponent={
                    <Text style={styles.vide}>
                        {filtreActif
                            ? 'Aucun produit ne correspond'
                            : 'Aucun produit à afficher'}
                    </Text>
                }
                refreshing={rafraichissement}
                onRefresh={rafraichir}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.liste}
            />

            {/* Modal d'ajout */}
            <ModalPersonnalisee
                visible={modalAjoutVisible}
                titre="Ajouter un produit"
                onFermer={() => setModalAjoutVisible(false)}
            >
                <ScrollView
                    style={styles.contenuModalScroll}
                    showsVerticalScrollIndicator={true}
                    keyboardShouldPersistTaps="handled"
                    nestedScrollEnabled={true}
                    contentContainerStyle={styles.contenuModalInterieur}
                >
                    <View>
                        <Text style={styles.formulaireLabel}>
                            Nom du produit *
                        </Text>

                        <TextInput
                            style={styles.champRecherche}
                            placeholder="Ex : Lampe de chevet"
                            value={nomProduit}
                            onChangeText={setNomProduit}
                        />

                        <Text style={styles.formulaireLabel}>
                            Marque
                        </Text>

                        <TextInput
                            style={styles.champRecherche}
                            placeholder="Ex : IKEA"
                            value={marqueProduit}
                            onChangeText={setMarqueProduit}
                        />

                        <Text style={styles.formulaireLabel}>
                            Catégorie *
                        </Text>

                        <TextInput
                            style={styles.champRecherche}
                            placeholder="Ex : Décoration"
                            value={categorieProduit}
                            onChangeText={setCategorieProduit}
                        />

                        <Text style={styles.formulaireLabel}>
                            Mini-description
                        </Text>

                        <TextInput
                            style={[
                                styles.champRecherche,
                                styles.champDescription
                            ]}
                            placeholder="Décrivez brièvement le produit..."
                            value={descriptionProduit}
                            onChangeText={setDescriptionProduit}
                            multiline
                        />

                        <Text style={styles.formulaireLabel}>
                            Prix (€) *
                        </Text>

                        <TextInput
                            style={styles.champRecherche}
                            placeholder="Ex : 29.90"
                            value={prixProduit}
                            onChangeText={setPrixProduit}
                            keyboardType="decimal-pad"
                        />

                        <Text style={styles.formulaireLabel}>
                            Stock *
                        </Text>

                        <TextInput
                            style={styles.champRecherche}
                            placeholder="Ex : 10"
                            value={stockProduit}
                            onChangeText={setStockProduit}
                            keyboardType="number-pad"
                        />

                        <Text style={styles.formulaireLabel}>
                            URL de l'image (facultatif)
                        </Text>

                        <TextInput
                            style={styles.champRecherche}
                            placeholder="https://..."
                            value={imageProduit}
                            onChangeText={setImageProduit}
                            autoCapitalize="none"
                            keyboardType="url"
                        />

                        <Pressable
                            onPress={ajouter}
                            style={({ pressed }) => [
                                styles.bouton,
                                styles.boutonEnregistrer,
                                pressed && styles.boutonPresse
                            ]}
                        >
                            <Text style={styles.boutonTexte}>
                                Enregistrer le produit
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </ModalPersonnalisee>

            {/* Modal détails du produit */}
            <ModalPersonnalisee
                visible={produitSelectionne !== null}
                titre="Détails du produit"
                onFermer={() => setProduitSelectionne(null)}
            >
                {produitSelectionne && (
                    <ScrollView
                        style={styles.contenuModalScroll}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contenuModalInterieur}
                    >
                        {produitSelectionne.image ? (
                            <Image
                                source={{ uri: produitSelectionne.image }}
                                style={styles.ficheImage}
                                resizeMode="cover"
                            />
                        ) : (
                            <View style={styles.ficheImage} />
                        )}

                        <Text style={styles.ficheMarque}>
                            {produitSelectionne.marque || 'Notre collection'}
                        </Text>

                        <Text style={styles.ficheNom}>
                            {produitSelectionne.nom}
                        </Text>

                        <Text style={styles.ficheCategorie}>
                            {produitSelectionne.categorie}
                        </Text>

                        <Text style={styles.ficheDescription}>
                            {produitSelectionne.mini_description ||
                                'Découvrez ce produit de notre collection.'}
                        </Text>

                        <Text style={styles.fichePrix}>
                            {formaterPrix(produitSelectionne.prix)}
                        </Text>

                        <Text style={[
                            styles.ficheStock,
                            Number(produitSelectionne.stock) <= 0 &&
                            styles.ficheStockRupture
                        ]}>
                            {Number(produitSelectionne.stock) > 0
                                ? `${produitSelectionne.stock} article(s) disponible(s)`
                                : 'Produit actuellement indisponible'}
                        </Text>

                        <Pressable
                            onPress={() => setProduitSelectionne(null)}
                            style={({ pressed }) => [
                                styles.bouton,
                                styles.boutonFermer,
                                pressed && styles.boutonPresse
                            ]}
                        >
                            <Text style={styles.boutonTexte}>
                                Fermer
                            </Text>
                        </Pressable>
                    </ScrollView>
                )}
            </ModalPersonnalisee>

        </SafeAreaView>
    );
};
