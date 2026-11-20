
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    // COULEURS GÉNÉRALES

    safe: {
        flex: 1,
        backgroundColor: "#F7F3EF",
    },

    container: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 24,
        paddingBottom: 35,
        backgroundColor: "#F7F3EF",
    },

    containerInscription: {
        padding: 24,
        paddingBottom: 35,
        backgroundColor: "#F7F3EF",
    },

    // EN-TÊTE AUTHENTIFICATION

    enteteAuth: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 25,
    },

    logoFond: {
        width: 75,
        height: 75,
        borderRadius: 25,
        backgroundColor: "#F0E3DD",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 18,
    },

    logo: {
        width: 43,
        height: 43,
        resizeMode: "contain",
    },

    surtitre: {
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 2,
        color: "#B98780",
        marginBottom: 8,
    },

    login: {
        fontSize: 30,
        fontWeight: "800",
        color: "#493B36",
        textAlign: "center",
        marginBottom: 8,
    },

    descriptionAuth: {
        fontSize: 14,
        color: "#94847B",
        textAlign: "center",
        lineHeight: 21,
        paddingHorizontal: 12,
    },

    // CARTE DU FORMULAIRE

    carteAuth: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: 22,
        borderWidth: 1,
        borderColor: "#F0E8E2",

        shadowColor: "#493B36",
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 5 },
        elevation: 3,
    },

    titreFormulaire: {
        fontSize: 21,
        fontWeight: "800",
        color: "#493B36",
        marginBottom: 5,
    },

    formulaireDescription: {
        fontSize: 13,
        color: "#A3948B",
        marginBottom: 20,
    },

    libelleChamp: {
        fontSize: 13,
        fontWeight: "700",
        color: "#594840",
        marginTop: 15,
        marginBottom: 8,
    },

    champ: {
        backgroundColor: "#FBF9F7",
        borderWidth: 1,
        borderColor: "#EAE1DA",
        borderRadius: 12,
        paddingVertical: 13,
        paddingHorizontal: 15,
        fontSize: 14,
        color: "#493B36",
        marginTop: 0,
    },

    champErreur: {
        borderColor: "#D96C75",
        borderWidth: 1,
    },

    erreur: {
        color: "#D45F68",
        fontSize: 12,
        marginTop: 6,
        marginLeft: 3,
        marginBottom: 3,
    },

    // LIENS

    lienAuth: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 8,
        paddingVertical: 5,
    },

    texteLienAuth: {
        fontSize: 13,
        color: "#94847B",
        textAlign: "center",
    },

    texteLienFort: {
        color: "#C7837E",
        fontWeight: "700",
    },

    lienPresse: {
        opacity: 0.6,
    },

    // BOUTONS

    bouton: {
        backgroundColor: "#D99591",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 13,
        marginTop: 12,
        alignItems: "center",

        shadowColor: "#D99591",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },

    boutonPresse: {
        backgroundColor: "#BD7773",
        opacity: 0.9,
    },

    boutonTexte: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
        textAlign: "center",
    },

    piedAuth: {
        color: "#B3A49B",
        fontSize: 12,
        textAlign: "center",
        marginTop: 24,
        marginBottom: 10,
        letterSpacing: 0.5,
    },

    // INSCRIPTION : PRÉFÉRENCES

    separateurAuth: {
        height: 1,
        backgroundColor: "#F0E8E2",
        marginTop: 25,
        marginBottom: 20,
    },

    titreOptions: {
        fontSize: 17,
        fontWeight: "700",
        color: "#493B36",
        marginBottom: 8,
    },

    ligneSwitch: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15,
        paddingVertical: 5,
    },

    texteSwitch: {
        flex: 1,
        paddingRight: 10,
    },

    libelle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#594840",
    },

    descriptionSwitch: {
        fontSize: 12,
        color: "#A3948B",
        marginTop: 4,
    },

    // AUTRES ÉCRANS : CONTACT

    conteneurContact: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#F7F3EF",
    },

    texteContact: {
        fontSize: 14,
        color: "#94847B",
        textAlign: "center",
        marginBottom: 15,
    },

    champMessage: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#EAE1DA",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 14,
        fontSize: 15,
        color: "#493B36",
        marginTop: 30,
        minHeight: 120,
    },

    succes: {
        color: "#78917B",
        fontSize: 14,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 15,
    },

    saisie: {
        color: "#C7837E",
        fontWeight: "700",
        fontSize: 14,
        marginTop: 15,
        marginBottom: 15,
        textAlign: "center",
    },

    ligneImages: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        marginTop: 12,
    },

    // MODIFIER COMPTE

    conteneurCompte: {
        padding: 20,
        paddingBottom: 35,
    },

    titreCompte: {
        fontSize: 26,
        fontWeight: "700",
        color: "#493B36",
        textAlign: "center",
    },

    sousTitreCompte: {
        fontSize: 14,
        color: "#9A8580",
        marginTop: 5,
        marginBottom: 20,
        textAlign: "center",
    },

    carteCompte: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 18,
        elevation: 2,
    },

    libelleCompte: {
        fontSize: 14,
        fontWeight: "600",
        color: "#493B36",
        marginBottom: 7,
        marginTop: 14,
    },

    champCompte: {
        backgroundColor: "#FBF9F7",
        borderWidth: 1,
        borderColor: "#EAE1DA",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 15,
        color: "#493B36",
    },

    separateurCompte: {
        height: 1,
        backgroundColor: "#EAE1DA",
        marginVertical: 22,
    },

    sectionCompte: {
        fontSize: 18,
        fontWeight: "700",
        color: "#493B36",
    },

    aideCompte: {
        fontSize: 12,
        color: "#9A8580",
        marginTop: 6,
    },

    boutonCompte: {
        backgroundColor: "#D99591",
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 24,
    },

    succesCompte: {
        color: "#78917B",
        fontSize: 14,
        marginTop: 15,
        textAlign: "center",
    },

});

export default styles;
