
import { useState, useRef } from "react";
import {
    Pressable,
    Text,
    TextInput,
    View,
    Image,
    ScrollView,
    Switch
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import styles from "../src/styles";
import { validerFormulaire as verifierFormulaire } from "../utils/validation";
import { initDb, insererUtilisateur } from "../database";

export default function InscriptionScreen() {
    const [email, setEmail] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [cgu, setCgu] = useState(false);
    const [newsletter, setNewsletter] = useState(false);
    const [erreurs, setErreurs] = useState({});

    const navigation = useNavigation();
    const nomRef = useRef(null);

    async function envoyerFormulaire() {
        const formulaire = {
            email,
            nom,
            prenom,
            telephone,
            mdp: motDePasse,
            confirmation,
        };

        const nouvellesErreurs = verifierFormulaire(formulaire, cgu);

        setErreurs(nouvellesErreurs);

        if (Object.keys(nouvellesErreurs).length > 0) return;

        try {
            await initDb();

            await insererUtilisateur({
                ...formulaire,
                newsletter,
                cgu
            });

            console.log("Inscription enregistrée !");
            console.log("Newsletter :", newsletter);

            navigation.navigate("Login");

        } catch (erreur) {
            console.log("Erreur inscription :", erreur);

            if (erreur.message.includes("UNIQUE")) {
                setErreurs({
                    email: "Cette adresse email est déjà utilisée",
                });
            } else {
                setErreurs({
                    formulaire: "Impossible d'enregistrer votre inscription",
                });
            }
        }
    }

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView
                contentContainerStyle={styles.containerInscription}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.enteteAuth}>
                    <Text style={styles.surtitre}>
                        REJOIGNEZ NOTRE UNIVERS
                    </Text>

                    <Text style={styles.login}>
                        Créer un compte
                    </Text>

                    <Text style={styles.descriptionAuth}>
                        Quelques informations pour rejoindre notre boutique.
                    </Text>
                </View>

                <View style={styles.carteAuth}>
                    <Text style={styles.titreFormulaire}>
                        Vos informations
                    </Text>

                    <Text style={styles.formulaireDescription}>
                        Les champs marqués sont obligatoires.
                    </Text>

                    <Text style={styles.libelleChamp}>
                        Nom *
                    </Text>

                    <TextInput
                        ref={nomRef}
                        autoFocus
                        placeholder="Votre nom"
                        placeholderTextColor="#B5AAA2"
                        style={[
                            styles.champ,
                            erreurs.nom && styles.champErreur
                        ]}
                        value={nom}
                        onChangeText={setNom}
                    />

                    {erreurs.nom && (
                        <Text style={styles.erreur}>{erreurs.nom}</Text>
                    )}

                    <Text style={styles.libelleChamp}>
                        Prénom *
                    </Text>

                    <TextInput
                        placeholder="Votre prénom"
                        placeholderTextColor="#B5AAA2"
                        style={[
                            styles.champ,
                            erreurs.prenom && styles.champErreur
                        ]}
                        value={prenom}
                        onChangeText={setPrenom}
                    />

                    {erreurs.prenom && (
                        <Text style={styles.erreur}>{erreurs.prenom}</Text>
                    )}

                    <Text style={styles.libelleChamp}>
                        Adresse email *
                    </Text>

                    <TextInput
                        placeholder="exemple@email.com"
                        placeholderTextColor="#B5AAA2"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={[
                            styles.champ,
                            erreurs.email && styles.champErreur
                        ]}
                        value={email}
                        onChangeText={setEmail}
                    />

                    {erreurs.email && (
                        <Text style={styles.erreur}>{erreurs.email}</Text>
                    )}

                    <Text style={styles.libelleChamp}>
                        Téléphone
                    </Text>

                    <TextInput
                        placeholder="Votre numéro de téléphone"
                        placeholderTextColor="#B5AAA2"
                        keyboardType="numeric"
                        style={[
                            styles.champ,
                            erreurs.telephone && styles.champErreur
                        ]}
                        value={telephone}
                        onChangeText={setTelephone}
                    />

                    {erreurs.telephone && (
                        <Text style={styles.erreur}>{erreurs.telephone}</Text>
                    )}

                    <Text style={styles.libelleChamp}>
                        Mot de passe *
                    </Text>

                    <TextInput
                        placeholder="Choisissez un mot de passe"
                        placeholderTextColor="#B5AAA2"
                        secureTextEntry={true}
                        style={[
                            styles.champ,
                            erreurs.mdp && styles.champErreur
                        ]}
                        value={motDePasse}
                        onChangeText={setMotDePasse}
                    />

                    {erreurs.mdp && (
                        <Text style={styles.erreur}>{erreurs.mdp}</Text>
                    )}

                    <Text style={styles.libelleChamp}>
                        Confirmation du mot de passe *
                    </Text>

                    <TextInput
                        placeholder="Confirmez votre mot de passe"
                        placeholderTextColor="#B5AAA2"
                        secureTextEntry={true}
                        style={[
                            styles.champ,
                            erreurs.confirmation && styles.champErreur
                        ]}
                        value={confirmation}
                        onChangeText={setConfirmation}
                    />

                    {erreurs.confirmation && (
                        <Text style={styles.erreur}>
                            {erreurs.confirmation}
                        </Text>
                    )}

                    <View style={styles.separateurAuth} />

                    <Text style={styles.titreOptions}>
                        Vos préférences
                    </Text>

                    <View style={styles.ligneSwitch}>
                        <View style={styles.texteSwitch}>
                            <Text style={styles.libelle}>
                                Newsletter
                            </Text>
                            <Text style={styles.descriptionSwitch}>
                                Recevoir nos nouveautés et actualités
                            </Text>
                        </View>

                        <Switch
                            value={newsletter}
                            onValueChange={setNewsletter}
                            trackColor={{
                                false: "#E8DED7",
                                true: "#D99591"
                            }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    <View style={styles.ligneSwitch}>
                        <View style={styles.texteSwitch}>
                            <Text style={styles.libelle}>
                                Conditions d'utilisation *
                            </Text>
                            <Text style={styles.descriptionSwitch}>
                                J'accepte les CGU
                            </Text>
                        </View>

                        <Switch
                            value={cgu}
                            onValueChange={setCgu}
                            trackColor={{
                                false: "#E8DED7",
                                true: "#D99591"
                            }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    {erreurs.cgu && (
                        <Text style={styles.erreur}>{erreurs.cgu}</Text>
                    )}

                    {erreurs.formulaire && (
                        <Text style={styles.erreur}>
                            {erreurs.formulaire}
                        </Text>
                    )}

                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                        style={({ pressed }) => [
                            styles.lienAuth,
                            pressed && styles.lienPresse
                        ]}
                    >
                        <Text style={styles.texteLienAuth}>
                            Déjà un compte ?
                            <Text style={styles.texteLienFort}>
                                {" "}Se connecter
                            </Text>
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={envoyerFormulaire}
                        style={({ pressed }) => [
                            styles.bouton,
                            pressed && styles.boutonPresse
                        ]}
                    >
                        <Text style={styles.boutonTexte}>
                            Créer mon compte
                        </Text>
                    </Pressable>
                </View>

                <Text style={styles.piedAuth}>
                    Votre intérieur, votre histoire.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
