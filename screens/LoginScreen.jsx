
import { useState, useEffect, useRef, useContext } from "react";
import {
    Pressable,
    Text,
    TextInput,
    View,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import styles from "../src/styles";
import { validerFormulaireLogin } from "../utils/validation";
import { initDb, verifierConnexion } from "../database";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen() {
    const [form, setForm] = useState({
        email: "",
        mdp: "",
    });

    const [erreurs, setErreurs] = useState({});
    const [erreurGenerale, setErreurGenerale] = useState(null);

    const { setUtilisateur } = useContext(AuthContext);

    const navigation = useNavigation();
    const emailRef = useRef(null);

    useEffect(() => {
        initDb().catch((e) => console.log("Erreur init base", e));
    }, []);

    const maj = (champ, valeur) => {
        setForm((f) => ({ ...f, [champ]: valeur }));
    };

    async function validerConnexion() {
        setErreurGenerale(null);

        const nouvellesErreurs = validerFormulaireLogin(form);
        setErreurs(nouvellesErreurs);

        if (Object.keys(nouvellesErreurs).length > 0) return;

        try {
            const utilisateur = await verifierConnexion(form.email, form.mdp);

            if (!utilisateur) {
                setErreurGenerale("Email ou mot de passe incorrect");
                return;
            }

            setUtilisateur(utilisateur);

        } catch (erreur) {
            console.log(erreur);
            setErreurGenerale("Connexion impossible, veuillez réessayer");
        }
    }

    return (
        <SafeAreaView style={styles.safe}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.enteteAuth}>

                        <Text style={styles.surtitre}>
                            BIENVENUE CHEZ NOUS
                        </Text>

                        <Text style={styles.login}>
                            Bon retour !
                        </Text>

                        <Text style={styles.descriptionAuth}>
                            Connectez-vous pour retrouver votre univers décoration.
                        </Text>
                    </View>

                    <View style={styles.carteAuth}>
                        <Text style={styles.titreFormulaire}>
                            Connexion
                        </Text>

                        <Text style={styles.formulaireDescription}>
                            Accédez à votre compte
                        </Text>

                        <Text style={styles.libelleChamp}>
                            Adresse email
                        </Text>

                        <TextInput
                            ref={emailRef}
                            autoFocus
                            placeholder="exemple@email.com"
                            placeholderTextColor="#B5AAA2"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={[
                                styles.champ,
                                erreurs.email && styles.champErreur
                            ]}
                            value={form.email}
                            onChangeText={(t) => maj("email", t)}
                        />

                        {erreurs.email && (
                            <Text style={styles.erreur}>{erreurs.email}</Text>
                        )}

                        <Text style={styles.libelleChamp}>
                            Mot de passe
                        </Text>

                        <TextInput
                            placeholder="Votre mot de passe"
                            placeholderTextColor="#B5AAA2"
                            secureTextEntry={true}
                            style={[
                                styles.champ,
                                erreurs.mdp && styles.champErreur
                            ]}
                            value={form.mdp}
                            onChangeText={(t) => maj("mdp", t)}
                        />

                        {erreurs.mdp && (
                            <Text style={styles.erreur}>{erreurs.mdp}</Text>
                        )}

                        {erreurGenerale && (
                            <Text style={styles.erreur}>
                                {erreurGenerale}
                            </Text>
                        )}

                        <Pressable
                            onPress={() => navigation.navigate("Inscription")}
                            style={({ pressed }) => [
                                styles.lienAuth,
                                pressed && styles.lienPresse
                            ]}
                        >
                            <Text style={styles.texteLienAuth}>
                                Pas encore de compte ?
                                <Text style={styles.texteLienFort}>
                                    {" "}Créer un compte
                                </Text>
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={validerConnexion}
                            style={({ pressed }) => [
                                styles.bouton,
                                pressed && styles.boutonPresse
                            ]}
                        >
                            <Text style={styles.boutonTexte}>
                                Se connecter
                            </Text>
                        </Pressable>
                    </View>

                    <Text style={styles.piedAuth}>
                        Votre intérieur, votre histoire.
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
