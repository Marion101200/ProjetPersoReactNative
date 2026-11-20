
import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    // Écran principal
    ecran: {
        flex: 1,
        backgroundColor: '#F5F0EB',
    },

    centre: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },

    // Messages
    messageErreur: {
        color: '#A65D59',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },

    vide: {
        textAlign: 'center',
        color: '#9A8580',
        fontSize: 16,
        marginTop: 40,
    },

    // Boutons généraux
    bouton: {
        backgroundColor: '#D99591',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },

    boutonPresse: {
        opacity: 0.7,
    },

    boutonTexte: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },

    // En-tête
    fixe: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },

    enteteTitre: {
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },

    titre: {
        fontSize: 25,
        fontWeight: '700',
        color: '#493B36',
        textAlign: 'center',
        paddingBottom: 20,
    },

    sousTitre: {
        fontSize: 14,
        color: '#9A8580',
        marginTop: 4,
        paddingBottom: 10,
    },

    // Recherche
    ligneRecherche: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    champRecherche: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E8DCD5',
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: '#493B36',
        marginTop: 14,
    },

    rechercheInput: {
        flex: 1,
    },

    boutonEffacerRecherche: {
        marginTop: 14,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    boutonRecherche: {
        marginTop: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
    },

    // Filtres catégories
    listePuces: {
        flexGrow: 0,
        overflow: 'visible',
        height: 75,
    },

    puces: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 16,
    },

    puce: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E8DCD5',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginRight: 10,
        minHeight: 42,
        justifyContent: 'center',
    },

    puceActive: {
        backgroundColor: '#D99591',
        borderColor: '#D99591',
    },

    puceTexte: {
        fontSize: 13,
        color: '#806E67',
    },

    puceTexteActive: {
        color: '#FFFFFF',
        fontWeight: '600',
    },

    // Liste des produits
    liste: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },

    entete: {
        paddingVertical: 16,
    },

    boutonAjout: {
        alignSelf: 'flex-start',
        marginTop: 12,
        paddingVertical: 11,
        paddingHorizontal: 18,
    },

    separateur: {
        height: 12,
    },

    pied: {
        paddingVertical: 16,
    },

    // Carte produit
    carte: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 12,
        elevation: 2,
    },

    ligneProduit: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    image: {
        width: 85,
        height: 90,
        borderRadius: 12,
        backgroundColor: '#F0E8E2',
        marginRight: 12,
    },

    carteGauche: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 5,
    },

    nom: {
        fontSize: 15,
        fontWeight: '700',
        color: '#493B36',
    },

    categorie: {
        fontSize: 13,
        color: '#A18D85',
        marginTop: 6,
    },

    infosProduit: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    prix: {
        fontSize: 16,
        fontWeight: '700',
        color: '#BD7772',
    },

    stock: {
        fontSize: 12,
        color: '#78917B',
        marginTop: 6,
    },

    rupture: {
        color: '#BD7772',
    },

    // Actions de la carte
    actionsProduit: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 12,
    },

    boutonPanier: {
        backgroundColor: '#D99591',
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 12,
        alignItems: 'center',
    },

    boutonPanierPetit: {
        flex: 1,
        marginTop: 0,
    },

    boutonFavori: {
        width: 45,
        height: 42,
        backgroundColor: '#F5E9E7',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Formulaire d'ajout
    formulaireLabel: {
        color: '#5C4540',
        fontWeight: 'bold',
        marginBottom: 6,
    },

    champDescription: {
        minHeight: 80,
        textAlignVertical: 'top',
    },

    boutonEnregistrer: {
        alignItems: 'center',
        marginTop: 15,
    },

    // Contenu des fenêtres modales
    contenuModalScroll: {
        maxHeight: 450,
    },

    contenuModalInterieur: {
        paddingBottom: 15,
    },

    boutonFermer: {
        alignItems: 'center',
    },

    // Fiche produit
    ficheImage: {
        width: '100%',
        height: 220,
        borderRadius: 16,
        backgroundColor: '#F5F0EB',
        marginBottom: 18,
    },

    ficheMarque: {
        fontSize: 13,
        color: '#A18D85',
        fontWeight: '600',
        marginBottom: 5,
    },

    ficheNom: {
        fontSize: 22,
        fontWeight: '700',
        color: '#493B36',
        marginBottom: 10,
    },

    ficheCategorie: {
        alignSelf: 'flex-start',
        backgroundColor: '#F5E9E7',
        color: '#BD7772',
        fontSize: 12,
        fontWeight: '600',
        paddingVertical: 7,
        paddingHorizontal: 13,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 15,
    },

    ficheDescription: {
        fontSize: 14,
        lineHeight: 22,
        color: '#806E67',
        marginBottom: 20,
    },

    fichePrix: {
        fontSize: 25,
        fontWeight: '700',
        color: '#BD7772',
        marginBottom: 12,
    },

    ficheStock: {
        fontSize: 13,
        color: '#78917B',
        marginBottom: 18,
    },

    ficheStockRupture: {
        color: '#BD7772',
    },

});
