const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_TELEPHONE = /^[0-9+ ]{8,15}$/;

export const validerNom = (nom) =>
    nom.trim().length >= 5
        ? null
        : "Le nom doit contenir au moins 5 caractères";

export const validerPrenom = (prenom) =>
    prenom.trim().length >= 5
        ? null
        : "Le prénom doit contenir au moins 5 caractères";

export const validerEmail = (email) =>
    REGEX_EMAIL.test(email)
        ? null
        : "Adresse email invalide";

export const validerTelephone = (telephone) =>
    telephone.trim() !== "" && REGEX_TELEPHONE.test(telephone.trim())
        ? null
        : "Le téléphone est obligatoire ou invalide";

export const validerMdp = (mdp) => {
    if (mdp.length < 12) {
        return "12 caractères minimum";
    }

    if (!/[A-Z]/.test(mdp)) {
        return "Ajoutez au moins une majuscule";
    }

    if (!/[^A-Za-z0-9]/.test(mdp)) {
        return "Ajoutez au moins un caractère spécial";
    }

    return null;
};

export const validerConfirmation = (mdp, confirmation) =>
    mdp === confirmation
        ? null
        : "Les mots de passe ne correspondent pas";

export const validerCgu = (cgu) =>
    cgu ? null : "Vous devez accepter les CGU";

// Validation du formulaire d'inscription
export const validerFormulaire = (form, cgu) => {
    const resultats = {
        nom: validerNom(form.nom),
        prenom: validerPrenom(form.prenom),
        email: validerEmail(form.email),
        telephone: validerTelephone(form.telephone),
        mdp: validerMdp(form.mdp),
        confirmation: validerConfirmation(form.mdp, form.confirmation),
        cgu: validerCgu(cgu),
    };

    return Object.fromEntries(
        Object.entries(resultats).filter(([, message]) => message !== null)
    );
};

// Validation du mot de passe pour le login
export const validerMdpSaisi = (mdp) =>
    mdp ? null : "Le mot de passe est obligatoire";

// Validation du formulaire de connexion
export const validerFormulaireLogin = (form) => {
    const resultats = {
        email: validerEmail(form.email),
        mdp: validerMdpSaisi(form.mdp),
    };

    return Object.fromEntries(
        Object.entries(resultats).filter(([, message]) => message !== null)
    );
};
// Validation du message de contact
export const validerMessage = (message) =>
    message.trim().length >= 10
        ? null
        : "Le message doit contenir au moins 10 caractères";

// Validation du formulaire de contact
export const validerFormulaireContact = (form) => {
    const resultats = {
        nom: validerNom(form.nom),
        prenom: validerPrenom(form.prenom),
        email: validerEmail(form.email),
        message: validerMessage(form.message),
    };

    return Object.fromEntries(
        Object.entries(resultats).filter(([, message]) => message !== null)
    );
};