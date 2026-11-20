
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { modifierUtilisateur } from '../database';
import { validerNom, validerPrenom, validerEmail, validerTelephone, validerMdp, validerConfirmation, } from '../utils/validation';
import styles from '../src/styles';

export default function ModifierCompteScreen({
    utilisateur,
    setUtilisateur,
}) {
    const [nom, setNom] = useState(utilisateur.nom || '');
    const [prenom, setPrenom] = useState(utilisateur.prenom || '');
    const [email, setEmail] = useState(utilisateur.email || '');
    const [telephone, setTelephone] = useState(utilisateur.telephone || '');
    const [mdp, setMdp] = useState('');
    const [confirmation, setConfirmation] = useState('');

    const [erreurs, setErreurs] = useState({});
    const [succes, setSucces] = useState('');

    useEffect(() => {
        setNom(utilisateur.nom || '');
        setPrenom(utilisateur.prenom || '');
        setEmail(utilisateur.email || '');
        setTelephone(utilisateur.telephone || '');
    }, [utilisateur]);

    const enregistrer = async () => {
        const nouvellesErreurs = {
            nom: validerNom(nom),
            prenom: validerPrenom(prenom),
            email: validerEmail(email),
            telephone: validerTelephone(telephone),
        };

        if (mdp.trim() !== '' || confirmation.trim() !== '') {
            nouvellesErreurs.mdp = validerMdp(mdp);
            nouvellesErreurs.confirmation =
                validerConfirmation(mdp, confirmation);
        }

        const erreursFiltrees = Object.fromEntries(
            Object.entries(nouvellesErreurs)
                .filter(([, message]) => message !== null)
        );

        setErreurs(erreursFiltrees);
        setSucces('');

        if (Object.keys(erreursFiltrees).length > 0) return;

        try {
            const utilisateurModifie = await modifierUtilisateur({
                id: utilisateur.id,
                nom,
                prenom,
                email,
                telephone,
                mdp,
            });

            setUtilisateur(utilisateurModifie);
            setMdp('');
            setConfirmation('');
            setSucces('Vos informations ont bien été modifiées !');

        } catch (e) {
            console.log('Erreur modification :', e);

            if (e.message.includes('UNIQUE')) {
                setErreurs({
                    email: 'Cette adresse email est déjà utilisée',
                });
            } else {
                setErreurs({
                    formulaire: 'Impossible de modifier votre compte',
                });
            }
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.conteneurCompte}>

                <Text style={styles.titreCompte}>Mon compte</Text>
                <Text style={styles.sousTitreCompte}>
                    Modifiez vos informations personnelles
                </Text>

                <View style={styles.carteCompte}>

                    <Text style={styles.libelleCompte}>Nom</Text>
                    <TextInput
                        style={styles.champCompte}
                        value={nom}
                        onChangeText={setNom}
                        placeholder="Votre nom"
                    />
                    {erreurs.nom && (
                        <Text style={styles.erreur}>{erreurs.nom}</Text>
                    )}

                    <Text style={styles.libelleCompte}>Prénom</Text>
                    <TextInput
                        style={styles.champCompte}
                        value={prenom}
                        onChangeText={setPrenom}
                        placeholder="Votre prénom"
                    />
                    {erreurs.prenom && (
                        <Text style={styles.erreur}>{erreurs.prenom}</Text>
                    )}

                    <Text style={styles.libelleCompte}>Adresse email</Text>
                    <TextInput
                        style={styles.champCompte}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Votre adresse email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    {erreurs.email && (
                        <Text style={styles.erreur}>{erreurs.email}</Text>
                    )}

                    <Text style={styles.libelleCompte}>Téléphone</Text>
                    <TextInput
                        style={styles.champCompte}
                        value={telephone}
                        onChangeText={setTelephone}
                        placeholder="Votre téléphone"
                        keyboardType="phone-pad"
                    />
                    {erreurs.telephone && (
                        <Text style={styles.erreur}>
                            {erreurs.telephone}
                        </Text>
                    )}

                    <View style={styles.separateurCompte} />

                    <Text style={styles.sectionCompte}>
                        Changer de mot de passe
                    </Text>
                    <Text style={styles.aideCompte}>
                        Laissez ces champs vides pour conserver votre mot de passe actuel.
                    </Text>

                    <Text style={styles.libelleCompte}>Nouveau mot de passe</Text>
                    <TextInput
                        style={styles.champCompte}
                        value={mdp}
                        onChangeText={setMdp}
                        placeholder="Nouveau mot de passe"
                        secureTextEntry
                    />
                    {erreurs.mdp && (
                        <Text style={styles.erreur}>{erreurs.mdp}</Text>
                    )}

                    <Text style={styles.libelleCompte}>
                        Confirmer le mot de passe
                    </Text>
                    <TextInput
                        style={styles.champCompte}
                        value={confirmation}
                        onChangeText={setConfirmation}
                        placeholder="Confirmer le mot de passe"
                        secureTextEntry
                    />
                    {erreurs.confirmation && (
                        <Text style={styles.erreur}>
                            {erreurs.confirmation}
                        </Text>
                    )}

                    {erreurs.formulaire && (
                        <Text style={styles.erreur}>
                            {erreurs.formulaire}
                        </Text>
                    )}

                    {succes !== '' && (
                        <Text style={styles.succesCompte}>{succes}</Text>
                    )}

                    <Pressable
                        onPress={enregistrer}
                        style={({ pressed }) => [
                            styles.boutonCompte,
                            pressed && styles.boutonPresse,
                        ]}
                    >
                        <Text style={styles.boutonTexte}>
                            Enregistrer les modifications
                        </Text>
                    </Pressable>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
